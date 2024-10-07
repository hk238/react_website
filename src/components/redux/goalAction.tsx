import { Dispatch } from 'redux';
import { Goal } from '../type/goal';
import { RootState } from './goalStore';


// 액션 타입
export const FETCH_GOALS_REQUEST = 'FETCH_GOALS_REQUEST';
export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS';
export const FETCH_GOALS_FAILURE = 'FETCH_GOALS_FAILURE';

// 액션 인터페이스
interface FetchGoalsRequestAction {
  type: typeof FETCH_GOALS_REQUEST;
}

interface FetchGoalsSuccessAction {
  type: typeof FETCH_GOALS_SUCCESS;
  payload: Goal[];
}

interface FetchGoalsFailureAction {
  type: typeof FETCH_GOALS_FAILURE;
  payload: string;
}

interface UpdateGoalCheckedAction {
  type: 'UPDATE_GOAL_CHECKED';
  payload: { id: number; checked: boolean };
}

export type GoalActionTypes = 
  | FetchGoalsRequestAction
  | FetchGoalsSuccessAction
  | FetchGoalsFailureAction
  | UpdateGoalCheckedAction;

// 액션 생성자
export const fetchGoalsRequest = (): FetchGoalsRequestAction => ({
  type: FETCH_GOALS_REQUEST
});

export const fetchGoalsSuccess = (goals: Goal[]): FetchGoalsSuccessAction => ({
  type: FETCH_GOALS_SUCCESS,
  payload: goals
});

export const fetchGoalsFailure = (error: string): FetchGoalsFailureAction => ({
  type: FETCH_GOALS_FAILURE,
  payload: error
});

// 비동기 액션 생성자
export const fetchGoals = () => {
  return async (dispatch: Dispatch<GoalActionTypes>) => {
    dispatch(fetchGoalsRequest());
    try {
      const response = await fetch('/api/goals');
      const data = await response.json();
      dispatch(fetchGoalsSuccess(data));
    } catch (error) {
      dispatch(fetchGoalsFailure(error as string));
    }
  };
};

export const hardcodedGoals = () => {
  return async (dispatch: Dispatch<GoalActionTypes>) => {
    dispatch(fetchGoalsSuccess([
        { id: 1, title: "python", description: "Python 프로젝트의 주요 기능을 구현하고 테스트하기", checked: false, date: "2024-07-01" },
        { id: 2, title: "react", description: "React 프로젝트의 주요 기능을 구현하고 테스트하기", checked: false, date: "2024-07-01" },
        { id: 3, title: "javascript", description: "JavaScript 프로젝트의 주요 기능을 구현하고 테스트하기", checked: false, date: "2024-07-01" },
    ]));
  };
};

export const addGoal = (goal: Goal) => {
  return async (dispatch: Dispatch<GoalActionTypes>, getState: () => RootState) => {
    const { goals } = getState().goal;
    dispatch(fetchGoalsSuccess([...goals, goal]));
  };
};


export const updateGoalChecked = (id: number, checked: boolean) => {
  return {
    type: 'UPDATE_GOAL_CHECKED',
    payload: { id, checked }
  };
};

