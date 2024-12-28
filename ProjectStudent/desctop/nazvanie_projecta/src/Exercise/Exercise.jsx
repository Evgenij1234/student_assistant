import { useState, useEffect } from "react";
import React from 'react';
import TopPanelExercise from "./TopPanelExercise";
import ExerciseContent from "./ExerciseContent/ExerciseContent";
import './Exercise.scss';
import { useSelector, useDispatch } from 'react-redux';
import { saveExercise } from '../store/store';

function Exercise() {
  const dispatch = useDispatch();
  const [dataFile, setDataFile] = useState(null);
  const masExercise = useSelector(state => state.masExercise);

  // Фетч данных при монтировании компонента
  useEffect(() => {
    const fetchData = async () => {
      try {
        const files = await window.electron.getFileExercise();
        setDataFile(files);
        dispatch(saveExercise(files));
      } catch (error) {
        console.error('Error getting file:', error);
      }
    };
    fetchData();
  }, [dispatch]);

  // Обновление dataFile при изменении masExercise
  useEffect(() => {
    setDataFile(masExercise);
  }, [masExercise]);

  if (!dataFile || dataFile !== masExercise|| dataFile.length !== masExercise.length) {
    return (
      <div className="Exercise">
        <TopPanelExercise />
        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="Exercise">
      <TopPanelExercise />
      <ExerciseContent />
      {console.log(masExercise)}
    </div>
  );
}

export default Exercise;
