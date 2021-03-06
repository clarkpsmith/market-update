"use strict";

const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../config/config");
const { UnauthorizedError } = require("../errors/expressError");

/** Middleware: Authenticate user.
 *
 * If a token was provided, verify it, and, if valid, store the token payload
 * on res.locals (this will include the username and isAdmin field.)
 *
 * It's not an error if no token was provided or if the token is not valid.
 */

function authenticateJWT(req, res, next) {
  try {
    const authHeader = req.headers && req.headers.authorization;

    if (authHeader) {
      const token = authHeader.replace(/^[Bb]earer /, "").trim();
      res.locals.user = jwt.verify(token, SECRET_KEY);
    }
    return next();
  } catch (err) {
    return next();
  }
}

/** Middleware to use when they must be logged in.
 *
 * If not, raises Unauthorized.
 */

function ensureLoggedIn(req, res, next) {
  try {
    if (!res.locals.user)
      throw new UnauthorizedError("Unauthorized Access, Must Be Logged In");
    return next();
  } catch (err) {
    return next(err);
  }
}

function isAdmin(req, res, next) {
  try {
    if (!res.locals.user.isAdmin)
      throw new UnauthorizedError("Unauthhorized Acess, Must be Admin");
    return next();
  } catch (err) {
    return next(err);
  }
}

function isAdminOrOwnUser(req, res, next) {
  try {
    if (
      req.params.username !== res.locals.user.username &&
      !res.locals.user.isAdmin
    ) {
      throw new UnauthorizedError();
    }

    return next();
  } catch (err) {
    return next(err);
  }
}

module.exports = {
  authenticateJWT,
  ensureLoggedIn,
  isAdmin,
  isAdminOrOwnUser,
};
