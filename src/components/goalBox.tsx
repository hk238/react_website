import { Goal } from "./type/goal";

export default function GoalBox({ goal, handleCheckedChange }: { goal: Goal, handleCheckedChange: (checked: boolean) => void | null }) {

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

