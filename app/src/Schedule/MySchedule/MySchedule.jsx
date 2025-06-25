import React, { Component } from 'react';
import './MySchedule.css'
import ThisMySchedule from './ThisMySchedule/ThisMySchedule';
class MySchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: [],
        }
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
    }
    render() {
        return (
            <div className='MySchedule'>
                <div className='MySchedule-top'>
                    Мои расписания
                </div>
                <div className='MySchedule-box'>
                </div>
                {this.state.files.map((item, index) => (
                    <ThisMySchedule key={index} fileName={item} />
                ))}
            </div>
        )
    }
}
export default MySchedule