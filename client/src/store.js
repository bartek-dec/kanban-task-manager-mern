import {configureStore} from "@reduxjs/toolkit";
import registerLoginSlice from "./features/registerLogin/registerLoginSlice";

const store = configureStore({
    reducer: {
        register: registerLoginSlice
    }
});

export default store;