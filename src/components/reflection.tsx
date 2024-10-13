import GoalBox from './goalBox';
import { Goal } from './type/goal';
import './tracker.css';
import { useState } from 'react';


export default function Reflection( { date, reflections }: { date: string, reflections: Goal[] }) {
  const [showReflection, setShowReflection] = useState(false);



  const handleCheckedChange = (checked: boolean) => {
    console.log(checked);
  };




  return (
    <div>
      <h1 className='reflection-title' onClick={() => setShowReflection(!showReflection)}>{date}</h1>
      <div className={`reflection-content ${showReflection ? 'show' : ''}`}>
        {showReflection && reflections.map((reflection) => (
          <GoalBox goal={reflection} handleCheckedChange={handleCheckedChange} />
        ))}
      </div>
    </div>
  );
}

