import React, { Component } from 'react';
import GetExpenses from './GetExpenses';
import { connect } from 'react-redux';
import { updateElectronExpense } from '../../store/store';

class Expenses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataFile: null
    };
  }
  componentDidMount(){
    window.electron.getExpenseFile()
    .then(files => {
      this.setState({ dataFile: files})
      this.props.updateElectronExpense(files);
    })
    .catch(error => {
      console.error('Error getting file:', error);
    });
  }
  render() {
    const { dataFile } = this.state;
    if(!dataFile){
      return <GetExpenses />;
    }
    return <GetExpenses fileContent={dataFile} />;
  }
}

const mapStateToProps = state => {
  return {
    masExpense: state.masExpense,
  };
};

export default connect(mapStateToProps, { updateElectronExpense })(Expenses);