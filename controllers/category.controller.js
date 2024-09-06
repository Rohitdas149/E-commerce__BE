const category_Model = require("../models/category.model");
/**
 * Controller for creating the category
 * pOST localhost:8008/ecomm/api/v1/categories
 *  {
 *  "name" : "Household",
 *  "description" : "This will have all household items"
 *  }
 */
exports.createNewCategory = async (req, res) => {
  //1. Read the request body

  //2. Create the category object
  const cat_data = {
    name: req.body.name,
    description: req.body.description,
  };
  try {
    //3. Insert into mongoose
    const category = await category_Model.create(cat_data);
    res.status(201).send(category);
  } catch (err) {
    console.log("Error while creating the category", err);
    return res.status(500).send({
      message: "Error while creating the category",
    });
  }
  //4. Return the response of the created category
};
