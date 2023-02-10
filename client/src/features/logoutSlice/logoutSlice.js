import {createSlice} from "@reduxjs/toolkit";
import {removeUserFromLocalStorage} from "../../utils/localStorage";

const initialState = {
    isModalOpen: false
}

const logoutSlice = createSlice({
    name: 'logoutSlice',
    initialState,
    reducers: {
        openModal: (state) => {
            state.isModalOpen = true;
        },
        closeModal: (state) => {
            state.isModalOpen = false;
        }
    }
});

export default logoutSlice.reducer;

export const {openModal, closeModal} = logoutSlice.actions;