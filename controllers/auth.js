const User = require("../models/user");

exports.getLogin = (req, res, next) => {
  res.render("auth/login", {
    path: "/login",
    pageTitle: "Login",
    isAuthenticated: req.session.isAuthenticated,
  });
};

exports.postLogin = (req, res, next) => {
  User.findOne()
    .then((user) => {
      req.session.isAuthenticated = true;
      req.session.user = user;
      return req.session.save(() => {
        res.redirect("/");
      });
    })
    .catch((err) => console.log(err));
};

exports.postLogout = (req, res, next) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
};
