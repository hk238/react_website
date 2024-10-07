import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './redux/goalStore';
import { updateGoalChecked } from './redux/goalAction'; // 이 액션을 새로 만들어야 합니다

export default function GoalToday({ id }: { id: number }) {
  const dispatch = useDispatch();
  const goal = useSelector((state: RootState) => 
    state.goal.goals.find(g => g.id === id)
  );

  if (!goal) return null; // 목표가 없으면 아무것도 렌더링하지 않습니다

  const handleCheckedChange = (newChecked: boolean) => {
    dispatch(updateGoalChecked(id, newChecked));
  };

  return (
    <div className='goal-today-box'>
      <button 
        className={`goal-today-checkbox ${goal.checked ? 'checked' : ''}`} 
        onClick={() => handleCheckedChange(!goal.checked)}
      >
        <div className='goal-today-checkbox-icon'>{goal.checked ? '✓' : ''}</div>
      </button>
      <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{goal.title}</div>
      <div style={{paddingLeft: '3rem', fontSize: '0.8rem'}}>
        {goal.description.length > 30 ? goal.description.substring(0, 30) + '...' : goal.description || 'No details'}
      </div>
      <div style={{paddingLeft: '3rem', fontSize: '0.8rem', position: 'absolute', right: '20px'}}>{goal.date}</div>
    </div>
  );
}

