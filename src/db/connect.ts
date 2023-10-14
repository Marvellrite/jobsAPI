import mongoose from "mongoose";

const connect = async(uri: string): Promise<void>=>{
    mongoose.connect(uri)
}

export default connect;