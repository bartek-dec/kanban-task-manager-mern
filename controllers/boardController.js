import Board from "../models/Board.js";
import {StatusCodes} from "http-status-codes";
import {BadRequestError, NotFoundError} from "../errors/index.js";
import {checkPermissions} from "../utils/checkPermissions.js";

export const createBoard = async (req, res) => {
    const {name} = req.body;
    if (!name) {
        throw new BadRequestError('Please provide all values');
    }

    req.body.createdBy = req.user.userId;
    const board = await Board.create(req.body);

    return res.status(StatusCodes.CREATED).json({board});
}

export const getBoards = async (req, res) => {
    const boards = await Board.find({createdBy: req.user.userId});
    return res.status(StatusCodes.OK).json({boards});
}

export const updateBoard = async (req, res) => {
    return res.send('update board');
}

export const deleteBoard = async (req, res) => {
    const {id: boardId} = req.params;

    const board = await Board.findOne({_id: boardId});
    if (!board) {
        throw new NotFoundError(`No board with id ${boardId}`);
    }

    checkPermissions(req.user, board.createdBy);
    await board.remove();

    return res.status(StatusCodes.OK).json({msg: 'Success! Board removed'});
}