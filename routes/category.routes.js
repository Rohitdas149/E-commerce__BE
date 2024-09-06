/**
 * POST localhost:8008/ecomm/api/v1/categories
 */
const category_Controller = require("../controllers/category.controller");

module.exports = (app) => {
  app.post("/ecomm/api/v1/categories", category_Controller.createNewCategory);
};
