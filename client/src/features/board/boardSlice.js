import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {authFetch, checkForUnAuthorizedError} from "../../utils/axios";

const initialState = {
    isEditBoardModalVisible: false,
    isCreateBoardModalVisible: false,
    isDeleteBoardModalVisible: false,
    isLoading: false,
    activeBoard: null,
    currentBoardName: '',
    boards: []
}

export const createBoard = createAsyncThunk('createBoard', async (payload, thunkAPI) => {
    try {
        const {data} = await authFetch.post('/boards', payload);
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI);
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

export const deleteBoard = createAsyncThunk('deleteBoard', async (id, thunkAPI) => {
    try {
        await authFetch.delete(`boards/${id}`);
        thunkAPI.dispatch(getBoards());
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
        showDeleteModal: (state) => {
            state.isDeleteBoardModalVisible = true;
        },
        closeDeleteModal: (state) => {
            state.isDeleteBoardModalVisible = false;
        },
        setActiveBoard: (state, action) => {
            const [board] = state.boards.filter((board) => board._id === action.payload);
            state.activeBoard = board;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createBoard.pending, (state) => {
            state.isLoading = true;
        }).addCase(createBoard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isCreateBoardModalVisible = false;
            state.boards = [...state.boards, action.payload.board];
        }).addCase(createBoard.rejected, (state) => {
            state.isLoading = false;
            setTimeout(() => {
                state.isCreateBoardModalVisible = false;
            }, 2000);
        }).addCase(getBoards.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBoards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.boards = action.payload.boards;
        }).addCase(getBoards.rejected, (state) => {
            state.isLoading = false;
        }).addCase(deleteBoard.pending, (state) => {
            state.isLoading = true;
        }).addCase(deleteBoard.fulfilled, (state) => {
            state.isLoading = false;
            state.activeBoard = null;
            state.isDeleteBoardModalVisible = false;
        }).addCase(deleteBoard.rejected, (state) => {
            state.isLoading = false;
            setTimeout(() => {
                state.isDeleteBoardModalVisible = false;
            }, 2000);
        })
    }
});

export default boardSlice.reducer;

export const {
    showEditModal,
    closeEditModal,
    showCreateModal,
    closeCreateModal,
    showDeleteModal,
    closeDeleteModal,
    setActiveBoard,
} = boardSlice.actions;