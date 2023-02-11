import {configureStore} from "@reduxjs/toolkit";
import userSlice from "./features/user/userSlice";
import boardSlice from "./features/board/boardSlice";
import themeSlice from "./features/theme/themeSlice";
import sidebarSlice from "./features/sidebarSlice/sidebarSlice";
import logoutSlice from "./features/logoutSlice/logoutSlice";

const store = configureStore({
    reducer: {
        register: userSlice,
        board: boardSlice,
        theme: themeSlice,
        sidebar: sidebarSlice,
        logout: logoutSlice
    }
});

export default store;