import Task from "../models/Task.js";
import Board from "../models/Board.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError, NotFoundError} from "../errors/index.js";

export const createTask = async (req, res) => {
    const {title, status, boardId} = req.body;

    if (!title || !status) {
        throw new BadRequestError('Please provide all values');
    }

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`No board with id: ${boardId}`);
    }

    const task = await Task.create(req.body);

    return res.status(StatusCodes.CREATED).json({task});
}

export const getTasks = async (req, res) => {
    const {id: boardId} = req.params;

    if (!boardId) {
        throw new BadRequestError('Please provide board Id');
    }

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`No board with id: ${boardId}`);
    }

    let tasks = await Task.find({boardId});

    tasks = tasks.reduce((acc, curr) => {
        if (acc[curr.status]) {
            acc[curr.status] = [...acc[curr.status], curr];
        }else {
            acc[curr.status] = [curr];
        }

        return acc;
    }, {});

    return res.status(StatusCodes.OK).json({tasks});
}

export const updateTask = async (req, res) => {
    return res.send('update task');
}

export const deleteTask = async (req, res) => {
    return res.send('delete task');
}