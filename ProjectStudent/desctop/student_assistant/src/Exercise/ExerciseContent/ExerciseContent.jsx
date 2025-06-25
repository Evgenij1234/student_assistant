import { useState, useEffect } from "react";
import React from 'react';
import '../Exercise.scss'
import ExerciseOne from "./ExerciseOne";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveExercise } from '../../store/store';

function ExerciseContent() {
  const dispatch = useDispatch();
  const masExercise = useSelector(state => state.masExercise);
  //state
  const [newExercise, setNewExercise] = useState(null);

  //method
  const AddExercise = () => {
    const data = {
      shortDescription: "", academicSubject: "", deadline: "", description: "", sourceMaterials: "",
    };
    setNewExercise(<ExerciseOne data={data} inputType={"new"} resetNewExercise={resetNewExercise}/>);
  };
  const resetNewExercise = () => {
    setNewExercise(null);
  };
  
  //render
  return (
    <div className="ExerciseContent">
      <div className="ExerciseContent-name">Задания</div>
      <div className="ExerciseContent-oneComponetn">
        {masExercise.map(element => {
          return <div key={element.length}>
            <ExerciseOne data={element} inputType={"old"} />
          </div>
        })}
        {newExercise}
      </div>
      <button onClick={AddExercise} className="ExerciseContent-Add ">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 17.3333V6.66667M6.66667 11.6667H17.3333M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#8DB9FF" stroke-width="3" />
        </svg>
        <span> </span>
        <span>Добавить</span>
      </button>
    </div>
  );
};

export default ExerciseContent;