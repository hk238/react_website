import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../components/tracker.css';
import TrackerNav from './trackerNav';
import GoalToday from './goalToday';
import Reflection from './reflection';
import { fetchGoals } from './redux/goalAction';
import GoalAdder from './goalAdder';
import {hardcodedGoals} from './redux/goalAction';
import { RootState } from './redux/goalStore';
import { Goal } from './type/goal';





export default function TrackerBox() {
  const [activeComponent, setActiveComponent] = useState<'goalToday' | 'reflection' | null>(null);
  const dispatch = useDispatch();
  const { goals, loading, error } = useSelector((state: RootState) => state.goal);



  useEffect(() => {
    dispatch(hardcodedGoals() as any);
  }, [dispatch]);
  



  const handleCheckedChange = (id: number) => (newChecked: boolean) => {
    // 체크 상태 변경 로직을 Redux 액션으로 구현해야 합니다.
    // 예: dispatch(updateGoalChecked(id, newChecked));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }


  return (
    <div>
      <TrackerNav
        onGoalTodayClick={() => setActiveComponent('goalToday')}
        onReflectionClick={() => setActiveComponent('reflection')}
      />

      <div className="tracker-contents">
        {activeComponent === 'goalToday' && (
          <>
            {goals.map((goal) => (
              <GoalToday
                id={goal.id}
              />
            ))}
            <div className="goal-adder-container">
              <GoalAdder />
            </div>
          </>
        )}

        {activeComponent === 'reflection' && <Reflection />}
      </div>
    </div>
  );
}
