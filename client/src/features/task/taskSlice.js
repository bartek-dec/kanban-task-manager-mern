import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isTaskModalVisible: false,
    alertText: ''
}

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        showTaskModal: (state) => {
            state.isTaskModalVisible = true;
        },
        closeTaskModal: (state) => {
            state.isTaskModalVisible = false;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
        }
    }
});

export default taskSlice.reducer;

export const {showTaskModal, closeTaskModal,setAlertText} = taskSlice.actions;