import React from "react";
import { useState } from "react";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveExercise } from '../store/store';

function TopPanelExercise() {
    const dispatch = useDispatch();
    const masExercise = useSelector(state => state.masExercise);

    function Delete() {
        dispatch(saveExercise([]));
        window.electron.SaveExercise([]);
    }
    return (
        <div className='TopPanel'>
          
        </div>
    )
}
export default TopPanelExercise