import './tracker.css';

interface TrackerNavProps {
  onGoalTodayClick: () => void;
  onReflectionClick: () => void;
}

export default function TrackerNav({ onGoalTodayClick, onReflectionClick }: TrackerNavProps) {
  return (
    <div className="tracker-nav">
      <button className="goal-today" onClick={onGoalTodayClick}>goal today</button>
      <button className="reflection" onClick={onReflectionClick}>reflection</button>
    </div>
  );
}

