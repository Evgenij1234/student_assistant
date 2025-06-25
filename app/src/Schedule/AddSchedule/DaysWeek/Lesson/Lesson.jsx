import React, { Component } from 'react';
import './Lesson.css';
import { connect } from 'react-redux';
import './ViewLesson.css';
import logo1 from '../../img/img1.png';
import logo2 from '../../img/img2.png';
import { dataLesson } from '../../../../store/store';
import { saveLessonGlobal } from '../../../../store/store';

class Lesson extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            klick: false,
            lesson: {
                numbreDay: this.props.numbreDay,
                numbreLesson: this.props.numbreLesson,
                item: "",
                view: "",
                teacher: "",
                place: " ",
                time_start_hour: "00",
                time_start_minute: "00",
                time_stop_hour: "00",
                time_stop_minute: "00",
                delit: false,
            },
            oldLesson: {
                numbreDay: this.props.numbreDay,
                numbreLesson: this.props.numbreLesson,
                item: "",
                view: "",
                teacher: "",
                place: " ",
                time_start_hour: "00",
                time_start_minute: "00",
                time_stop_hour: "00",
                time_stop_minute: "00",
                delit: false,
            },
            error: true,
            errorTime: true,

        }
    }

    handleInputChange = (event) => {
        const { name, value } = event.target;
        if (value.length < 70) {
            this.setState(prevState => ({
                lesson: {
                    ...prevState.lesson,
                    [name]: value
                }
            }));
        }
    };
    handleInputChangeHour = (event) => {
        const { name, value } = event.target;
        if (!isNaN(value) && value >= 0 && value < 24) {
            this.setState(prevState => ({
                lesson: {
                    ...prevState.lesson,
                    [name]: value
                }
            }));
        }
    };

    handleInputChangeMinut = (event) => {
        const { name, value } = event.target;
        if (!isNaN(value) && value >= 0 && value < 60) {
            this.setState(prevState => ({
                lesson: {
                    ...prevState.lesson,
                    [name]: value
                }
            }));
        }
    };

    dataChecksName = () => {
        if (this.state.lesson.item.length > 0) {
            this.setState({ error: true })
            return true;
        }
        else {
            this.setState({ error: false })
        }
    }
    dataChecksTime = () => {
        let time_start_hour = this.state.lesson.time_start_hour;
        let time_stop_hour = this.state.lesson.time_stop_hour;
        let time_start_minute = this.state.lesson.time_start_minute;
        let time_stop_minute = this.state.lesson.time_stop_minute;
        if (time_start_hour.length != 0 && time_stop_hour.length != 0 && time_start_minute.length != 0 && time_stop_minute.length != 0) {
            if (parseInt(this.state.lesson.time_start_hour) < parseInt(this.state.lesson.time_stop_hour)) {
                this.setState({ errorTime: true })
                return true;
            }
            else if (parseInt(this.state.lesson.time_start_minute) < parseInt(this.state.lesson.time_stop_minute) && parseInt(this.state.lesson.time_start_hour) <= parseInt(this.state.lesson.time_stop_hour)) {
                this.setState({ errorTime: true })
                return true;
            }
            else {
                this.setState({ errorTime: false })
            }
        }
        else {
            this.setState({ errorTime: false })
        }
    }

    SaveLesson = () => {
        if (this.dataChecksName() == true && this.dataChecksTime() == true) {
            let lesson = this.state.lesson;
            if (lesson.time_start_hour.length == 1) {
                lesson.time_start_hour = "0" + lesson.time_start_hour
            }
            if (lesson.time_stop_hour.length == 1) {
                lesson.time_stop_hour = "0" + lesson.time_stop_hour
            }
            if (lesson.time_start_minute.length == 1) {
                lesson.time_start_minute = "0" + lesson.time_start_minute
            }
            if (lesson.time_stop_minute.length == 1) {
                lesson.time_stop_minute = "0" + lesson.time_stop_minute
            }
            this.props.saveLessonGlobal(lesson);
            this.setState({ klick: true })
        }
    }
    CloseLesson = () => {
        if (this.state.oldLesson.item != "") {
            let lesson = this.state.oldLesson;
            if (lesson.time_start_hour.length == 1) {
                lesson.time_start_hour = "0" + lesson.time_start_hour
            }
            if (lesson.time_stop_hour.length == 1) {
                lesson.time_stop_hour = "0" + lesson.time_stop_hour
            }
            if (lesson.time_start_minute.length == 1) {
                lesson.time_start_minute = "0" + lesson.time_start_minute
            }
            if (lesson.time_stop_minute.length == 1) {
                lesson.time_stop_minute = "0" + lesson.time_stop_minute
            }
            this.props.saveLessonGlobal(lesson);
            this.setState({ klick: true, lesson: lesson })
        }
        else {
            let newLesson = this.state.lesson;
            newLesson.delit = true;
            const lesson = newLesson;
            this.setState({ klick: undefined })
        }
    }

    changeProps = () => {
        this.setState({ klick: false, oldLesson: this.state.lesson })
    }
    delit = () => {
        this.setState({ klick: undefined })
        let newLesson = this.state.lesson;
        newLesson.delit = true;
        this.props.saveLessonGlobal(newLesson);
    }
    handleKeyDown = (event) => {
        const invalidChars = ['-', '+', 'e', 'E', '.'];
        if (invalidChars.includes(event.key)) {
            event.preventDefault();
        }
    };
    render() {
        if (this.state.klick == false) {
            return (
                <div className='Lesson'>
                    <div className='Lesson-box_input'>
                        <input name="item" value={this.state.lesson.item} onChange={this.handleInputChange} className={this.state.error ? 'Lesson-box_input-input glow_around' : ' glow_around-false'} type="text" /> Предмет*
                    </div>
                    <div className='Lesson-box_input'>
                        <input name="view" value={this.state.lesson.view} onChange={this.handleInputChange} className='Lesson-box_input-input glow_around' type="text" /> Вид
                    </div>
                    <div className='Lesson-box_input'>
                        <input name="teacher" value={this.state.lesson.teacher} onChange={this.handleInputChange} className='Lesson-box_input-input glow_around' type="text" /> Преподаватель
                    </div>
                    <div className='Lesson-box_input'>
                        <input name="place" value={this.state.lesson.place} onChange={this.handleInputChange} className='Lesson-box_input-input glow_around' type="text" />Место проведения
                    </div>
                    <div className='Lesson-box_time'>
                        <div className='Lesson-box_time-div'>
                            <div className={this.state.errorTime ? 'Lesson-box_time-input glow_around' : 'Lesson-box_time-input-else'} >
                                <input type='number' onKeyDown={this.handleKeyDown} name="time_start_hour" value={this.state.lesson.time_start_hour} onChange={this.handleInputChangeHour} className='timeSelect' id="timeSelect_start" />
                                :
                                <input type='number' onKeyDown={this.handleKeyDown} name="time_start_minute" value={this.state.lesson.time_start_minute} onChange={this.handleInputChangeMinut} className='timeSelect' id="minutesSelect_start" />
                            </div>Начало
                        </div>
                        <div className='Lesson-box_time-div '>
                            <div className={this.state.errorTime ? 'Lesson-box_time-input glow_around' : 'Lesson-box_time-input-else'} >
                                <input type='number' onKeyDown={this.handleKeyDown} name="time_stop_hour" value={this.state.lesson.time_stop_hour} onChange={this.handleInputChangeHour} className='timeSelect' id="timeSelect_stop" />
                                :
                                <input type='number' onKeyDown={this.handleKeyDown} name="time_stop_minute" value={this.state.lesson.time_stop_minute} onChange={this.handleInputChangeMinut} className='timeSelect' id="minutesSelect_stop" />
                            </div>Конец
                        </div>
                    </div>
                    <button onClick={this.SaveLesson} className='Lesson-ok glow_around'>Ок</button>
                    <button onClick={this.CloseLesson} className='Lesson-CloseLesson glow_around'>Отмена</button>
                </div>
            )
        }
        else if (this.state.klick == true) {
            return (
                <div className='ViewLesson'>
                    <div className='ViewLesson-view'>
                        <div className='ViewLesson-view-time'>
                            {this.state.lesson.time_start_hour + ":" + this.state.lesson.time_start_minute + " - " + this.state.lesson.time_stop_hour + ":" + this.state.lesson.time_stop_minute}
                        </div>
                        <div className='ViewLesson-view-description' >
                            <div className='ViewLesson-view-description-text'> {this.state.lesson.item}</div>
                            <div className='ViewLesson-view-description-text'> {this.state.lesson.view}</div>
                            <div className='ViewLesson-view-description-text'> {this.state.lesson.teacher}</div>
                            <div className='ViewLesson-view-description-text'> {this.state.lesson.place}
                            </div>
                        </div>
                        <div className='ViewLesson-view-description-delit'>
                            <button onClick={this.changeProps} className='ViewLesson-view-description-delit-button'>
                                <img className='ViewLesson-view-description-delit-button-img' src={logo1} alt="" />
                            </button>
                            <button onClick={this.delit} className='ViewLesson-view-description-delit-button'>
                                <img className='ViewLesson-view-description-delit-button-img' src={logo2} alt="" />
                            </button>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }

}

const mapStateToProps = state => {
    return {
        saveLesson: state.saveLesson,
    }
}

export default connect(mapStateToProps, { dataLesson, saveLessonGlobal })(Lesson)