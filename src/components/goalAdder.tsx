import '../components/tracker.css';
import { useState } from 'react';

export default function GoalAdder() {
    const [showModal, setShowModal] = useState(false);


    return (

        <div className="goal-adder" >
            {!showModal && (
            <button className="goal-adder-icon" onClick={() => setShowModal(!showModal)}>
                ++++
            </button>
            )}

            {showModal && (
            <div className="goal-adder-modal">
                <input type="text" placeholder="목표를 입력하세요" />
                <input type="text" placeholder="목표를 입력하세요" />
                <button>추가</button>
                <button className="goal-adder-modal-cancel" onClick={() => setShowModal(!showModal)}>취소</button>
            </div>
            )}
        </div>



    );
}

