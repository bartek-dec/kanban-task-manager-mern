import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    showAlert: false,
    alertText: ''
}

const alertSlice = createSlice({
    name: 'alertSlice',
    initialState,
    reducers: {
        setShowAlert: (state, action) => {
            state.showAlert = action.payload;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
        }
    }
});

export default alertSlice.reducer;

export const {setShowAlert, setAlertText} = alertSlice.actions;