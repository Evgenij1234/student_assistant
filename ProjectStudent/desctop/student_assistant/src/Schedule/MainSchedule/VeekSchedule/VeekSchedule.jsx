import React, { Component } from 'react';
import DaysWeekCurrent from './DaysWeekCurrent';
import '../VeekSchedule/VeekSchedule.css'
class VeekSchedule extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            days: '',
            numderWeek: this.props.numderWeek,
            loading: true 
        }
    }
    componentDidMount() {
        this.getcurrentWeek()
    }
    componentDidUpdate(prevProps) {
        if ( prevProps.lessonSchedule !== this.props.lessonSchedule || prevProps.numderWeek !== this.props.numderWeek ) {
            this.getcurrentWeek();
        }
    }
    getcurrentWeek = () => {
        const numderWeek = this.props.numderWeek;
        const arrayOfObjects = Object.entries(this.props.lessonSchedule);
        let dataForWeek;
        if (numderWeek === 1) {
            dataForWeek = arrayOfObjects.slice(0, 7);
        } else {
            const start = (numderWeek -1) * 7;
            const end = start + 7;
            dataForWeek = arrayOfObjects.slice(start, end);
        }
        this.setState({ days: dataForWeek, loading: false }, () => { });
    }
    render() {
        const { days, loading } = this.state;
        if (loading) {
            return <div>Loading...</div>;
        }
        return (
            <div className='VeekSchedule'>
                {days.map(el => (
                    <DaysWeekCurrent key={el[0]} lesson={el[1]} numbreDay={el[0]} dateDay={this.props.validStartDate+((el[0])* 86400000)-86400000}/>
                ))}
            </div>
        )
    }
}
export default VeekSchedule