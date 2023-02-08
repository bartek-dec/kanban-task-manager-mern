import {configureStore} from "@reduxjs/toolkit";
import registerLoginSlice from "./features/registerLogin/registerLoginSlice";
import boardSlice from "./features/board/boardSlice";

const store = configureStore({
    reducer: {
        register: registerLoginSlice,
        board: boardSlice
    }
});

export default store;