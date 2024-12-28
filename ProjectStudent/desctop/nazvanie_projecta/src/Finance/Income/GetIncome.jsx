import React from 'react';
import '../Finance.css';
import './Income.css';
import '../Expenses/Expenses.css';
import IncomeOne from './IncomeOne/IncomeOne';
import { connect } from 'react-redux';
import { updateElectronIncome } from '../../store/store';

class GetIncome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      masIncome: this.props.masIncome,
      loading: true, 
      neweincome: '',
      prevData: '',
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.masIncome !== prevState.masIncome) {
      return {
        masIncome: nextProps.masIncome,
        loading: true,
      };
    }
    return null;
  }
  
  componentDidUpdate(prevProps) {
    if (this.props.masIncome !== prevProps.masIncome) {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 5); 
    }
  }
  

  handleChildFunction = (element) => {
    this.setState({ neweincome: element });
  };

  AddIncome = () => {
    const newIncome = (
      <div key={this.state.masIncome.incomeName}>
        <IncomeOne numbre={this.state.masIncome.length} klick={false} handleFunction={this.handleChildFunction} />
      </div>
    );
    this.setState({ neweincome: newIncome });
  };

  render() {
    const { masIncome, neweincome, loading } = this.state;
    
    if (loading) {
      return <div>Loading...</div>;
    }

    return (
      <div className='Expenses'>
        <div className='Expenses-name_view'>
          Доходы
        </div>
        <div>
          <div className='Expenses-view'>
            {masIncome.map((element, index) => (
              <div key={element.income.incomeName}>
                <IncomeOne
                  key={element.income.incomeName}
                  numbre={index + 1}
                  klick={true}
                  incomeName={element.income.incomeName}
                  incomeDat={element.income.incomeDat}
                  incomeFormula={element.income.incomeFormula}
                  incomeSum={element.income.incomeSum}
                  updateElectronIncome={this.props.updateElectronIncome}
                  handleFunction={this.handleChildFunction}
                />
              </div>
            ))}
            {neweincome}
          </div>
          <button className='Expenses-add' onClick={this.AddIncome}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 17.3333V6.66667M6.66667 11.6667H17.3333M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="#8DB9FF" strokeWidth="3" />
            </svg>
            Добавить
          </button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  masIncome: state.masIncome,
});

export default connect(mapStateToProps, { updateElectronIncome })(GetIncome);
