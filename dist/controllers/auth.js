import User from "../models/User.js";
import statusCodes from "http-status-codes";
import NotFound from "../errors/notFound.js";
import BadRequest from "../errors/badRequest.js";
import authenticationError from "../errors/authenticationError.js";
const register = async (req, res) => {
    const user = new User(req.body);
    console.log(user._id);
    await user.save(req.body);
    const token = await user.createJWT();
    res.status(statusCodes.CREATED).send({ token });
};
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        throw new BadRequest("Enter Valid Credentials");
    const user = await User.findOne({ email });
    if (!user)
        throw new NotFound("User Not Found");
    if (!await user.isCorrect(password))
        throw new authenticationError("Wrong Password");
    const token = await user.createJWT();
    res.status(statusCodes.CREATED).send({ token });
};
export { register, login };
