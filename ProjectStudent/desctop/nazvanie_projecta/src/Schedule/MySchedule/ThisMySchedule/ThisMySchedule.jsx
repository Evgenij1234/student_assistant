import React, { Component } from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import '../MySchedule.css'
class ThisMySchedule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileName: this.props.fileName
        }
    }
    deleteSchedule = () => {
        const file = this.props.fileName
        let win = window.electron.deleteFile(file);
        this.setState({ fileName: null })
    }
    assignPrimarySchedule = () =>{
        window.electron.assignPrimarySchedule(this.state.fileName).then(filesName => {
            console.log(filesName);
        }).catch(error => {
            console.error('Error getting file:', error);
        });;
    }
    render() {
        if (this.state.fileName != null) {
            return (
                <div className='ThisMySchedule'>
                    <div className='ThisMySchedule-name'>
                        {this.state.fileName}
                    </div>
                    <div className='ThisMySchedule-gap'></div>
                    <div className='ThisMySchedule-click'>
                        <button onClick={this.assignPrimarySchedule} className='ThisMySchedule-click-button glow_around'>Назначить основным</button>
                    </div>
                    <div className='ThisMySchedule-click'>
                        <div className={"ThisMySchedule-click-button-Link glow_around"}><Link className={"ThisMySchedule-click-button-Link"} to={'/Schedule/EditSchedule'} state={{ from: this.props.fileName }}>Редактировать</Link></div>
                        
                    </div>
                    <div className='ThisMySchedule-click'>
                        <button onClick={this.deleteSchedule} className='ThisMySchedule-click-button glow_around'>удалить</button>
                    </div>
                </div>
            )
        }
        else {
            return null;
        }
    }
}
export default ThisMySchedule