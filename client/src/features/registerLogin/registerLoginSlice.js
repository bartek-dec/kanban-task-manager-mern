import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: ''
}

const registerLoginSlice = createSlice({
    name: 'registerLoginSlice',
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

export default registerLoginSlice.reducer;

export const {setShowAlert, setAlertText} = registerLoginSlice.actions;