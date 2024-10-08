import GoalBox from './goalBox';
import { Goal } from './type/goal';


export default function Reflection( { date, reflections }: { date: string, reflections: Goal[] }) {

  const handleCheckedChange = (checked: boolean) => {
    console.log(checked);
  };


  return (
    <div>
      <h1>{date}</h1>
      {reflections.map((reflection) => (
        <GoalBox goal={reflection} handleCheckedChange={handleCheckedChange} />
      ))}
    </div>
  );
}

