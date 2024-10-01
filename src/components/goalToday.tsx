import React from 'react';

export default function GoalToday({ 
  goal, 
  detail, 
  checked, 
  onCheckedChange 
}: { 
  goal: string, 
  detail: string, 
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
      <div style={{fontSize: '1.5rem', fontWeight: 'bold'}}>{goal}</div>
      <div style={{paddingLeft: '3rem', fontSize: '0.8rem'}}>{detail.length > 30 ? detail.substring(0, 30) + '...' : detail || 'No details'}</div>
    </div>
  );
}

