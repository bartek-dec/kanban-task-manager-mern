import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isEditBoardModalVisible: false,
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
        setIsActive: (state, action) => {
            state.activeBtn = action.payload;
        }
    }
});

export default boardSlice.reducer;

export const {showEditModal, closeEditModal, setIsActive} = boardSlice.actions;