const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const EmployeeModel = require("./models/Employee");

const app = express();
app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://127.0.0.1:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  EmployeeModel.findOne({ email: email }).then((user) => {
    if (user) {
      if (user.password === password) {
        res.json("success");
      } else {
        res.json("The password is incorrect");
      }
    } else {
      res.json("No record existed");
    }
  });
});

app.post("/register", (req, res) => {
  console.log("Received data:", req.body); // Log the received data
  EmployeeModel.create(req.body)
    .then((employee) => {
      console.log("Saved to MongoDB:", employee); // Log the saved document
      res.status(201).json({ message: "User created successfully" });
    })
    .catch((err) => {
      if (err.code === 11000) {
        // Handle duplicate key error
        console.error("Duplicate key error:", err); // Log duplicate key error
        res.status(400).json({ message: "Email already exists" });
      } else {
        console.error("Error saving to MongoDB:", err); // Log any other errors
        res.status(500).json({ message: "Internal server error" });
      }
    });
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
