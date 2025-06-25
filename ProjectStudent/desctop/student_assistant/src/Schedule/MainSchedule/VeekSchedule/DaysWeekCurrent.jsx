import React, { Component } from 'react';
import LessonCurrent from './LessonCurrent';
import '../../MainSchedule/MainSchedule.css'
import '../../AddSchedule/DaysWeek/DaysWeek.css'
import '../VeekSchedule/VeekSchedule.css'

class DaysWeekCurrent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: this.props.lesson,
            numbreDay: this.props.numbreDay,
            week: {
                0: "Понедельник",
                1: "Вторник",
                2: "Среда",
                3: "Четверг",
                4: "Пятница",
                5: "Суббота",
                6: "Воскресенье",
            },
            newDat: "",
        }
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
    Whatadat = (dat) => {
        var timestamp = dat;
        var date = new Date(timestamp);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();
        var dateString = `${day}.${month}.${year}`;
        return dateString
    }

    Whatadatnew = (dat) => {
        var timestamp = dat;
        var date = new Date(timestamp);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

        const currentDate = new Date(year, month - 1, day)
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (currentDate.getTime() == today.getTime()) {
            return ("Сегодня")
        }
        else {
            return null
        }
    }

    render() {
        const dayname = this.Whataday(this.props.numbreDay)
        const dat = this.Whatadat(this.props.dateDay)
        const newDat = this.Whatadatnew(this.props.dateDay)
        if (this.state.lesson.length > 0) {
            return (
                <div className='DaysWeek '>
                    <div className=' DaysWeek-day-mine-box'>
                        <div></div>{dayname}<div className='DaysWeek-day-mine-newDat'>{dat} {newDat}</div>
                    </div>
                    {this.state.lesson.map(el => (
                        <LessonCurrent lesson={el} />
                    ))}
                </div>
            )
        }
        else {
            return (
                <div className='DaysWeek '>
                    <div className='DaysWeek-day-mine-box'>
                        <div></div> {dayname}<div  className='DaysWeek-day-mine-newDat'>{dat} {newDat}</div>
                    </div>
                    <div className='DaysWeek-day-Lesson_none'>Занятий нет</div>
                </div>
            )
        }
    }
}

export default DaysWeekCurrent