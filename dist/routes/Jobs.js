import Express from "express";
const router = Express.Router();
import { getAllJobs, createJob, getJob, deleteJob, updateJob } from "../controllers/Jobs.js";
router.route("/").get(getAllJobs).post(createJob);
router.route("/:id").get(getJob).delete(deleteJob).patch(updateJob);
export default router;
