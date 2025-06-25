import React from 'react';
import '../Finance.css'
import './Report.css'
import '../Expenses/Expenses.css'


class ViewReport extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            error: true,
            incomeFile: this.props.incomeFile,
            expensesFile: this.props.expensesFile,
            total: "",
            inStock: this.props.inStock,
        }
    }
    componentDidUpdate(prevProps) {
        if (prevProps.dateStart !== this.props.dateStart || prevProps.dateStop !== this.props.dateStop || prevProps.incomeFile !== this.props.incomeFile || prevProps.expensesFile !== this.props.expensesFile || prevProps.inStock !== this.props.inStock) {
            this.setState({
                inStock: this.props.inStock,
                incomeFile: this.props.incomeFile,
                expensesFile: this.props.expensesFile,
            });
        }
    }
    sumUp(mas) {
        let output = 0;
        if (mas.length === 0) {
            console.log("error: empty array");
            return output;
        }
        if (mas[0].hasOwnProperty('income')) {
            for (let i = 0; i < mas.length; i++) {
                output += parseFloat(mas[i].income.incomeSum);
            }
        } else if (mas[0].hasOwnProperty('expens')) {
            for (let i = 0; i < mas.length; i++) {
                output += parseFloat(mas[i].expens.expensSum);
            }
        } else {
            console.log("error: invalid type");
        }
        return output;
    }
    form(sumExpenses, sumIncome) {
        let expens = sumExpenses;
        let income = sumIncome;
        let inStock = this.props.inStock;
        if (inStock.length != 0) {
            return income - expens + parseInt(inStock, 10)
        }
        else {
            return income - expens
        }
    }
    PushIncome() {
        if (this.state.incomeFile.length == 0) {
            return "Записей нет или все они являются частью других"
        }
        else if (this.state.incomeFile.length > 0) {
            return (
                this.state.incomeFile.map(el => (
                    <div className='Report-Block-Correspondence-box-key' key={el.income.incomeName}>
                        <div className='Report-Block-Correspondence-box-key-element '>{el.income.incomeName}</div>
                        <div className='Report-Block-Correspondence-box-key-element right'>{el.income.incomeSum}  {" "} руб</div>
                        <div className='Report-Block-Correspondence-box-key-element right'>{el.income.incomeDat} {" "} числа</div>
                    </div>
                ))
            )
        }
    }
    PushExpens() {
        if (this.state.expensesFile.length == 0) {
            return "Записей нет или все они являются частью других"
        }
        else if (this.state.expensesFile.length > 0) {
            return (
                this.state.expensesFile.map(el => (
                    <div className='Report-Block-Correspondence-box-key' key={el.expens.expensName}>
                        <div className='Report-Block-Correspondence-box-key-element '>{el.expens.expensName}</div>
                        <div className='Report-Block-Correspondence-box-key-element right'>{el.expens.expensSum} {" "} руб</div>
                        <div className='Report-Block-Correspondence-box-key-element right'>{el.expens.expensDat} {" "} числа</div>
                    </div>
                ))
            )

        }
    }
    render() {
        return (
            <div>
                <div className='Report-Block-Correspondence'>
                    <div className='Report-Block-Correspondence-blok'>
                        <span className='Report-Block-Correspondence-blok-span_left'>Доходы</span>
                        <div className='Report-Block-Correspondence-box'>
                            {this.PushIncome()}
                        </div>
                    </div>
                    <div className='Report-Block-Correspondence-blok'>
                        <span className='Report-Block-Correspondence-blok-span_right'>Расходы</span>
                        <div className='Report-Block-Correspondence-box'>
                            {this.PushExpens()}
                        </div>
                    </div>
                </div>
                <div className='Report-Block-Correspondence-File'>
                    <div className='Report-Block-Correspondence-File-total right'>Итого доходов: {this.sumUp(this.state.incomeFile)}</div>
                    <div className='Report-Block-Correspondence-File-total left'>Итого расходов: {this.sumUp(this.state.expensesFile)}</div>
                </div>
                <div className='Report-Block-Correspondence-total'>
                    <span className='Report-Block-Correspondence-total-str'>Итого: {this.form(this.sumUp(this.state.expensesFile), this.sumUp(this.state.incomeFile))}</span>
                </div>
            </div>
        )
    }
}
export default ViewReport;