import React, { Component } from 'react';
import '../AddSchedule/AddSchedule.css';
import logo from '../AddSchedule/img/747310.png';
import EditDaysWeek from './EditDaysWeek/EditDaysWeek';
import EditCalendar from './EditCalendar/EditCalendar';
import { sostCalendarEdit } from '../../store/store';
import { connect } from 'react-redux';
import { saveLessonGlobal } from '../../store/store';
import { clearSaveLesson } from '../../store/store';
import Notification from '../../Notification';

class EditScheduleViev extends React.Component {
    constructor(props) {
        super(props);
        this.externalScriptRef = React.createRef();
        this.state = {
            isActive: undefined,//Открытие закрытие календаря
            error: true,
            showNotification: false,//Уведомление
            showNotificationText: '',//Текс уведомления
            files: [],//Список имен файлов
            days: [],//Массив дней в виде объекта
            nameSchedule: this.props.fileName,//Имя расписания
            originalnameSchedule: this.props.fileName,
            dateStartSchedule: this.props.fileContent.dateSchedule,//Дата начала расписания
        }
    }

    toggleClass = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
        this.formatDate()
    };
    formatDate = () => {
        let date = new Date(this.props.calendarDateEdit[0], this.props.calendarDateEdit[1], this.props.calendarDateEdit[2]);
        const formatMonth = () => {
            let month = date.getMonth() + 1;
            if (month > 9) {
                return "";
            }
            else {
                return "0";
            }
        }
        let dateStartSchedule = this.state.dateStartSchedule;
        let formattedDate = `${date.getDate()}.${formatMonth()}${date.getMonth() + 1}.${date.getFullYear()}`;

        if (this.state.isActive == false) {
            return formattedDate;
        }
        else if (this.state.isActive == true) {
            return formattedDate;
        }
        else if (this.state.isActive == undefined) {
            return dateStartSchedule;
        }
    }
    //Ограничение ввода только букв и цифр
    handleInputChange = (event) => {
        const { name, value } = event.target;
        const regex = /^[a-zA-Zа-яА-Я0-9 \-]*$/;
        if (value.length < 40 && regex.test(value)) {
            this.setState({ [name]: value });
        }
    }
    //Ограничение длинны названия
    dataChecks = () => {
        if (this.state.nameSchedule.length > 0) {
            this.setState({ error: true })
            return true;
        }
        else {
            this.setState({ error: false })
        }
    }
    //Уведомление
    handleSave = (event) => {
        // Показываем уведомление
        this.setState({ showNotificationText: event });
        this.setState({ showNotification: true });

        // Запускаем таймер для скрытия уведомления через 2 секунды
        setTimeout(() => {
            this.setState({ showNotification: false });
        }, 2000);
    };
    //Проверка идентичности имя в файлах
    checkName = () => {
        for (let i = 0; i < this.state.files.length; i++) {
            if (this.state.nameSchedule == this.state.files[i]) {
                this.handleSave("Такое имя рассписания уже есть")
                return false;
            }
        }
        return true;
    }
    //ПОлучение списка имен файлов
    getNameFile = () => {
        window.electron.getNameFile().then(filesName => {
            for (let i = 0; i < filesName.length; i++) {
                filesName[i] = filesName[i].substring(0, filesName[i].length - 5);
            }
            this.setState({ files: filesName })
        }).catch(error => {
            console.error('Error getting file:', error);
        });
    }
    /////////////////////Сохраняем в файл
    globalSave = () => {
        if (this.checkName(this.state.nameSchedule) == true || this.state.nameSchedule == this.state.originalnameSchedule) {
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
                    });
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
                let win = window.electron.rewriteSchedule(schedule, this.state.originalnameSchedule);
                this.setState({
                    originalnameSchedule: this.state.nameSchedule
                })
                this.handleSave("Сохранено")
                this.getNameFile();
            }
        }
    }
    handleClearSaveLesson = () => {
        this.props.clearSaveLesson(); // Вызываем функцию очистки состояния
    };
    //Добавить день по кнопке
    AddDay = () => {
        const newDay =
            <div key={this.state.days.length + 1}>
                <EditDaysWeek numbreDay={this.state.days.length + 1} />
            </div>
        this.setState(prevState => ({ days: [...prevState.days, newDay] }))
    }
    PutDays = () => {
        const schedule = this.props.fileContent.lessonSchedule;
        console.log(schedule)
        const daysComponents = [];
        for (const day in schedule) {
            const numbreDay = parseInt(day); // Преобразование строки в число
            const newDay = (
                <div key={numbreDay}>
                    <EditDaysWeek numbreDay={numbreDay} LessonInDay={schedule[day]} />
                </div>
            );
            daysComponents.push(newDay);
        }

        this.setState({ days: daysComponents });
    }
    componentDidMount() {
        this.getNameFile();
        this.PutDays();
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
    render() {
        const { isActive } = this.state;
        return (
            <div className='AddSchedule'>
                <div className='AddSchedule-add_new_schedule'>
                    Изменение расписания
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
                            <EditCalendar todey={new Date()} />
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
        calendarDateEdit: state.calendarDateEdit,
        nameSchedule: state.nameSchedule,
        dateStartSchedule: state.dateStartSchedule,
        saveLesson: state.saveLesson,
    }
}

export default connect(mapStateToProps, { saveLessonGlobal, sostCalendarEdit, clearSaveLesson })(EditScheduleViev) 