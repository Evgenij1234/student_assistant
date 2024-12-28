import React, { Component } from 'react';
import './MainSchedule.css';
import VeekSchedule from './VeekSchedule/VeekSchedule';

class MainSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            file: "",
            nameSchedule: "",
            dateSchedule: "",
            lessonSchedule: "",
            numderWeek: 1,
            error: {
                sost: false,
                cause: "",
            },
            dateEnd: "",
            validStartDate: "",
        }
    }
    getSchedule = () => {
        window.electron.getScheduleFile().then(getingfile => {
            if (getingfile != null) {
                let days = Object.keys(getingfile.lessonSchedule).length;
                if (days != 0) {
                    let datStart = this.parseDatNewTime(getingfile.dateSchedule, days)
                    let datEnd = this.parseDatend(datStart, days)
                    this.setState({
                        file: getingfile,
                        nameSchedule: getingfile.nameSchedule,
                        dateSchedule: datStart,
                        lessonSchedule: getingfile.lessonSchedule,
                        dateEnd: datEnd,
                    })
                }
                else if (days == 0) {
                    this.setState(prevState => ({
                        ...prevState,
                        error: {
                            ...prevState.error,
                            sost: true,
                            cause: "notDay",
                        }
                    }))
                }
            }
            else {
                this.setState(prevState => ({
                    ...prevState,
                    error: {
                        ...prevState.error,
                        sost: true,
                        cause: "notSchedule",
                    }
                }))
            }
        })
    }
    parseDatNewTime(dataString, dataLength) {
        const [day, month, year] = dataString.split(".");
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
    
        let currentDate = new Date(inputDate);
    
        // Если исходная дата меньше текущей, пересчитываем её в текущий период
        if (inputDate < today) {
            while (currentDate <= today) {
                currentDate.setDate(currentDate.getDate() + dataLength);
            }
            // Отнимаем один период, чтобы получить текущий период
            currentDate.setDate(currentDate.getDate() - dataLength);
        }
    
        return `${currentDate.getDate().toString().padStart(2, '0')}.${(currentDate.getMonth() + 1).toString().padStart(2, '0')}.${currentDate.getFullYear()}`;
    }
    
    parseDatend = (dateString, dataLength) => {
        var parts = dateString.split(".");
        var day = parseInt(parts[0], 10);
        var month = parseInt(parts[1], 10) - 1; 
        var year = parseInt(parts[2], 10);
        var inputDate = new Date(year, month, day);
        var dayOfWeek = inputDate.getDay();
        var daysUntilMonday = (dayOfWeek === 1) ? 0 : (dayOfWeek === 0) ? 1 : 8 - dayOfWeek;
        inputDate.setDate(inputDate.getDate() + daysUntilMonday);
        let validStartDateMilesek = inputDate.getTime();
        let newStartDat = validStartDateMilesek;
        newStartDat = new Date(newStartDat);
        var newendDay = newStartDat.getDate();
        var newendMonth = newStartDat.getMonth() + 1; 
        var newendYear = newStartDat.getFullYear();
        newendDay = (newendDay < 10) ? "0" + newendDay : newendDay;
        newendMonth = (newendMonth < 10) ? "0" + newendMonth : newendMonth;
        var newendDateStr = newendDay + "." + newendMonth + "." + newendYear;
        this.setState({
            validStartDate: validStartDateMilesek,
            dateSchedule: newendDateStr,
        });
        inputDate.setDate(inputDate.getDate() + dataLength - 1);
        var endDay = inputDate.getDate();
        var endMonth = inputDate.getMonth() + 1; 
        var endYear = inputDate.getFullYear();
        endDay = (endDay < 10) ? "0" + endDay : endDay;
        endMonth = (endMonth < 10) ? "0" + endMonth : endMonth;
        var endDateStr = endDay + "." + endMonth + "." + endYear;
        return endDateStr;
    }

    backWeek = () => {
        if (this.state.numderWeek > 1) {
            this.setState({ numderWeek: this.state.numderWeek - 1 })
        }
    }
    nextWeek = () => {
        let days = Object.keys(this.state.lessonSchedule).length;
        let quantityWeek = days / 7;
        if (this.state.numderWeek < quantityWeek) {
            this.setState({ numderWeek: this.state.numderWeek + 1 })
        }
    }
    componentDidMount() {
        this.getSchedule();
    }
    render() {
        if (this.state.error.sost == true && this.state.error.cause == "notSchedule") {
            return (<div className='MainSchedule'>
                <div className='MainSchedule-warning'>Расписание не назначено основным или отсутствует</div>
            </div>)

        }
        else if (this.state.error.sost == true && this.state.error.cause == "notDay") {
            return (<div className='MainSchedule'>
                <div className='MainSchedule-warning'>В расписании нет ни одного заполненого занятия</div>
            </div>)
        }
        else {
            return (
                <div className='MainSchedule'>
                    <div className='MainSchedule-name'>
                        {this.state.nameSchedule}
                    </div>
                    <div className='MainSchedule-list_and_dat'>
                        <div className='MainSchedule-list_and_dat-list_left'>
                            <button onClick={this.backWeek} className='MainSchedule-list_and_dat-list_left-button'>
                                <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0 9L15 0.339745L15 17.6603L0 9Z" fill="#8DB9FF" />
                                </svg>
                                <span className='MainSchedule-list_and_dat-list_left-button-text'>Предыдущая неделя</span>
                            </button>
                        </div>
                        <div className='MainSchedule-list_and_dat-dat'>
                            <div className='MainSchedule-list_and_dat-dat-text'>
                                {this.state.dateSchedule} - {this.state.dateEnd}
                            </div>
                        </div>
                        <div className='MainSchedule-list_and_dat-list_right'>
                            <button onClick={this.nextWeek} className='MainSchedule-list_and_dat-list_right-button'>
                                <span className='MainSchedule-list_and_dat-list_left-button-text'>Следующая неделя</span>
                                <svg width="15" height="18" viewBox="0 0 15 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 9L0 17.6603L0 0.339746L15 9Z" fill="#8DB9FF" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div >
                        <VeekSchedule lessonSchedule={this.state.lessonSchedule} numderWeek={this.state.numderWeek} validStartDate={this.state.validStartDate} />
                    </div>
                </div>
            )
        }
    }
}
export default MainSchedule