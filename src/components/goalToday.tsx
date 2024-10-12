import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/goalStore';
import { updateGoalChecked } from './redux/goalAction'; // 이 액션을 새로 만들어야 합니다
import GoalBox from './goalBox';
import {Goal} from './type/goal'


export default function GoalToday({ id }: { id: number }) {
  const dispatch = useDispatch();
  const goal = useSelector((state: RootState) => 
    state.goal.goals.find(g => g.id === id)
  );

  if (!goal) return null; // 목표가 없으면 아무것도 렌더링하지 않습니다


  const handleCheckedChange = (newChecked: boolean) => {
    dispatch(updateGoalChecked(id, newChecked) as any);
  };





  return (

    <GoalBox goal={goal} handleCheckedChange={handleCheckedChange}/>


  );
}

