/**
 * POST localhost:8008/ecomm/api/v1/categories
 */
const category_Controller = require("../controllers/category.controller");
const authMw = require("../middlewares/auth.mw");
auth_mw = require("../middlewares/auth.mw");

module.exports = (app) => {
  app.post(
    "/ecomm/api/v1/categories",
    [auth_mw.verifyToken, authMw.isAdmin],
    category_Controller.createNewCategory
  );
};
