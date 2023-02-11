import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isSidebarVisible: true,
    isSidebarModalVisible: false,
}

const sidebarSlice = createSlice({
    name: 'sidebarSlice',
    initialState,
    reducers: {
        showSidebar: (state) => {
            state.isSidebarVisible = true;
        },
        hideSidebar: (state) => {
            state.isSidebarVisible = false;
        },
        showModal: (state) => {
            state.isSidebarModalVisible = true;
        },
        closeModal: (state) => {
            state.isSidebarModalVisible = false;
        }
    }
});

export default sidebarSlice.reducer;

export const {showSidebar, hideSidebar, showModal, closeModal} = sidebarSlice.actions;