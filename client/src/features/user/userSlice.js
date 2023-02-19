import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage} from "../../utils/localStorage";
import axios from "axios";
import {authFetch, checkForUnAuthorizedError} from "../../utils/axios";

const {user, token} = getUserFromLocalStorage();

const initialState = {
    isLoading: false,
    user: user || null,
    token: token || null,
    isUserModalVisible: false
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
});

export const updateUser = createAsyncThunk('updateUser', async (currentUser, thunkAPI) => {
    try {
        const {data} = await authFetch.patch('/auth/updateUser', currentUser);
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, closeUserModal);
    }
});

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        showUserModal: (state) => {
            state.isUserModalVisible = true;
        },
        closeUserModal: (state) => {
            state.isUserModalVisible = false;
        }
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
        }).addCase(registerUser.rejected, (state) => {
            state.isLoading = false;
        }).addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(loginUser.fulfilled, (state, action) => {
            const {user, token} = action.payload;
            state.user = user;
            state.token = token;
            state.isLoading = false;
            addUserToLocalStorage({user, token});
        }).addCase(loginUser.rejected, (state) => {
            state.isLoading = false;
        }).addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateUser.fulfilled, (state, action) => {
            const {user, token} = action.payload;
            state.isLoading = false;
            state.user = user;
            state.token = token;
            state.isUserModalVisible = false;
            addUserToLocalStorage({user, token});
        }).addCase(updateUser.rejected, (state) => {
            state.isLoading = false;
        })
    }
});

export default userSlice.reducer;

export const {setUser, setToken, showUserModal, closeUserModal} = userSlice.actions;