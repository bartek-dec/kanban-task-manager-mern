import {configureStore} from "@reduxjs/toolkit";
import registerLoginSlice from "./features/registerLogin/registerLoginSlice";
import boardSlice from "./features/board/boardSlice";
import themeSlice from "./features/theme/themeSlice";

const store = configureStore({
    reducer: {
        register: registerLoginSlice,
        board: boardSlice,
        theme: themeSlice
    }
});

export default store;