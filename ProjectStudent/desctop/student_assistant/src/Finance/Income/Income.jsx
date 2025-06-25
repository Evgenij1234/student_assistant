import React, { Component } from 'react';
import '../Finance.css'
import './Income.css'
import '../Expenses/Expenses.css'
import { connect } from 'react-redux';
import { updateElectronIncome } from '../../store/store';
import GetIncome from './GetIncome';

class Income extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFile: null
    };
  }
  componentDidMount() {
    window.electron.getIncomeFile()
      .then(files => {
        this.setState({ dataFile: files })
        this.props.updateElectronIncome(files);
      })
      .catch(error => {
        console.error('Error getting file:', error);
      });
  }
  
  render() {
    const { dataFile } = this.state;
    if (!dataFile) {
      return <GetIncome />;
    }
    return <GetIncome fileContent={dataFile} />;
  }
}
const mapStateToProps = state => {
  return {
    masIncome: state.masIncome,
  };
};

export default connect(mapStateToProps, { updateElectronIncome })(Income);