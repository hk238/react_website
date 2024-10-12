import { Goal } from '../type/goal';
import {
  FETCH_GOALS_REQUEST,
  FETCH_GOALS_SUCCESS,
  FETCH_GOALS_FAILURE,
  GoalActionTypes
} from './goalAction';

export interface GoalState {
  goals: Goal[];
  loading: boolean;
  error: string | null;
}

const initialState: GoalState = {
  goals: [],
  loading: false,
  error: null
};

const goalReducer = (state = initialState, action: GoalActionTypes) => {
  switch (action.type) {
    case 'UPDATE_GOAL_CHECKED':
      return {
        ...state,
        goals: action.payload
      };
    case FETCH_GOALS_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    case FETCH_GOALS_SUCCESS:
      return {
        ...state,
        loading: false,
        goals: action.payload
      };
    case FETCH_GOALS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default goalReducer;
