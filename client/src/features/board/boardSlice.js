import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {removeUserFromLocalStorage} from "../../utils/localStorage";
import {setToken, setUser} from "../user/userSlice";

const initialState = {
    isEditBoardModalVisible: false,
    isCreateBoardModalVisible: false,
    showAlert: false,
    isLoading: false,
    boardAlertText: '',
    activeBtn: 0,
    boards: []
}

export const createBoard = createAsyncThunk('createBoard', async (payload, thunkAPI) => {
    try {
        const {data} = await axios.post('/api/v1/boards', payload, {
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.token}`
            }
        });
        return data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(setShowAlert(true));
            thunkAPI.dispatch(setAlertText('Unauthorized! Logging out...'));
            setTimeout(() => {
                thunkAPI.dispatch(setUser(null));
                thunkAPI.dispatch(setToken(null));
                thunkAPI.dispatch(setShowAlert(false));
                thunkAPI.dispatch(setAlertText(''));
                removeUserFromLocalStorage();
            }, 2000);
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const getBoards = createAsyncThunk('getBoards', async (_, thunkAPI) => {
    try {
        const {data} = await axios.get('/api/v1/boards', {
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.token}`
            }
        });
        return data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(setShowAlert(true));
            thunkAPI.dispatch(setAlertText('Unauthorized! Logging out...'));
            setTimeout(() => {
                thunkAPI.dispatch(setUser(null));
                thunkAPI.dispatch(setToken(null));
                thunkAPI.dispatch(setShowAlert(false));
                thunkAPI.dispatch(setAlertText(''));
                removeUserFromLocalStorage();
            }, 2000);
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
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
        setShowAlert: (state, action) => {
            state.showAlert = action.payload;
        },
        setAlertText: (state, action) => {
            state.boardAlertText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(createBoard.pending, (state) => {
            state.isLoading = true;
        }).addCase(createBoard.fulfilled, (state, action) => {
            state.isLoading = false;
            state.boards = [...state.boards, action.payload.board];
        }).addCase(createBoard.rejected, (state, action) => {
            state.isLoading = false;
            state.showAlert = true;
            state.boardAlertText = action.payload;
        }).addCase(getBoards.pending, (state) => {
            state.isLoading = true;
        }).addCase(getBoards.fulfilled, (state, action) => {
            state.isLoading = false;
            state.boards = action.payload.boards;
        }).addCase(getBoards.rejected, (state, action) => {
            state.isLoading = false;
            state.showAlert = true;
            state.boardAlertText = action.payload;
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
    setShowAlert,
    setAlertText
} = boardSlice.actions;