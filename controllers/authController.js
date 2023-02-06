import User from "../models/User.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError} from "../errors/index.js";

export const register = async (req, res) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all values');
    }

    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists) {
        throw new BadRequestError('Email already in use');
    }

    const user = await User.create(req.body);
    const token = user.createJWT();
    return res.status(StatusCodes.CREATED).json({
        user: {
            name: user.name,
            email: user.email,
            lastName: user.lastName
        },
        token
    });
}

export const login = async (req, res) => {
    return res.send('login user');
}

export const updateUser = async (req, res) => {
    return res.send('update user');
}