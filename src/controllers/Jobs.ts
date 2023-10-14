import Job from "../models/Job.js";
import { routeHandlerFunction as rhf } from "types.js";
import { StatusCodes } from "http-status-codes";
import notFound from "../errors/notFound.js";

const getAllJobs: rhf = async(req, res)=>{

      /** 
   *  @const const { userID } = req.user!;
   *  @notice please note that this approach assumes that req.user will always be defined.
   * If there is a possibility that req.user can be undefined,
   * it is recommended to use optional chaining (?.) or nullish coalescing operator (??) to handle the
   *  case when req.user is undefined.
   @dev see use case below 
  if (!userID) {
    // Handle the case when userID is not defined
    return;
  }

  const jobs = await Job.find({ createdBy: userID });
  res.status(StatusCodes.OK).send({ jobs, nJobs: jobs.length });
};

const createJob: rhf = async (req, res) => {
  const userID = req.user?.userID; OR const { userID } = req.user ?? {};
  if (!userID) {
    // Handle the case when userID is not defined
    return;
  }

  const job = await Job.create({ createdBy: userID, ...req.body });
  res.status(StatusCodes.OK).send({ job });
};

const getJob: rhf = async (req, res) => {
  const userID = req.user?.userID;
  if (!userID) {
    // Handle the case when userID is not defined
    return;
  }

  
  */


    const { userID }  = req.user!;          /* So I had to assure TypeScript that req.user will not be undefined (I initially defined it as an optional parameter in types.ts hence it could e undefined) by using `!` */
    const jobs = await Job.find({ createdBy:userID });
    res.status(StatusCodes.OK).send({jobs, nJobs: jobs.length})
}

const createJob: rhf = async(req, res)=>{
    const {  userID  } = req.user!;
    const job = await Job.create({createdBy:userID, ...req.body});
    res.status(StatusCodes.OK).send({job});
}

const getJob: rhf = async(req, res)=>{
    const { userID } = req.user!;
    const { params: { id:jobID } } = req;
    const job = await Job.findOne({ _id:jobID, createdBy:userID });
    if (!job) throw new notFound("Job Does Not Exists");
    res.status(StatusCodes.OK).send({ job });
}
const updateJob: rhf = async(req, res)=>{
    const { userID } = req.user!
    const { params: { id: jobID } } = req;
    const job = await Job.findOneAndUpdate({ _id:jobID, createdBy:userID }, req.body, { runValidators: true, new: true });
    if (!job) throw new notFound("Job Does Not Exists");
    res.status(StatusCodes.OK).send({ message:"Job Updated Successfully", updatedJob:job});
}
const deleteJob: rhf = async(req, res)=>{
    const { userID } = req.user!
    const { params: { id: jobID } } = req;
    const job = await Job.deleteOne({ _id:jobID, createdBy:userID });
    if (!job) throw new notFound("Job Does Not Exists");
    res.status(StatusCodes.CREATED).send({message:"Job Deleted Succesfully"});
}

export { getAllJobs, createJob, getJob, updateJob, deleteJob};
