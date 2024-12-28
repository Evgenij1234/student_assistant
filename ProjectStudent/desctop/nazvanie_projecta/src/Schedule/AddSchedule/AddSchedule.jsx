import React, { Component } from 'react';
import './AddSchedule.css';
import logo from './img/747310.png';
import DaysWeek from './DaysWeek/DaysWeek';
import Calendar from './Calendar/Calendar';
import { sostCalendar } from '../../store/store';
import { connect } from 'react-redux';
import { saveLessonGlobal } from '../../store/store';
import Notification from '../../Notification';
import { clearSaveLesson } from '../../store/store';

class AddSchedule extends React.Component {
    constructor(props) {
        super(props);
        this.externalScriptRef = React.createRef();
        this.state = {
            days: [],
            isActive: false,
            nameSchedule: "",
            dateStartSchedule: "",
            error: true,
            showNotification: false,
            showNotificationText: '',
            files: [],
        }
    }

    toggleClass = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
    };

    AddDay = () => {
        const newDay =
            <div key={this.state.days.length}>
                <DaysWeek numbreDay={this.state.days.length + 1} />
            </div>
        this.setState(prevState => ({ days: [...prevState.days, newDay] }))
    }
    formatDate = () => {
        let date = new Date(this.props.calendarDate[0], this.props.calendarDate[1], this.props.calendarDate[2]);
        const formatMonth = () => {
            let month = date.getMonth() + 1;
            if (month > 9) {
                return "";
            }
            else {
                return "0";
            }
        }
        let formattedDate = `${date.getDate()}.${formatMonth()}${date.getMonth() + 1}.${date.getFullYear()}`;
        return formattedDate;
    }
    handleInputChange = (event) => {
        const { name, value } = event.target;
        const regex = /^[a-zA-Zа-яА-Я0-9\s"'()]*$/;
        if (value.length < 40 && regex.test(value)) {
            this.setState({ [name]: value });
        }
    }

    dataChecks = () => {
        if (this.state.nameSchedule.length > 0) {
            this.setState({ error: true })
            return true;
        }
        else {
            this.setState({ error: false })
        }
    }

    handleSave = (event) => {
        // Показываем уведомление
        this.setState({ showNotificationText: event });
        this.setState({ showNotification: true });

        // Запускаем таймер для скрытия уведомления через 2 секунды
        setTimeout(() => {
            this.setState({ showNotification: false });
        }, 2000);
    };


    checkName = () => {
        for (let i = 0; i < this.state.files.length; i++) {
            if (this.state.nameSchedule == this.state.files[i]) {
                this.handleSave("Такое имя рассписания уже есть")
                return false;
            }
        }
        return true;
    }
    getFile = () => {
        window.electron.getNameFile().then(filesName => {
            for (let i = 0; i < filesName.length; i++) {
                filesName[i] = filesName[i].substring(0, filesName[i].length - 5);
            }
            this.setState({ files: filesName })
        }).catch(error => {
            console.error('Error getting file:', error); // Обработка ошибки, если она произошла
        });
    }
    componentDidMount() {
        this.getFile();
        this.handleClearSaveLesson();
        window.addEventListener('keydown', this.handleKeyPress);
    }
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyPress);
    }
    handleKeyPress = (event) => {
        if (event.ctrlKey && event.key === 's'|| event.ctrlKey && event.key === 'ы') {
            event.preventDefault();
            this.globalSave();
        }
    };
    globalSave = () => {
        if (this.checkName(this.state.nameSchedule) == true) {
            if (this.dataChecks() == true) {
                let daysLesson = this.props.saveLesson;
                const groupedLessons = daysLesson.reduce((acc, lesson) => {
                    const day = lesson.numbreDay;
                    if (!acc[day]) {
                        acc[day] = [];
                    }
                    acc[day].push({
                        item: lesson.item,
                        numbreLesson: lesson.numbreLesson,
                        place: lesson.place,
                        teacher: lesson.teacher,
                        time_start_hour: lesson.time_start_hour,
                        time_start_minute: lesson.time_start_minute,
                        time_stop_hour: lesson.time_stop_hour,
                        time_stop_minute: lesson.time_stop_minute,
                        view: lesson.view
                    }
                    );
                    return acc;
                }, {});
                delete groupedLessons[NaN];
                for (const day in groupedLessons) {
                    groupedLessons[day].sort((a, b) => a.numbreLesson - b.numbreLesson);
                }
                const days = Object.keys(groupedLessons).map(Number);
                const maxDay = Math.max(...days);
                const minDay = Math.min(...days);

                for (let day = 1; day < maxDay; day++) {
                    if (!groupedLessons[day]) {
                        groupedLessons[day] = [];
                    }
                }
                const daysLength = Object.keys(groupedLessons).length;
                const remainder = daysLength % 7;
                const daysToAdd = remainder === 0 ? 0 : 7 - remainder;

                for (let i = 0; i < daysToAdd; i++) {
                    const newDay = daysLength + i + 1;
                    groupedLessons[newDay] = [];
                }
                console.log(groupedLessons);
                let schedule = {
                    nameSchedule: this.state.nameSchedule,
                    dateSchedule: this.formatDate(),
                    lessonSchedule: groupedLessons
                }
                let win = window.electron.saveFile(schedule);
                this.setState({
                    days: [],
                    isActive: false,
                    nameSchedule: "",
                    dateStartSchedule: "",
                    error: true,
                    files: [],
                })
                this.handleSave("Сохранено")
                this.getFile();
                this.handleClearSaveLesson();
            }
        }
    }
    handleClearSaveLesson = () => {
        this.props.clearSaveLesson(); 
    };
    
    render() {
        const { isActive } = this.state;
        return (
            <div className='AddSchedule'>
                <div className='AddSchedule-add_new_schedule'>
                    Заполнение нового расписания
                </div>
                <div className='AddSchedule-block_name_schedule'>
                    <input name='nameSchedule' value={this.state.nameSchedule} onChange={this.handleInputChange} className={this.state.error ? 'AddSchedule-block_name_schedule-input glow_around' : 'AddSchedule-block_name_schedule-input-false'} type="text" />
                    <div className='AddSchedule-block_name_schedule-text'>
                        Наименование*
                    </div>
                </div>
                <div className='AddSchedule-block_calendar'>
                    <div>
                        <button onClick={this.toggleClass} className='AddSchedule-block_calendar-open glow_around'>
                            {this.formatDate()}
                            <img className='AddSchedule-block_calendar-img' src={logo} alt="" />
                        </button>
                        <div className={isActive ? 'Calendar' : 'Calendar_close'}>
                            <Calendar todey={new Date()} />
                        </div>
                    </div>
                    <div className='AddSchedule-block_calendar-text'>Дата начала*</div>
                </div>
                <div className='AddSchedule-box'>
                    {this.state.days}
                </div>
                <div className='AddSchedule-box_save'>
                    <button onClick={this.AddDay} className='AddSchedule-box_save-button '>
                        <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 32.6667V11.3333M11.3333 21.3333H32.6667M42 22C42 33.0457 33.0457 42 22 42C10.9543 42 2 33.0457 2 22C2 10.9543 10.9543 2 22 2C33.0457 2 42 10.9543 42 22Z" stroke="#8DB9FF" stroke-width="3" />
                        </svg>
                        Добавить день
                    </button>
                </div>
                <div className='AddSchedule-save'>
                    <button id='saveSchedule' onClick={this.globalSave} className='AddSchedule-save-button glow_around'>
                        Сохранить
                    </button>
                    <Notification isVisible={this.state.showNotification} text={this.state.showNotificationText} />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return {
        calendarDate: state.calendarDate,
        nameSchedule: state.nameSchedule,
        dateStartSchedule: state.dateStartSchedule,
        saveLesson: state.saveLesson,
    }
}

export default connect(mapStateToProps, { saveLessonGlobal, sostCalendar, clearSaveLesson })(AddSchedule) 
