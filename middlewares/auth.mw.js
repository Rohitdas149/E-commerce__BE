const user_model = require("../models/user.model");

/**
 * Create a mw will check if the request body is proper and correct
 */
const verifySignUpBody = async (req, res, next) => {
  try {
    // check for the name
    if (!req.body.name) {
      return res.status(401).send({
        message: "Failed ! Name was not provided in the request body",
      });
    }
    // check for the email
    if (!req.body.email) {
      return res.status(401).send({
        message: "Failed ! Email was not provided in the request body",
      });
    }
    // check for the userId
    if (!req.body.userId) {
      return res.status(401).send({
        message: "Failed ! UserId was not provided in the request body",
      });
    }
    // check if the user with same userId is already present
    const user = await user_model.findOne({ userId: req.body.userId });
    if (user) {
      return res.status(401).send({
        message: "Failed ! user is already present in the request body",
      });
    }
    next();
  } catch (err) {
    console.log("Error while validatng the request object", err);
    res.status(500).send({
      message: "Error while validatng the request body",
    });
  }
};
module.exports = {
  verifySignUpBody: verifySignUpBody,
};
