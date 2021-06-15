"use strict";

/** Routes for users. */

const jsonschema = require("jsonschema");

const express = require("express");
const { ensureLoggedIn, isAdminOrOwnUser } = require("../middleware/auth");
const { BadRequestError } = require("../errors/expressError");
const User = require("../models/user");
const userUpdateSchema = require("../schemas/userUpdate.json");

const router = express.Router();

router.get(
  "/:username",
  ensureLoggedIn,
  isAdminOrOwnUser,
  async function (req, res, next) {
    try {
      const username = req.params.username;
      const user = await User.get(username);
      const watchlist = await User.getUsersWatchlist(username);
      user["watchlist"] = watchlist;
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  }
);

/** PATCH /[username] { user } => { user }
 *
 * Data can include:
 *   { firstName, lastName, email }
 *
 * Returns { username, firstName, lastName, email, isAdmin }
 *
 * Authorization required: admin or own user
 **/

router.patch(
  "/:username",
  ensureLoggedIn,
  isAdminOrOwnUser,
  async function (req, res, next) {
    try {
      const validator = jsonschema.validate(req.body, userUpdateSchema);
      if (!validator.valid) {
        const errs = validator.errors.map((e) => e.stack);
        throw new BadRequestError(errs);
      }

      const user = await User.update(req.params.username, req.body);
      return res.json({ user });
    } catch (err) {
      return next(err);
    }
  }
);

/** DELETE /[username]  =>  { deleted: username }
 *
 * Authorization required: admin or own user
 **/

router.delete(
  "/:username",
  ensureLoggedIn,
  isAdminOrOwnUser,
  async function (req, res, next) {
    try {
      await User.remove(req.params.username);
      return res.json({ deleted: req.params.username });
    } catch (err) {
      return next(err);
    }
  }
);

/* POST / POST /:username/watchlist/:ticker  => { added: ticker }
 */

router.post(
  "/:username/watchlist/:ticker",
  ensureLoggedIn,
  isAdminOrOwnUser,
  async function (req, res, next) {
    try {
      const ticker = req.params.ticker;
      const username = req.params.username;
      const response = await User.addToWatchList(username, ticker);
      return res.json({ added: response.ticker });
    } catch (err) {
      next(err);
    }
  }
);

/* DELETE / DELETE :username/watchlist/:ticker => { deleted: res }
 */
router.delete(
  "/:username/watchlist/:ticker",
  ensureLoggedIn,
  isAdminOrOwnUser,
  async function (req, res, next) {
    try {
      const ticker = req.params.ticker;
      const username = req.params.username;
      const response = await User.deleteTicker(username, ticker);

      return res.json({ deleted: response });
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
