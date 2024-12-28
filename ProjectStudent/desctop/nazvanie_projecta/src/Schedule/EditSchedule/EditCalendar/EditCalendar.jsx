import React, { Component } from 'react';
import './EditCalendar.css';
import { sostCalendarEdit } from '../../../store/store';
import { connect } from 'react-redux';

class EditCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDay: "Пусто",
            currDay: this.props.todey.getDate(),
            currMonth: this.props.todey.getMonth(),
            currYear: this.props.todey.getFullYear(),
            DaysOfWeek: [
                'Пн',
                'Вт',
                'Ср',
                'Чт',
                'Пт',
                'Су',
                'Вс'
            ],
            Months: [
                'Январь',
                'Февраль',
                'Март',
                'Апрель',
                'Май',
                'Июнь',
                'Июль',
                'Август',
                'Сентябрь',
                'Октябрь',
                'Ноябрь',
                'Декабрь'
            ]
        }
    }

    nextMonth = () => {
        if (this.state.currMonth == 11) {
            this.setState({ currMonth: 0 })
            this.setState({ currYear: this.state.currYear + 1 })
        }
        else {
            this.setState({ currMonth: this.state.currMonth + 1 })
        }
    };
    previousMonth = () => {
        if (this.state.currMonth == 0) {
            this.setState({ currMonth: 11 })
            this.setState({ currYear: this.state.currYear - 1 })
        }
        else {
            this.setState({ currMonth: this.state.currMonth - 1 })
        }

    }
    showcurr = () => {
        return this.showMonth(this.state.currYear, this.state.currMonth);
    }
    showMonth = (y, m) => {
        const firstDayOfMonth = new Date(y, m, 1).getDay(); // Получаем день недели первого дня месяца
        const adjustedFirstDayOfMonth = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1; // Корректируем для вашего календаря
        const lastDateOfMonth = new Date(y, m + 1, 0).getDate();
        const lastDayOfLastMonth = m === 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();
    
        const days = [];
        let dayCounter = 1;
    
        for (let i = 0; i < 6; i++) {
            const cells = [];
    
            for (let j = 0; j < 7; j++) {
                if (i === 0 && j < adjustedFirstDayOfMonth) { // Изменяем условие для учета коррекции
                    const day = lastDayOfLastMonth - adjustedFirstDayOfMonth + j + 1;
                    cells.push(<td key={`empty-${i}-${j}`} className="Calendar-day_week-table-td_past"></td>);
                } else if (dayCounter <= lastDateOfMonth) {
                    const classNames = (dayCounter === this.state.currDay && m === this.state.currMonth && y === this.state.currYear) ? 'Calendar-day_week-table-td_today' : 'Calendar-day_week-table-td_normal';
                    cells.push(<td onClick={this.getSelectedDay} key={`day-${dayCounter}`} className={classNames}>{dayCounter}</td>);
                    dayCounter++;
                } else {
                    cells.push(<td key={`empty-${i}-${j}`} className="Calendar-day_week-table-td_future"></td>);
                }
            }
    
            days.push(<tr key={`row-${i}`} className="Calendar-day_week-table-tr">{cells}</tr>);
            if (dayCounter > lastDateOfMonth) break;
        }
    
        return (
            <table className='Calendar-day_week-table'>
                <tbody>
                    <tr className="Calendar-day_week-table-tr">
                        {this.state.DaysOfWeek.map(day => <td key={`header-${day}`}>{day}</td>)}
                    </tr>
                    {days}
                </tbody>
            </table>
        );
    };
    getSelectedDay = (event) => {
        var d = event.target.textContent;
        var dateMas = [this.state.currYear, this.state.currMonth, d];
        this.props.sostCalendarEdit(dateMas);
    }
    render() {
        return (
            <div >
                <div className='Calendar-top'>
                    <button onClick={this.previousMonth} className='Calendar-top-button'>{"<"}</button>
                    <div className='Calendar-top-year_and_month'>{this.state.currYear} {this.state.Months[this.state.currMonth]}</div>
                    <button onClick={this.nextMonth} className='Calendar-top-button'>{">"}</button>
                    <div className='Calendar-day_week'>
                        {this.showcurr()}
                    </div>
                </div>
            </div>
        )
    }

}
export default connect(null, { sostCalendarEdit }) (EditCalendar) 