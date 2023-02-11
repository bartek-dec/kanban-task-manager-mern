import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isModalVisible: false,
    activeBtn: 0,
    boards: ['platform launch', 'marketing plan', 'roadmap']
}

const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        showModal: (state) => {
            state.isModalVisible = true;
        },
        closeModal: (state) => {
            state.isModalVisible = false;
        },
        setIsActive: (state, action) => {
            state.activeBtn = action.payload;
        }
    }
});

export default boardSlice.reducer;

export const {showModal, closeModal, setIsActive} = boardSlice.actions;