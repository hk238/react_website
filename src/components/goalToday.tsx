import React from 'react';

export default function GoalToday({ 
  goal, 
  details, 
  checked, 
  onCheckedChange 
}: { 
  goal: string, 
  details: string, 
  checked: boolean,
  onCheckedChange: (checked: boolean) => void
}) 


{
  return (
    <div className='goal-today-box'>
      <button 
        className={`goal-today-checkbox ${checked ? 'checked' : ''}`} 
        onClick={() => onCheckedChange(!checked)}
      >
        <div className='goal-today-checkbox-icon'>{checked ? '✓' : ''}</div>
      </button>
      {goal}
      {details}
    </div>
  );
}

