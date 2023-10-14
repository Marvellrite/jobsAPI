import mongoose from "mongoose";
const jobSchema = new mongoose.Schema({
    company: {
        type: String
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: "pending",
        enum: ["pending", "interview", "Declined"]
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    }
}, { timestamps: true });
const jobModel = mongoose.model("Jobs", jobSchema);
export default jobModel;
