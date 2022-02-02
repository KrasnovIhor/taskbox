import { configureStore, createSlice } from '@reduxjs/toolkit';

const defaultTasks = [
	{ id: '1', title: 'Something', state: 'TASK_INBOX' },
	{ id: '2', title: 'Something more', state: 'TASK_INBOX' },
	{ id: '3', title: 'Something else', state: 'TASK_INBOX' },
	{ id: '4', title: 'Something again', state: 'TASK_INBOX' },
];

const AppStateSlice = createSlice({
	name: 'appState',
	initialState: '',
	reducers: {
		updateAppState: (state, action) => {
			return {
				...state,
				isError: action.payload,
			};
		},
	},
});

const TasksSlice = createSlice({
	name: 'tasks',
	initialState: defaultTasks,
	reducers: {
		updateTaskState: (state, action) => {
			const { id, newTaskState } = action.payload;
			const task = state.findIndex((task) => task.id === id);
			if (task >= 0) {
				state[task].state = newTaskState;
			}
		},
	},
});

export const { updateAppState } = AppStateSlice.actions;
// The actions contained in the slice are exported for usage in our components
export const { updateTaskState } = TasksSlice.actions;

/*
 * Our app's store configuration goes here.
 * Read more about Redux's configureStore in the docs:
 * https://redux-toolkit.js.org/api/configureStore
 */
const store = configureStore({
	reducer: {
		tasks: TasksSlice.reducer,
		isError: AppStateSlice.reducer,
	},
});

export default store;
