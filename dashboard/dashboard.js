const url = require("url");
const path = require("path");
const express = require("express");
const passport = require("passport");
const session = require("express-session");
const Strategy = require("passport-discord").Strategy;
const ejs = require("ejs");
const bodyParser = require("body-parser");
const app = express();
const MemoryStore = require("memorystore")(session);

module.exports = async (client) => {

  const dataDir = path.resolve(`${process.cwd()}${path.sep}dashboard`);
  const templateDir = path.resolve(`${dataDir}${path.sep}templates`);

  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((obj, done) => done(null, obj));

  var callbackUrl;
  var domain;
  
  try {
    const domainUrl = new URL(client.config.DOMAIN);
    domain = {
      host: domainUrl.hostname,
      protocol: domainUrl.protocol
    };
  } catch (e) {
    console.log(e);
    throw new TypeError("Invalid domain specific in the config file.");
  }
  
  if (client.config.CUSTOM_DOMAIN) {
    callbackUrl =  `${domain.protocol}//${domain.host}/callback`
  } else {
    callbackUrl = `${domain.protocol}//${domain.host}${client.config.PORT == 80 ? "" : `:${client.config.PORT}`}/callback`;
  }
  
  passport.use(new Strategy({
    clientID: client.user.id,
    clientSecret: client.config.CLIENT_SECRET,
    callbackURL: callbackUrl,
    scope: ["identify"]
  },

  (accessToken, refreshToken, profile, done) => { // eslint-disable-line no-unused-vars
    process.nextTick(() => {
        profile.tokens = { accessToken };
      done(null, profile)
      });
  }));

  app.use(session({
    store: new MemoryStore({ checkPeriod: 86400000 }),
    secret: "#@%#&^$^$%@$^$&%#$%@#$%$^%&$%^#$%@#$%#E%#%@$FEErfgr3g#%GT%536c53cc6%5%tv%4y4hrgrggrgrgf4n",
    resave: false,
    saveUninitialized: false,
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.locals.domain = client.config.DOMAIN.split("//")[1];

  app.engine("html", ejs.renderFile);
  app.set("view engine", "html");

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));

  app.use("/", express.static(path.resolve(`${dataDir}${path.sep}assets`)));

  const renderTemplate = (res, req, template, data = {}) => {
    const baseData = {
      bot: client,
      path: req.path,
      user: req.isAuthenticated() ? req.user : null,
      uid: null,
      cookie: null
    };
    res.render(path.resolve(`${templateDir}${path.sep}${template}`), Object.assign(baseData, data));
  };

  const checkAuth = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    req.session.backURL = req.url;
    res.redirect("/login");
  }

  app.get("/login", (req, res, next) => {
    if (req.session.backURL) {
      req.session.backURL = req.session.backURL; // eslint-disable-line no-self-assign
    } else if (req.headers.referer) {
      const parsed = url.parse(req.headers.referer);
      if (parsed.hostname === app.locals.domain) {
        req.session.backURL = parsed.path;
      }
    } else {
      req.session.backURL = "/";
    }
    next();
  },
  passport.authenticate("discord"));

  app.get("/callback", passport.authenticate("discord", { failureRedirect: "/" }), (req, res) => {
    if (req.session.backURL) {
      const url = req.session.backURL;
      req.session.backURL = null;
      res.redirect(url);
    } else {
      res.redirect("/");
    }
  });

  app.get("/logout", function (req, res) {
    req.session.destroy(() => {
     // req.logout();
      res.redirect("/");
    });
  });

  app.get("/", (req, res) => {
    renderTemplate(res, req, "index.ejs");
  });

  app.get("/genshin", checkAuth, async (req, res) => {
    renderTemplate(res, req, "genshin.ejs", { alert: null, uid:null, cookie:null });
  });

  /// ON CLICK THE BUTTON
  app.post("/genshin", checkAuth, async (req, res) => {
      if(!req.body.uid) {
        return renderTemplate(res, req, "genshin.ejs", { alert: "Please Provided UID!" });
      }
      if(!req.body.cookie) {
        return  renderTemplate(res, req, "genshin.ejs", { alert: "Please Provided Cookie!" });
      }

      /// Run Handler
      await client.FillCookies(req.user.id, req.body.uid, req.body.cookie);

      renderTemplate(res, req, "genshin.ejs", { alert: "Successfully Login." });
  });

  app.listen(client.config.PORT, null, null, () => console.log(`Dashboard is up and running on port ${client.config.PORT}.`));
};
