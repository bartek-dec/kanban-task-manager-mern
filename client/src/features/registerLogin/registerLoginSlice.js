import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {addUserToLocalStorage, getUserFromLocalStorage} from "../../utils/localStorage";
import axios from "axios";

const {user, token} = getUserFromLocalStorage();

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
    user: user || null,
    token: token || null
}

export const registerUser = createAsyncThunk('registerUser', async (currentUser, thunkAPI) => {
    try {
        const {data} = await axios.post('/api/v1/auth/register', currentUser);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

export const loginUser = createAsyncThunk('loginUser', async (currentUser, thunkAPI) => {
    try {
        const {data} = await axios.post('/api/v1/auth/login', currentUser);
        return data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
})

const registerLoginSlice = createSlice({
    name: 'registerLoginSlice',
    initialState,
    reducers: {
        setShowAlert: (state, action) => {
            state.showAlert = action.payload;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(registerUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(registerUser.fulfilled, (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
            state.isLoading = false;
            addUserToLocalStorage({user, token});
        }).addCase(registerUser.rejected, (state, action) => {
            state.isLoading = false;
            state.showAlert = true;
            state.alertText = action.payload;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
            state.isLoading = false;
            addUserToLocalStorage({user, token});
        }).addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.showAlert = true;
            state.alertText = action.payload;
        })
    }
});

export default registerLoginSlice.reducer;

export const {setShowAlert, setAlertText} = registerLoginSlice.actions;