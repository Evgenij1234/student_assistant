import React, { useState, useEffect } from 'react';
import '../AddSchedule/AddSchedule.css';
import { useLocation } from 'react-router-dom';
import EditScheduleViev from './EditScheduleViev';

function EditSchedule() {
  const location = useLocation()
  const { from } = location.state
  const [dataFile, setDataFile] = useState(null);
  
  useEffect(() => {
    window.electron.getDataFile(from).then(files => {
      setDataFile(files);
    }).catch(error => {
      console.error('Error getting file:', error);
    });
  }, [from]);
  if (!dataFile) {
    return <div>Loading...</div>;
  }
  return <EditScheduleViev fileName={from} fileContent={dataFile} />
}
export default EditSchedule;

