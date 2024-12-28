import React from 'react';
import '../Finance.css'
import './Expenses.css'
import Expense from './Expense/Expense';
import { connect } from 'react-redux';
import { pushExpense, updateElectronExpense } from '../../store/store';

class GetExpenses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newexpenses: "",
      masExpense: this.props.masExpense,
      readyToRender: false
    };
  }
  
  handleChildFunction = (element) => {
    this.setState({ newexpenses: element });
  };
  AddExpenses = () => {
    const newExpenses =
      <div key={this.state.masExpense.expensName}>
        <Expense numbre={this.state.masExpense.length} klick={false} handleFunction={this.handleChildFunction}/>
      </div>
    this.setState( {newexpenses:  newExpenses })
  }
  componentDidUpdate(prevState){
    if(this.props.masExpense !== prevState.masExpense){
      this.setState({masExpense: this.props.masExpense, loading: false} );
      setTimeout(() => {
        this.setState({ loading: false });
      }, 0.1);
    }
  }
  render() {
    return (
      <div className='Expenses '>
        <div className='Expenses-name_view'>
          Расходы
        </div>
        <div>
          <div className='Expenses-view'>
            {this.props.masExpense.map(element=>{
              return <div key={element.expens.expensName}>
              <Expense numbre={element.length} klick={true} expensName={element.expens.expensName} expensDat={element.expens.expensDat} expensSum={element.expens.expensSum} handleFunction={this.handleChildFunction}/>
            </div>
            })}
            {this.state.newexpenses}
          </div>
          <button className='Expenses-add' onClick={this.AddExpenses}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.3333V6.66667M6.66667 11.6667H17.3333M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#8DB9FF" stroke-width="3" />
            </svg>
            Добавить
          </button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    masExpense: state.masExpense,
  }
}

export default connect(mapStateToProps, { pushExpense, updateElectronExpense })(GetExpenses) 