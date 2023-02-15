import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";

const initialState = {
    isEditBoardModalVisible: false,
    isCreateBoardModalVisible: false,
    showAlert: false,
    isLoading: false,
    boardAlertText: '',
    activeBtn: 0,
    boards: ['platform launch', 'marketing plan', 'roadmap']
}

export const createBoard = createAsyncThunk('createBoard', async (payload, thunkAPI) => {
    try {
        console.log(payload);
    } catch (error) {

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