import '../components/tracker.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal } from '../components/redux/goalAction';
import { RootState } from '../components/redux/goalStore';
import { Goal } from '../components/type/goal';




export default function GoalAdder( ) {
    const dispatch = useDispatch();
    const goals = useSelector((state: RootState) => state.goal.goals);
    const [showModal, setShowModal] = useState(false);
    const [goalText, setGoalText] = useState('');
    const [goalDetails, setGoalDetails] = useState('');

    async function postGoals(goal: Omit<Goal, 'id'>): Promise<Goal> {
        // const response = await fetch('http://localhost:3000/goals', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(goal),
        // });
        // if (!response.ok) {
        //     throw new Error('Failed to post goal');
        // }
        // return response.json();


         // 서버 통신을 시뮬레이션하기 위해 setTimeout 사용
         return new Promise((resolve) => {
            setTimeout(() => {
                const newGoal: Goal = {
                    ...goal,
                    id: Math.floor(Math.random() * 1000000) // 임의의 ID 생성
                };
                resolve(newGoal);
            }, 500); // 500ms 지연을 주어 비동기 작업을 시뮬레이션
        });
    }


    
    const handleAddGoal = async () => {
        const newGoal: Omit<Goal, 'id'> = {
            title: goalText, // 이 값들은 실제 입력된 값으로 변경해야 합니다
            description: goalDetails,
            checked: false,
            date: new Date().toISOString().split('T')[0],
        };

        try {
            const createdGoal = await postGoals(newGoal);
            dispatch(addGoal(createdGoal) as any);
            setShowModal(false);
            setGoalText('');
            setGoalDetails('');
        } catch (error) {
            console.error('Error adding goal:', error);
            // 여기에 사용자에게 오류를 표시하는 로직을 추가할 수 있습니다
        }
    };




    return (

        <div className="goal-adder" >
            {!showModal && (
            <button className="goal-adder-icon" onClick={() => setShowModal(!showModal)}>
                ++++
            </button>
            )}

            {showModal && (
            <div className="goal-adder-modal">
                <div className="goal-adder-modal-title">✎ add your goal</div>
                <div className="goal-adder-modal-goalName">
                    <label>Goal</label>
                    <input type="text" placeholder="" value={goalText} onChange={(e) => setGoalText(e.target.value)} />
                </div>
                <div className="goal-adder-modal-goalDetail">
                    <label>Description</label>
                    <textarea  placeholder="Detail description about your goal" value={goalDetails} onChange={(e) => setGoalDetails(e.target.value)} />
                </div>
                <button className="goal-adder-modal-cancel" onClick={() => setShowModal(!showModal)}>x</button>
                <button className="goal-adder-modal-add"
                    onClick={handleAddGoal}
                    disabled={!goalText || !goalDetails}

                >Done</button>
            </div>
            )}
        </div>



    );
}

