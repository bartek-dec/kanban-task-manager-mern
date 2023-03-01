import Task from "../models/Task.js";
import Board from "../models/Board.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError, NotFoundError} from "../errors/index.js";
import {checkPermissions} from "../utils/checkPermissions.js";

export const createTask = async (req, res) => {
    const {title, status, boardId} = req.body;

    if (!title || !status) {
        throw new BadRequestError('Please provide all values');
    }

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`No board with id: ${boardId}`);
    }

    checkPermissions(req.user, board.createdBy);

    req.body.userId = req.user.userId;
    const task = await Task.create(req.body);

    return res.status(StatusCodes.CREATED).json({task});
}

export const getTasks = async (req, res) => {
    const {id: boardId} = req.params;

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`No board with id: ${boardId}`);
    }

    checkPermissions(req.user, board.createdBy);

    let tasks = await Task.find({boardId});

    tasks = tasks.reduce((acc, curr) => {
        if (acc[curr.status]) {
            acc[curr.status] = [...acc[curr.status], curr];
        } else {
            acc[curr.status] = [curr];
        }

        return acc;
    }, {});

    return res.status(StatusCodes.OK).json({tasks});
}

export const updateTask = async (req, res) => {
    const {id: taskId} = req.params;
    const {boardId} = req.body;

    if (!boardId) {
        throw new BadRequestError('Please provide board Id');
    }

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`No board with Id: ${boardId}`);
    }

    if (!taskId) {
        throw new BadRequestError('Please provide task Id')
    }

    const task = await Task.findOne({_id: taskId});
    if (!task) {
        throw new NotFoundError(`No task with Id: ${taskId}`)
    }

    checkPermissions(req.user, task.userId);

    const updatedTask = await Task.findOneAndUpdate({_id: taskId}, req.body, {new: true});

    return res.status(StatusCodes.OK).json({updatedTask});
}

export const deleteTask = async (req, res) => {
    const {id: taskId} = req.params;

    const task = await Task.findOne({_id: taskId});
    if (!task) {
        throw new NotFoundError(`No task with Id: ${taskId}`)
    }

    checkPermissions(req.user, task.userId);
    await task.remove();

    return res.status(StatusCodes.OK).json({msg: 'Success! Task removed'});
}