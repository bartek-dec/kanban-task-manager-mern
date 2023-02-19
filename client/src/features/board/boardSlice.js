import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {authFetch, checkForUnAuthorizedError} from "../../utils/axios";

const initialState = {
    isEditBoardModalVisible: false,
    isCreateBoardModalVisible: false,
    isLoading: false,
    activeBtn: 0,
    boards: []
}

export const createBoard = createAsyncThunk('createBoard', async (payload, thunkAPI) => {
    try {
        const {data} = await authFetch.post('/boards', payload);
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, closeCreateModal);
    }
});

export const getBoards = createAsyncThunk('getBoards', async (_, thunkAPI) => {
    try {
        const {data} = await authFetch.get('/boards');
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI);
    }
});

const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        showEditModal: (state) => {
            state.isEditBoardModalVisible = true;
        },
        closeEditModal: (state) => {
            state.isEditBoardModalVisible = false;
        },
        showCreateModal: (state) => {
            state.isCreateBoardModalVisible = true;
        },
        closeCreateModal: (state) => {
            state.isCreateBoardModalVisible = false;
        },
        setIsActive: (state, action) => {
            state.activeBtn = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createBoard.pending, (state) => {
            state.isLoading = true;
        }).addCase(createBoard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.boards = [...state.boards, action.payload.board];
        }).addCase(createBoard.rejected, (state) => {
            state.isLoading = false;
        }).addCase(getBoards.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBoards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.boards = action.payload.boards;
        }).addCase(getBoards.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

export default boardSlice.reducer;

export const {
    showEditModal,
    closeEditModal,
    showCreateModal,
    closeCreateModal,
    setIsActive,
} = boardSlice.actions;