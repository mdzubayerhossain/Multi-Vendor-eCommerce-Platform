import jws from "jsonwebtoken";
import mongoose from "mongoose";
export const generate = (id) => {
  return jws.sign({ id }, process.env.JWS_SECRET, { expiresIn: "30d" });
};

export const dbConnect = ()=>
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Database Connected"))
  .catch((error) => console.error("MongoDB connection Error", error));
