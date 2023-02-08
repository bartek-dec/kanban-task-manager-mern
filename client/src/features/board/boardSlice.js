import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    activeBtn: 0
}

const boardSlice = createSlice({
    name: 'boardSlice',
    initialState,
    reducers: {
        setIsActive: (state, action) => {
            state.activeBtn = action.payload;
        }
    }
});

export default boardSlice.reducer;

export const {setIsActive} = boardSlice.actions;