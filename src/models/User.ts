import dotenv from "dotenv";
dotenv.config();

import mongoose, { Model, Document } from "mongoose";
import jwt, { JwtPayload } from "jsonwebtoken";
import bcrypt from "bcryptjs";

interface UI extends Document{
    name: string,
    email: string,
    password: string,
    createJWT(): Promise<string>,
    isCorrect(password: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema({
    name:{ 
        type: String,
        required: [true, "Provide name"],
        minLength: [3, "Characters of name should not be less than 3"]
    }, 
    email:{ 
        type: String,
        match: [/(([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*)|(".+"))@(([0-9]{1,3}\.([0-9]{1,3})){2,}|([a-zA-Z_]+(\.[a-zA-Z_]+)+))/, "Invalid Email"],
        unique: true
    },
    password:{ 
        type: String,
        required: [true, "Provide Password"],
    }
})

userSchema.pre("save", async function(){
    this.password = await bcrypt.hash(this.password, 10);
})

userSchema.methods.createJWT = async function(){
    const payload = { userID:this._id, userName:this.name };
    const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "31d" });
    return token;
};

userSchema.methods.isCorrect = async function(password: string){
    const isAuthorised = await bcrypt.compare(password, this.password);
    return isAuthorised;
}

const userModel: Model<UI> = mongoose.model<UI>("User", userSchema);

export default userModel;