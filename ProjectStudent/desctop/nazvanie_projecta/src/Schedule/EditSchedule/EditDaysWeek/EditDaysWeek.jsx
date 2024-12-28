import React, { Component } from 'react';
import './EditDaysWeek.css';
import EditLesson from './EditLesson/EditLesson';

class EditDaysWeek extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lesson: [],
            numbreDay: this.props.numbreDay,
            week: {
                0: "Понедельник",
                1: "Вторник",
                2: "Среда",
                3: "Четверг",
                4: "Пятница",
                5: "Суббота",
                6: "Воскресенье",
            }
        }

    }
    AddLesson = () => {
        const newLesson =
            <div key={this.state.lesson.length}>
                <EditLesson numbreLesson={this.state.lesson.length + 1} numbreDay={this.state.numbreDay} />
            </div>
        this.setState(prevState => ({ lesson: [...prevState.lesson, newLesson] }))
    }
    Whataday = (numbreDay) => {
        if (numbreDay <= 7) {
            return this.state.week[numbreDay - 1];
        }
        else if (numbreDay % 7 === 0) {
            return this.state.week[6];
        }
        else {
            let newnumbreDay = numbreDay % 7;
            return this.state.week[newnumbreDay - 1];
        }
    }
    PutLesson = () =>{
        const Lesson = this.props.LessonInDay;
        const LessonComponents = [];
        for (const lesson in Lesson) {
            const numbrelesson = parseInt(lesson); // Преобразование строки в число
            const newLesson = (
                <div key={numbrelesson}>
                    <EditLesson  numbreLesson={numbrelesson+1} numbreDay={this.state.numbreDay} discription ={Lesson[lesson]}/>
                </div>
            );
            LessonComponents.push(newLesson);
        }
        
        this.setState({ lesson: LessonComponents });
    }
    componentDidMount(){
        this.PutLesson();
    }
    render() {
        const dayname = this.Whataday(this.props.numbreDay)
        return (
            <div className='DaysWeek '>
                <div className='DaysWeek-day '>
                    {dayname}
                </div>
                {this.state.lesson}
                <button className='DaysWeek-addLesson ' onClick={this.AddLesson}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 17.3333V6.66667M6.66667 11.6667H17.3333M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#8DB9FF" stroke-width="3" />
                    </svg>
                    Добавить занятие
                </button>
            </div>
        )
    }
}

export default EditDaysWeek