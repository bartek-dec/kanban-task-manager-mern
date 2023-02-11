import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isSidebarVisible: true
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
        }
    }
});

export default sidebarSlice.reducer;

export const {showSidebar, hideSidebar} = sidebarSlice.actions;