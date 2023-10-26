const path = require("path");
const User = require(path.join(__dirname, "../models/user.model"));

// Save the newUser information to the database
exports.saveUser = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      message: req.body.message,
    });

    var filter =
      /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+\.[a-z]{1,4}$/;

    if (
      newUser.name != "" &&
      filter.test(newUser.email) &&
      newUser.message != ""
    ) {
      await newUser.save();
      return res.status(200).json({
        success: true,
        message: "User information saved successfully",
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Invalid user data",
      });
    }
  } catch (error) {
    console.error(error);
    // Send an error response
    res.status(500).json({
      success: false,
      message: "Error saving newUser information",
      error: error.message,
    });
  }
};
