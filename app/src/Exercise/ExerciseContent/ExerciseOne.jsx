import { useState, useRef, useEffect } from "react";
import React from 'react';
import '../Exercise.scss';
import logo1 from '../../Schedule/AddSchedule/img/img1.png';
import logo2 from '../../Schedule/AddSchedule/img/img2.png';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { saveExercise } from '../../store/store';

function ExerciseOne({ data, inputType, resetNewExercise }) {
    const dispatch = useDispatch();
    const masExercise = useSelector(state => state.masExercise);
    //state
    const [inputTypes, setinputType] = useState(inputType);
    const [errorName, setErrorName] = useState(true);
    const [shortDescription, setShortDescription] = useState(data.shortDescription);
    const [academicSubject, setAcademicSubject] = useState(data.academicSubject);
    const [deadline, setDeadline] = useState(data.deadline);
    const [description, setDescription] = useState(data.description);
    const [sourceMaterials, setSourceMaterials] = useState(data.sourceMaterials);
    const descriptionRef = useRef(null);
    const sourceMaterialsRef = useRef(null);
    //method
    useEffect(() => {
        if (descriptionRef.current) {
            descriptionRef.current.style.height = 'auto';
            descriptionRef.current.style.height = `${descriptionRef.current.scrollHeight}px`;
        }
    }, [description]);
    useEffect(() => {
        if (sourceMaterialsRef.current) {
            sourceMaterialsRef.current.style.height = 'auto';
            sourceMaterialsRef.current.style.height = `${sourceMaterialsRef.current.scrollHeight}px`;
        }
    }, [sourceMaterials]);
    
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (value.length < 1000) {
            setErrorName(true);
            switch (name) {
                case 'shortDescription':
                    setShortDescription(value);
                    break;
                case 'academicSubject':
                    setAcademicSubject(value);
                    break;
                case 'deadline':
                    setDeadline(value);
                    break;
                case 'description':
                    setDescription(value);
                    break;
                case 'sourceMaterials':
                    setSourceMaterials(value);
                    break;
                default:
                    break;
            }
        } else {
            setErrorName(false);
        }
    };

    function Save() {
        if (NameCheck(shortDescription) === true) {
            let globalData = masExercise;
            const data = {
                shortDescription: shortDescription,
                academicSubject: academicSubject,
                deadline: deadline,
                description: description,
                sourceMaterials: sourceMaterials,
            }
            globalData.push(data)
            dispatch(saveExercise(globalData));
            window.electron.SaveExercise(globalData);
            resetNewExercise();
        }
        else{
            setErrorName(false);
        }
    }
    function Delete() {
        let globalData = masExercise;
        for (let i = 0; i < globalData.length; i++) {
            if (globalData[i].shortDescription === shortDescription) {
                globalData.splice(i, 1);
            }
        }
        dispatch(saveExercise(globalData));
        window.electron.SaveExercise(globalData);
        setinputType(undefined)
    }
    function ChangeOpen() {
        setinputType("change")
    }
    function Change() {
        if (NameCheck(shortDescription) === true|| shortDescription===data.shortDescription) {
            let globalData = masExercise;
            for (let i = 0; i < globalData.length; i++) {
                if (globalData[i].shortDescription === data.shortDescription) {
                    globalData[i].shortDescription = shortDescription;
                    dispatch(saveExercise(globalData));
                    window.electron.SaveExercise(globalData);
                    setinputType("old")
                    break;
                }
            }
        }
        else{
            setErrorName(false);
        }
    }
    function NameCheck(Name) {
        for (let i = 0; i < masExercise.length; i++) {
            if (masExercise[i].shortDescription === Name) {
                return false;
            }
        }
        if (Name.length < 2) {
            return false;
        }
        return true;
    }
    function СancellationAdd() {
        resetNewExercise();
    }
    function СancellationChange() {
        setShortDescription(data.shortDescription)
        setAcademicSubject(data.academicSubject)
        setDeadline(data.deadline)
        setDescription(data.description);
        setSourceMaterials(data.sourceMaterials);
        setinputType("old")
    }
    //render
    if (inputTypes === "new") {
        return (
            <div className="ExerciseOne">
                <div className='ExerciseOne-box_input'>
                    <input
                        name="shortDescription"
                        value={shortDescription}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input glow_around' : 'glow_around-false-name'}
                        type="text"
                        placeholder="Краткое описание*"
                    />
                </div>
                <div className='ExerciseOne-box_input'>
                    <input
                        name="academicSubject"
                        value={academicSubject}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input glow_around' : 'glow_around-false-name'}
                        type="text"
                        placeholder="Учебный предмет"
                    />
                </div>
                <div className='ExerciseOne-box_input_dat ExerciseOne-box_input'>
                    <input
                        name="deadline"
                        value={deadline}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input glow_around' : 'glow_around-false-name'}
                        type="date"
                        placeholder="Дедлайн"
                    /> <div>Дата выполнения</div>
                </div>
                <div className='ExerciseOne-box_input'>
                    <textarea
                        ref={descriptionRef}
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input ExerciseOne_input-input-discription glow_around' : 'glow_around-false-name'}
                        placeholder="Описание"
                    />
                </div>
                <div className='ExerciseOne-box_input'>
                    <textarea
                        ref={sourceMaterialsRef}
                        name="sourceMaterials"
                        value={sourceMaterials}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input ExerciseOne_input-input-discription glow_around' : 'glow_around-false-name'}
                        placeholder="Исходные материалы"
                    />
                </div>
                {errorName ? null : <p className="error">Неверный ввод</p>}
                <div>
                    <button onClick={Save} className="ExerciseOne-ok glow_around">
                        Ок
                    </button>
                    <button onClick={СancellationAdd} className="ExerciseOne-Сancellation glow_around">
                        Отмена
                    </button>
                </div>
            </div>
        );
    } else if (inputTypes === "old") {
        return (
            <div className="ExerciseOne ExerciseOne-old glow_around">
                <div className="ExerciseOne-text-shortDescription">Задача:</div>
                <div className="ExerciseOne-text">{shortDescription}</div>
                <div className="ExerciseOne-text-shortDescription">Предмет:</div>
                <div className="ExerciseOne-text">{academicSubject}</div>
                <div className="ExerciseOne-text-shortDescription">Срок выполнения:</div>
                <div className="ExerciseOne-text">{deadline}</div>
                <div className="ExerciseOne-text-shortDescription">Описание:</div>
                <div className="ExerciseOne-text">{description}</div>
                <div className="ExerciseOne-text-shortDescription">Ссылки на материалы:</div>
                <div className="ExerciseOne-text"> {sourceMaterials}</div>
                <div className='ExerciseOne-button-box'>
                    <button onClick={ChangeOpen} className='ExerciseOne-button-box-button'>
                        <img className='ExerciseOne-button-box-button-img' src={logo1} alt="" />
                    </button>
                    <button onClick={Delete} className='ExerciseOne-button-box-button'>
                        <img className='ExerciseOne-button-box-button-img' src={logo2} alt="" />
                    </button>
                </div>
            </div>
        );
    } else if (inputTypes === "change") {
        return (
            <div className="ExerciseOne">
                <div className='ExerciseOne-box_input'>
                    <input
                        name="shortDescription"
                        value={shortDescription}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input glow_around' : 'glow_around-false-name'}
                        type="text"
                        placeholder="Краткое описание*"
                    />
                </div>
                <div className='ExerciseOne-box_input'>
                    <input
                        name="academicSubject"
                        value={academicSubject}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input glow_around' : 'glow_around-false-name'}
                        type="text"
                        placeholder="Учебный предмет"
                    />
                </div>
                <div className='ExerciseOne-box_input_dat ExerciseOne-box_input'>
                    <input
                        name="deadline"
                        value={deadline}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input glow_around' : 'glow_around-false-name'}
                        type="date"
                        placeholder="Дедлайн"
                    /> <div>Дата выполнения</div>
                </div>
                <div className='ExerciseOne-box_input'>
                    <textarea
                        ref={descriptionRef}
                        name="description"
                        value={description}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input ExerciseOne_input-input-discription glow_around' : 'glow_around-false-name'}
                        placeholder="Описание"
                    />
                </div>
                <div className='ExerciseOne-box_input'>
                    <textarea
                        ref={sourceMaterialsRef}
                        name="sourceMaterials"
                        value={sourceMaterials}
                        onChange={handleInputChange}
                        className={errorName ? 'ExerciseOne_input-input ExerciseOne_input-input-discription glow_around' : 'glow_around-false-name'}
                        placeholder="Исходные материалы"
                    />
                </div>
                {errorName ? null : <p className="error">Неверный ввод</p>}
                <div>
                    <button onClick={Change} className="ExerciseOne-ok glow_around">
                        Ок
                    </button>
                    <button onClick={СancellationChange} className="ExerciseOne-Сancellation glow_around">
                        Отмена
                    </button>
                </div>
            </div>
        );
    }
    else {
        return null;
    }
};

export default ExerciseOne;

