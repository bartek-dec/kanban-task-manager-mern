import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isEditBoardModalVisible: false,
    isCreateBoardModalVisible: false,
    showAlert: false,
    isLoading: false,
    alertText: '',
    activeBtn: 0,
    boards: ['platform launch', 'marketing plan', 'roadmap']
}

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
        setAlert: (state, action) => {
            state.showAlert = action.payload;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
        },

    }
});

export default boardSlice.reducer;

export const {showEditModal, closeEditModal, showCreateModal, closeCreateModal, setIsActive} = boardSlice.actions;