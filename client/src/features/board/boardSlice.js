import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {authFetch, checkForUnAuthorizedError} from "../../utils/axios";
import {nanoid} from "nanoid";

const initialIDs = [nanoid(), nanoid()];

const initialState = {
    isEditBoardModalVisible: false,
    isCreateBoardModalVisible: false,
    isDeleteBoardModalVisible: false,
    alertText: '',
    isLoading: false,
    activeBoard: null,
    boards: [],

    isEditing: false,
    initialName: '',
    initialValues: {
        [initialIDs[0]]: '',
        [initialIDs[1]]: '',
    },
    initialErrors: {
        [initialIDs[0]]: false,
        [initialIDs[1]]: false,
    }
}

export const createBoard = createAsyncThunk('createBoard', async (payload, thunkAPI) => {
    try {
        const {data} = await authFetch.post('/boards', payload);
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeCreateModal);
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
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeDeleteModal);
    }
});

export const editBoard = createAsyncThunk('editBoard', async (payload, thunkAPI) => {
    try {
        const {id, name, columns} = payload;
        await authFetch.patch(`boards/${id}`, {name, columns});
        thunkAPI.dispatch(getBoards());
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeCreateModal);
    }
})

const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        showEditModal: (state) => {
            state.isEditBoardModalVisible = true;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
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
            if (action.payload === null) {
                state.activeBoard = null;
            } else {
                const [board] = state.boards.filter((board) => board._id === action.payload);
                state.activeBoard = board;
            }
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;

            if (action.payload === false) {
                state.initialName = '';
                state.initialValues = {
                    [initialIDs[0]]: '',
                    [initialIDs[1]]: '',
                };
                state.initialErrors = {
                    [initialIDs[0]]: false,
                    [initialIDs[1]]: false,
                }
            } else {
                const ids = state.activeBoard.columns.map(() => nanoid());
                const values = {};
                const errors = {};
                ids.forEach((id, index) => {
                    values[id] = state.activeBoard.columns[index];
                    errors[id] = false;
                });

                state.initialName = state.activeBoard.name;
                state.initialValues = values;
                state.initialErrors = errors;
            }
        }
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
        }).addCase(editBoard.pending, (state) => {
            state.isLoading = true;
        }).addCase(editBoard.fulfilled, (state) => {
            state.isLoading = false;
            state.isCreateBoardModalVisible = false;
            state.isEditing = false;
            state.initialName = '';
            state.initialValues = {
                [initialIDs[0]]: '',
                [initialIDs[1]]: '',
            };
            state.initialErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(editBoard.rejected, (state) => {
            state.isLoading = false;
            state.isEditing = false;
            state.initialName = '';
            state.initialValues = {
                [initialIDs[0]]: '',
                [initialIDs[1]]: '',
            };
            state.initialErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        })
    }
});

export default boardSlice.reducer;

export const {
    showEditModal,
    setAlertText,
    closeEditModal,
    showCreateModal,
    closeCreateModal,
    showDeleteModal,
    closeDeleteModal,
    setActiveBoard,
    setIsEditing
} = boardSlice.actions;