import React, { Component } from 'react';
import '../../AddSchedule/DaysWeek/Lesson/Lesson.css';
import '../../AddSchedule/DaysWeek/Lesson/ViewLesson.css';
import '../VeekSchedule/VeekSchedule.css'

class LessonCurrent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lesson: {
                item: this.props.lesson.item,
                view: this.props.lesson.view,
                teacher: this.props.lesson.teacher,
                place: this.props.lesson.place,
                time_start_hour: this.props.lesson.time_start_hour,
                time_start_minute: this.props.lesson.time_start_minute,
                time_stop_hour: this.props.lesson.time_stop_hour,
                time_stop_minute: this.props.lesson.time_stop_minute,
            },
        }
    }

    render() {
        return (
            <div className='ViewLessonMain'>
                    <div className='ViewLessonMain-view '>
                        <div className=' ViewLessonMain-view-time '>
                            {this.state.lesson.time_start_hour + ":" + this.state.lesson.time_start_minute + " - " + this.state.lesson.time_stop_hour + ":" + this.state.lesson.time_stop_minute}
                        </div>
                        <div className='ViewLessonMain-view-description ' >
                            <div className='ViewLessonMain-view-description-text '> {this.state.lesson.item}</div>
                            <div className='ViewLessonMain-view-description-text '> {this.state.lesson.view}</div>
                            <div className='ViewLessonMain-view-description-text '> {this.state.lesson.teacher}</div>
                            <div className='ViewLessonMain-view-description-text '> {this.state.lesson.place}
                            </div>
                        </div>
                    </div>
                </div>
        )
        
    }

}

export default LessonCurrent