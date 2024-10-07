import { configureStore } from '@reduxjs/toolkit';
import goalReducer, { GoalState } from './goalReducer';
import { Reducer, Action } from 'redux';
// import rootReducer from './reducers';

export const store = configureStore({
  reducer: {
    goal: goalReducer as Reducer<GoalState, Action>,
    // root: rootReducer,
    // 여기에 다른 리듀서들을 추가하세요
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;