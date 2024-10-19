import { Goal } from "./type/goal";
import '../components/tracker.css';
import { useState } from 'react';
import { deleteGoal, updateGoal } from './redux/goalAction';
import { useDispatch } from 'react-redux';

export default function GoalBox({ goal, handleCheckedChange, submitGoal = false }: { goal: Goal, handleCheckedChange: (checked: boolean) => void, submitGoal?: boolean }) {
  const dispatch = useDispatch();



  const handleSubmit = () => {
    if (showModal) {
      dispatch(updateGoal(goal.id, { ...goal, title: goalTitle, description: goalDescription }) as any);
    }
    setShowModal(!showModal);
    setGoalTitle(goal.title);
    setGoalDescription(goal.description);
  }
  const handleGoalTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    setGoalTitle(newTitle);
  }
  const handleGoalDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newDescription = e.target.value;
    setGoalDescription(newDescription);
  }

  const handleDeleteGoal = () => {
    console.log(goal);
    dispatch(deleteGoal(goal.id) as any );
    setShowModal(false);
    setGoalTitle(goal.title);
    setGoalDescription(goal.description);
  }




  const [goalTitle, setGoalTitle] = useState(goal.title);
  const [goalDescription, setGoalDescription] = useState(goal.description);
  const [showModal, setShowModal] = useState(false);


  return (
    <div className={`goal-today-box ${showModal ? 'submit-goal' : ''}`}>
      {!showModal && 
      <button
        className={`goal-today-checkbox ${goal.checked ? 'checked' : ''}`}
        onClick={() => handleCheckedChange(!goal.checked)}
      >
        <div className='goal-today-checkbox-icon'>{goal.checked ? '✓' : ''}</div>
      </button>}

      {showModal && 
      <button  onClick={() => handleDeleteGoal()} className='goal-today-delete-button'>
        🗑️
      </button>}




      {!showModal && 
      <div style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>{goal.title}</div>}
      {showModal && 
      <input type="text" value={goalTitle} onChange={handleGoalTitleChange} className='goal-today-title-input' />}


      {!showModal && 
      <div style={{ paddingLeft: '3rem', fontSize: '0.8rem' }}>
        {goal.description.length > 30 ? goal.description.substring(0, 30) + '...' : goal.description || 'No details'}
      </div>}
      {showModal && 
      <input type="text" value={goalDescription} onChange={handleGoalDescriptionChange} className='goal-today-description-input' />}



      {submitGoal && 
        <button style={{ fontSize: '1rem', position: 'absolute', right: '20px', top: '20px' , border: 'none', background: 'none' }} 
        onClick={handleSubmit}
        >
          ✎
        </button>
      }
      <div style={{ paddingLeft: '3rem', fontSize: '0.8rem', position: 'absolute', right: '20px', top: '0px' }}>{goal.date}</div>
    </div>
  );
}
