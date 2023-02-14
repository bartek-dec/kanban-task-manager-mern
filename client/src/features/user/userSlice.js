import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {addUserToLocalStorage, getUserFromLocalStorage, removeUserFromLocalStorage} from "../../utils/localStorage";
import axios from "axios";

const {user, token} = getUserFromLocalStorage();

const initialState = {
    isLoading: false,
    showAlert: false,
    alertText: '',
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
        const {data} = await axios.patch('/api/v1/auth/updateUser', currentUser, {
            headers: {
                Authorization: `Bearer ${thunkAPI.getState().user.token}`
            }
        });
        return data;
    } catch (error) {
        if (error.response.status === 401) {
            thunkAPI.dispatch(setShowAlert(true));
            thunkAPI.dispatch(setAlertText('Unauthorized! Logging out...'));
            setTimeout(() => {
                thunkAPI.dispatch(setUser(null));
                thunkAPI.dispatch(setToken(null));
                thunkAPI.dispatch(setShowAlert(false));
                thunkAPI.dispatch(setAlertText(''));
                removeUserFromLocalStorage();
            }, 2000);
        }
        return thunkAPI.rejectWithValue(error.response.data.msg);
    }
});

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        setShowAlert: (state, action) => {
            state.showAlert = action.payload;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
        },
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
        }).addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        }).addCase(updateUser.fulfilled, (state, action) => {
            const {user, token} = action.payload;
            state.isLoading = false;
            state.user = user;
            state.token = token;
            state.isUserModalVisible = false;
            addUserToLocalStorage({user, token});
        }).addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.showAlert = true;
            state.alertText = action.payload;
        })
    }
});

export default userSlice.reducer;

export const {setShowAlert, setAlertText, setUser, setToken, showUserModal, closeUserModal} = userSlice.actions;