import dotenv from "dotenv";
dotenv.config();

console.log("JWT_SECRET in use:", process.env.JWT_SECRET);

const jwt = require("jsonwebtoken");
const token = jwt.sign({ id: "testUser123" }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  
    
});

console.log("Generated Token:", token);
