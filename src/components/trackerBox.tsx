import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import '../components/tracker.css';
import TrackerNav from './trackerNav';
import GoalToday from './goalToday';
import Reflection from './reflection';
import { fetchGoals } from './redux/goalAction';
import GoalAdder from './goalAdder';
import { RootState } from './redux/goalStore';
import { Goal } from './type/goal';
import {hardcodedReflections} from './hardcodedData/hardCodedData';


const asyncReflections = async () => {
  // Use hardcoded data
  // return hardcodedReflections;


  const response = await fetch('http://localhost:3001/api/goals/desc');
  const data = await response.json();
  return data;
};

const handleReflections = async () => {
  const data = await asyncReflections();
  
  // 날짜별로 데이터를 그룹화
  const groupedByDate = data.reduce((acc: { [key: string]: any[] }, item: Goal) => {
    if (!acc[item.date]) {
      acc[item.date] = [];
    }
    acc[item.date].push(item);
    return acc;
  }, {});

  return groupedByDate;
};



export default function TrackerBox() {
  const [activeComponent, setActiveComponent] = useState<'goalToday' | 'reflection' | null>(null);
  const dispatch = useDispatch();
  const { goals, loading, error } = useSelector((state: RootState) => state.goal);
  const [reflections, setReflections] = useState<{ [key: string]: any[] }>({});


  useEffect(() => {
    // dispatch(hardcodedGoals() as any);
    dispatch(fetchGoals() as any);
  }, [dispatch]);

  useEffect(() => {
    handleReflections().then((data) => {
      setReflections(data);
    });
  }, []);

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

        {activeComponent === 'reflection' && (
          <>
            {Object.keys(reflections).map((date) => (
              <Reflection
                date={date}
                reflections={reflections[date]}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
