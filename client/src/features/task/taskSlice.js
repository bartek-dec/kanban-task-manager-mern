import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {nanoid} from "nanoid";
import {filterObject} from "../../utils/objectUtil";
import {authFetch, checkForUnAuthorizedError} from "../../utils/axios";

const initialIDs = [nanoid(), nanoid()];

const initialState = {
    isTaskModalVisible: false,
    alertText: '',
    isLoading: false,
    activeTask: null,
    tasks: [],

    isEditing: false,
    title: '',
    titleError: false,
    description: '',
    status: '',
    subtasks: {
        [initialIDs[0]]: '',
        [initialIDs[1]]: '',
    },
    subtaskErrors: {
        [initialIDs[0]]: false,
        [initialIDs[1]]: false,
    }
}

export const createTask = createAsyncThunk('createTask', async (payload, thunkAPI) => {
    try {
        const {title, description, status, boardId, subtasks} = payload;
        const subtasksObjects = subtasks.map((item) => {
            return {
                name: item,
                isCompleted: false
            }
        });
        const {data} = await authFetch.post('/tasks', {title, description, status, subtasks: subtasksObjects, boardId});
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI, setAlertText, closeTaskModal);
    }
});

export const getTasks = createAsyncThunk('getTasks', async (boardId, thunkAPI) => {
    try {
        const {data} = await authFetch.post(`/tasks/${boardId}`);
        return data;
    } catch (error) {
        return checkForUnAuthorizedError(error, thunkAPI);
    }
});

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        showTaskModal: (state) => {
            state.isTaskModalVisible = true;
        },
        closeTaskModal: (state) => {
            state.isTaskModalVisible = false;
        },
        setAlertText: (state, action) => {
            state.alertText = action.payload;
        },
        setActiveTask: (state, action) => {
            if (action.payload === null) {
                state.activeTask = null;
            } else {
                const [task] = state.tasks.filter((task) => task._id === action.payload);
                state.activeTask = task;
            }
        },
        setTitleError: (state, action) => {
            state.titleError = action.payload;
        },
        setSubtaskErrors: (state, action) => {
            state.subtaskErrors = action.payload;
        },
        resetSubtaskErrors: (state) => {
            Object.keys(state.subtaskErrors).forEach((key) => {
                state.subtaskErrors[key] = false;
            });
        },
        handleTaskChange: (state, action) => {
            const {name, value} = action.payload;
            state[name] = value;
        },
        handleSubtaskChange: (state, action) => {
            const {name, value} = action.payload;
            state.subtasks = {...state.subtasks, [name]: value};
        },
        addRow: (state) => {
            const id = nanoid();
            state.subtasks = {...state.subtasks, [id]: ''};
            state.subtaskErrors = {...state.subtaskErrors, [id]: false};
        },
        removeRow: (state, action) => {
            // remove the key/value pair from the object, for the selected Id
            state.subtasks = filterObject(state.subtasks, action.payload);
            state.subtaskErrors = filterObject(state.subtaskErrors, action.payload);
        },
        resetTask: (state) => {
            state.title = '';
            state.description = '';
            state.status = '';
            state.subtasks = {
                [initialIDs[0]]: '',
                [initialIDs[1]]: '',
            };
            state.subtaskErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        },
        setIsEditing: (state, action) => {
            state.isEditing = action.payload;

            if (action.payload === true) {
                const ids = state.activeTask.subtasks.map(() => nanoid());
                const values = {};
                const errors = {};
                ids.forEach((id, index) => {
                    values[id] = state.activeTask.subtasks[index];
                    errors[id] = false;
                });

                state.title = state.activeTask.title;
                state.description = state.activeTask.description;
                state.status = state.activeTask.status;
                state.subtasks = values;
                state.subtaskErrors = errors;
            }
        }
    },
    extraReducers: (builder) => {
        builder.addCase(createTask.pending, (state) => {
            state.isLoading = true;
        }).addCase(createTask.fulfilled, (state, action) => {
            state.isLoading = true;
            state.isTaskModalVisible = false;
            state.tasks = [...state.tasks, action.payload.task];
            state.title = '';
            state.description = '';
            state.status = '';
            state.subtasks = {
                [initialIDs[0]]: '',
                [initialIDs[1]]: '',
            };
            state.subtaskErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(createTask.rejected, (state, action) => {
            state.isLoading = true;
            state.alertText = action.payload;
            state.title = '';
            state.description = '';
            state.status = '';
            state.subtasks = {
                [initialIDs[0]]: '',
                [initialIDs[1]]: '',
            };
            state.subtaskErrors = {
                [initialIDs[0]]: false,
                [initialIDs[1]]: false,
            }
        }).addCase(getTasks.pending, (state) => {
            state.isLoading = true;
        }).addCase(getTasks.fulfilled, (state, action) => {
            state.isLoading = false;
            state.tasks = action.payload.tasks;
        }).addCase(getTasks.rejected, (state) => {
            state.isLoading = false;
            state.tasks = [];
        })
    }
});

export default taskSlice.reducer;

export const {
    showTaskModal,
    closeTaskModal,
    setAlertText,
    setIsEditing,
    setTitleError,
    setSubtaskErrors,
    resetSubtaskErrors,
    handleTaskChange,
    handleSubtaskChange,
    addRow,
    removeRow,
    resetTask
} = taskSlice.actions;