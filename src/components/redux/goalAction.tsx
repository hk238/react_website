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
  payload: Goal[];
}

interface DeleteGoalAction {
  type: 'DELETE_GOAL';
  payload: Goal[];
}

interface UpdateGoalAction {
  type: 'UPDATE_GOAL';
  payload: Goal[];
}

export type GoalActionTypes = 
  | FetchGoalsRequestAction
  | FetchGoalsSuccessAction
  | FetchGoalsFailureAction
  | UpdateGoalCheckedAction
  | DeleteGoalAction
  | UpdateGoalAction;

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

export const fetchGoalCheckedUpdate = (goals: Goal[]): UpdateGoalCheckedAction => ({
  type: 'UPDATE_GOAL_CHECKED',
  payload: goals
});

export const fetchGoalDelete = (goals: Goal[]): DeleteGoalAction => ({
  type: 'DELETE_GOAL',
  payload: goals
});

export const fetchGoalUpdate = (goals: Goal[]): UpdateGoalAction => ({
  type: 'UPDATE_GOAL',
  payload: goals
});





// 비동기 액션 생성자
export const fetchGoals = () => {
  return async (dispatch: Dispatch<GoalActionTypes>) => {
    dispatch(fetchGoalsRequest());
    try {
      const daysAgo = 10;
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);
      const formattedDate = date.toISOString().split('T')[0];

      const response = await fetch(`https://react-website-krjr.onrender.com/api/goals/after/${formattedDate}`);
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
  return async (dispatch: Dispatch<GoalActionTypes>, getState: () => RootState) => {
    try {
      const { goals } = getState().goal;
      const goalToUpdate = goals.find(goal => goal.id === id);
      
      if (!goalToUpdate) {
        throw new Error('Goal not found');
      }

      const updatedGoal = { ...goalToUpdate, checked };

      const response = await fetch(`https://react-website-krjr.onrender.com/api/goals/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedGoal),
      });

      if (!response.ok) {
        throw new Error('Failed to update goal');
      }

      const updatedGoalFromServer = await response.json();

      const updatedGoals = goals.map(goal => 
        goal.id === id ? updatedGoalFromServer : goal
      );

      dispatch(fetchGoalCheckedUpdate(updatedGoals));
    } catch (error) {
      console.error('Error updating goal:', error);
      dispatch(fetchGoalsFailure((error as Error).message));
    }
  };
};


export const deleteGoal = (id: number) => {
  return async (dispatch: Dispatch<GoalActionTypes>, getState: () => RootState) => {
    const { goals } = getState().goal;
    const updatedGoals = goals.filter(goal => goal.id !== id);

    const response = await fetch(`https://react-website-krjr.onrender.com/api/goals/${id}`, {
      method: 'DELETE',
    });


    dispatch(fetchGoalDelete(updatedGoals) as any);
  };
};


export const updateGoal = (id: number, goal: Goal) => {
  return async (dispatch: Dispatch<GoalActionTypes>, getState: () => RootState) => {
    const { goals } = getState().goal;
    const updatedGoals = goals.map(goal => goal.id === id ? goal : goal);
   

    const response = await fetch(`https://react-website-krjr.onrender.com/api/goals/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(goal),
    });

    dispatch(fetchGoalUpdate(updatedGoals));
  };
};
