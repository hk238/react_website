import React, { useState, useEffect } from 'react';
import '../components/tracker.css';
import TrackerNav from './trackerNav';
import GoalToday from './goalToday';
import Reflection from './reflection';
import GoalAdder from './goalAdder';

// 목표 타입 정의
interface Goal {
  id: number;
  text: string;
  details: string;
  checked: boolean;
}

// API 호출을 시뮬레이션하는 함수
const fetchGoals = async (): Promise<Goal[]> => {
  // 실제 API 호출로 대체될 부분
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, text: "python", details: "Python 프로젝트의 주요 기능을 구현하고 테스트하기", checked: false },
        { id: 2, text: "react", details: "React 프로젝트의 주요 기능을 구현하고 테스트하기", checked: false },
        { id: 3, text: "javascript", details: "JavaScript 프로젝트의 주요 기능을 구현하고 테스트하기", checked: false },
      ]);
    }, 1000); // 1초 지연을 주어 비동기 작업 시뮬레이션
  });
};

export default function TrackerBox() {
  const [activeComponent, setActiveComponent] = useState<'goalToday' | 'reflection' | null>(null);
  const [goals, setGoals] = useState<Goal[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadGoals = async () => {
      setIsLoading(true);
      try {
        const fetchedGoals = await fetchGoals();
        setGoals(fetchedGoals);
      } catch (error) {
        console.error("Failed to fetch goals:", error);
        // 여기에 에러 처리 로직 추가 (예: 사용자에게 알림)
      } finally {
        setIsLoading(false);
      }
    };

    loadGoals();
  }, []);

  const handleCheckedChange = (id: number) => (newChecked: boolean) => {
    setGoals(prevGoals =>
      prevGoals.map(goal =>
        goal.id === id ? { ...goal, checked: newChecked } : goal
      )
    );
  };

  if (isLoading) {
    return <div>Loading...</div>;
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
                key={goal.id}
                goal={goal.text}
                detail={goal.details}
                checked={goal.checked}
                onCheckedChange={handleCheckedChange(goal.id)}
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
