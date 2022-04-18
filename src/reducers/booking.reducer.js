import { createSlice } from "@reduxjs/toolkit";
import moment from "moment";

const taskSlice = createSlice({
    name: "task",
    initialState: {
        tasks: [],
    },
    reducers: {
        setTasks(state, action) {
            state.tasks = action.payload;
        },
        addNewTask(state, action) {
            const newTask = action.payload;
            state.tasks.push(newTask);
        },
        deleteTask(state, action) {
            const id = action.payload;
            state.tasks = state.tasks.filter((task) => task.id !== id);
        },
        editTask(state, action) {
            const { id, editedTask } = action.payload;
            const index = state.tasks.findIndex((task) => task.id === id);
            state.tasks[index] = editedTask;
        },
        editDateOfTask(state, action) {
            const { id, newTime } = action.payload;
            const index = state.tasks.findIndex((task) => task.id === id);
            const newDate = newTime.format("YYYY-MM-DD");
            const oldStartTime = state.tasks[index].startTime.format("HH:mm:ss");
            const oldEndTime = state.tasks[index].endTime.format("HH:mm:ss");
            const newStartTime = moment(newDate + " " + oldStartTime);
            const newEndTime = moment(newDate + " " + oldEndTime);
            state.tasks[index] = {
                ...state.tasks[index],
                startTime: newStartTime,
                endTime: newEndTime,
            };
        },
    },
});

const { actions, reducer } = taskSlice;
export const { setTasks, addNewTask, deleteTask, editTask, editDateOfTask } = actions;

export const selectTaskByTime = (time) => (state) =>
    state.task.tasks.filter(
        (task) =>
            task.startTime.format("YYYY-MM-DD") === moment(time).format("YYYY-MM-DD")
    ).sort((a, b) => a.startTime - b.startTime);

export default reducer;
