import React from 'react';
import '../Finance.css'
import './Report.css'
import logo from '../../Schedule/AddSchedule/img/747310.png';
import ViewReport from './ViewReport';
import {deletingCompound} from '../Income/IncomeOne/IncomeLogicSum';

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: true,
      dateStart: 1,
      dateStop: 31,
      incomeFile: [],
      expensesFile: [],
      inputValue: 0,
      View: "",
    }
    this.handleInputChange = this.handleInputChange.bind(this);
    this.addComponent = this.addComponent.bind(this);
  }
  handleInputChangeDate = (event) => {
    const { name, value } = event.target;
    if (value >= 0 && value <= 31) {
      this.setState({
        [name]: value
      });
    }
  };
  handleInputChange(event) {
    const { value } = event.target;
    this.setState({ inputValue: value });
  }
  addComponent() {
    this.setState({
      View: <ViewReport
        incomeFile={this.formulaChecking(this.checkDatesIncome(this.state.incomeFile))}
        expensesFile={this.checkDatesExpense(this.state.expensesFile)}
        inStock={this.state.inputValue}
        dateStart={this.state.dateStart}
        dateStop={this.state.dateStop}
      />
    })
    let win = window.electron.SaveSumm(this.state.inputValue);
  }
  formulaChecking(mas){
    let outout = deletingCompound(mas);
    
    return outout;
  }
  checkDatesIncome(files) {
    let output = [];
    for (let i in files) {
      if (parseInt(files[i].income.incomeDat)  >= parseInt(this.state.dateStart) && parseInt(files[i].income.incomeDat) <= parseInt(this.state.dateStop)) {
        output.push(files[i]);
      }
    }
    return output
  }
  checkDatesExpense(files) {
    let output = [];
    for (let i in files) {
      if (parseInt(files[i].expens.expensDat) >= parseInt(this.state.dateStart) && parseInt(files[i].expens.expensDat) <= parseInt(this.state.dateStop)) {
        output.push(files[i]);
      }
    }
    return output
  }
  componentDidMount() {
    window.electron.getIncomeFile()
      .then(files => {
        this.setState({ incomeFile: files, })
      })
      .catch(error => {
        console.error('Error getting file:', error);
      });
    window.electron.getExpenseFile()
      .then(files => {
        this.setState({ expensesFile: files, })
      })
      .catch(error => {
        console.error('Error getting file:', error);
      });
      window.electron.getFileSumm()
      .then(files => {
        this.setState({ inputValue: files, })
        console.log(files)
      })
      .catch(error => {
        console.error('Error getting file:', error);
      });
  }
  render() {
    return (
      <div className='Report'>
        <div className='Report-name_view'>
          Отчет
        </div>
        <div className='Report-Block'>
          <div className='Report-Block-top_period'>
            <div className='Report-Block-top_period-view glow_around'>
              <div className='Report-Block-top_period-view-str'>
                <input name="dateStart" value={this.state.dateStart} onChange={this.handleInputChangeDate} className='glow_around Report-Block-top_period-view-str-input-dat' type="number" inputmode="numeric" min="1" max="31" /> -
                <input name="dateStop" value={this.state.dateStop} onChange={this.handleInputChangeDate} className='glow_around Report-Block-top_period-view-str-input-dat' type="number" inputmode="numeric" min="1" max="31" />
              </div>
              <img className='Report-Block-top_period-view-img' src={logo} alt="" />
            </div>
          </div>
          <div className='Report-Block-in_stock'>
            <div className='Report-Block-in_stock-name'>
              В наличии
            </div>
            <div>
              <input value={this.state.inputValue} onChange={this.handleInputChange} className={this.state.error ? ' Report-Block-in_stock-input-sum Expense-box_input-input glow_around' : ' glow_around-false'} type="number" />
            </div>
          </div>
          {this.state.View}
          <div className='Report-Block-form'>
            <button className='Report-Block-form-button glow_around' onClick={this.addComponent}>
              Сформировать
            </button>
          </div>
        </div>
      </div>
    )
  }
}
export default Report;