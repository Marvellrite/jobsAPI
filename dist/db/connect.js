import mongoose from "mongoose";
const connect = async (uri) => {
    mongoose.connect(uri);
};
export default connect;
