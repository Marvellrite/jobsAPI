import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Provide name"],
        minLength: [3, "Characters of name should not be less than 3"]
    },
    email: {
        type: String,
        match: [/(([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*)|(".+"))@(([0-9]{1,3}\.([0-9]{1,3})){2,}|([a-zA-Z_]+(\.[a-zA-Z_]+)+))/, "Invalid Email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Provide Password"],
    }
});
userSchema.pre("save", async function () {
    this.password = await bcrypt.hash(this.password, 10);
});
userSchema.methods.createJWT = async function () {
    const payload = { userID: this._id, userName: this.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "31d" });
    return token;
};
userSchema.methods.isCorrect = async function (password) {
    const isAuthorised = await bcrypt.compare(password, this.password);
    return isAuthorised;
};
const userModel = mongoose.model("User", userSchema);
export default userModel;
