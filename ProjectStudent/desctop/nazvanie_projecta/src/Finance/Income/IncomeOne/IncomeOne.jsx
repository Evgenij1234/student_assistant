import React from 'react';
import '../Income.css';
import '../../../Schedule/AddSchedule/AddSchedule.css'
import logo1 from '../../../Schedule/AddSchedule/img/img1.png'
import logo2 from '../../../Schedule/AddSchedule/img/img2.png';
import '../../../Schedule/EditSchedule/EditDaysWeek/EditLesson/EditLesson.css';
import '../../Expenses/Expenses.css';
import { connect } from 'react-redux';
import { pushIncome } from '../../../store/store';
import { updateElectronIncome } from '../../../store/store';
import { calculationSum } from './IncomeLogicSum';
import { changingFormulas } from './IncomeLogicSum';
import { conversionSum } from './IncomeLogicSum';
import { changingFormulasDelit } from './IncomeLogicSum';
import Notification from '../../../Notification';
import globalCopyHandler from '../../../globalCopyHandler';

class IncomeOne extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numbre: this.props.numbre,
            klick: this.props.klick,
            income: {
                incomeName: this.props.incomeName,
                incomeDat: this.props.incomeDat,
                incomeSum: this.props.incomeSum,
                incomeFormula: this.props.incomeFormula,
            },
            originalIncome: {
                incomeName: this.props.incomeName,
                incomeDat: this.props.incomeDat,
                incomeSum: this.props.incomeSum,
                incomeFormula: this.props.incomeFormula,
            },
            oldName: this.props.incomeName,
            isActive: false,
            errorName: true,
            errorDate: true,
            errorSum: true,
            showNotification: false,
            showNotificationText: '',
        }
    }
    toggleClass = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
    };
    handleInputChangeName = (event) => {
        const { name, value } = event.target;
        const regex = /^[a-zA-Zа-яА-Я]*$/;
        if (value.length < 50 && regex.test(value)) {
            this.setState(prevState => ({
                income: {
                    ...prevState.income,
                    [name]: value
                }
            }));
        }
    };
    handleInputChangeSum = (event) => {
        const { name, value } = event.target;
        const regex = /^[a-zA-Zа-яА-Я0-9.+()*\/-]*$/;
        if (value.length < 200 && regex.test(value)) {
            this.setState(prevState => ({
                income: {
                    ...prevState.income,
                    [name]: value
                }
            }));
        }
    };
    handleInputDate = (event) => {
        const { name, value } = event.target;
        if (value === '' || (/^\d+$/.test(value) && value >= 1 && value <= 31)) {
            this.setState(prevState => ({
                income: {
                    ...prevState.income,
                    [name]: value
                }
            }));
        }
    };
    handleKeyDown = (event) => {
        const invalidChars = ['-', '+', 'e', 'E', '.'];
        if (invalidChars.includes(event.key)) {
            event.preventDefault();
        }
    };
    nameChecking = (name) => {

        const NameStore = this.props.masIncome;
        let foundName = NameStore.find(item => item.income.incomeName === name)
        if (name === undefined) {
            this.setState({ errorName: false })
            return false
        }
        if (foundName || name.length < 2) {
            this.setState({ errorName: false })
            return false
        } else {
            this.setState({ errorName: true })
            return true
        }
    }
    dateCheking = () => {
        if (this.state.income.incomeDat == undefined || this.state.income.incomeDat == null || this.state.income.incomeDat == "") {
            this.setState({ errorDate: false })
            return false
        }
        else {
            this.setState({ errorDate: true })
            return true
        }
    }
    sumCheking = () => {
        if (this.state.income.incomeFormula == undefined || this.state.income.incomeFormula < 0) {
            this.setState({ errorSum: false })
            return false
        }
        else {
            return true
        }
    }
    SaveIncome = () => {
        if (this.nameChecking(this.state.income.incomeName) == true && this.dateCheking() == true && this.sumCheking() == true) {
            let CalculationSum = calculationSum(this.state.income.incomeFormula, this.props.masIncome);
            if (CalculationSum.colback == true) {
                let newIncome = {
                    income: {
                        incomeName: this.state.income.incomeName,
                        incomeDat: this.state.income.incomeDat,
                        incomeFormula: CalculationSum.formul,
                        incomeSum: CalculationSum.sum,
                    }
                }
                let prevmasIncome = this.props.masIncome;
                prevmasIncome.push(newIncome);
                this.props.updateElectronIncome(prevmasIncome);
                let win = window.electron.SaveIncome(prevmasIncome);
                this.props.handleFunction("");
                this.setState({ klick: true })
            }
            else {
                this.setState({ errorSum: false })
            }
        }
    }
    delit = () => {
        const prevmasIncome = [...this.props.masIncome];
        const afterPrevmasIncome = changingFormulasDelit(prevmasIncome, this.state.income.incomeName);
        console.log(afterPrevmasIncome.newmasIncome)
        console.log(afterPrevmasIncome.masIncomeInFormul)
        if (afterPrevmasIncome.masIncomeInFormul.length == 0) {
            let nevMasIncome = afterPrevmasIncome.newmasIncome.filter(element => element.income.incomeName !== this.state.income.incomeName);
            this.props.updateElectronIncome(nevMasIncome);
            let win = window.electron.SaveIncome(nevMasIncome);
            this.setState({ klick: null })
            this.props.handleFunction("");
        }
        else {
            let stringNameIncome = afterPrevmasIncome.masIncomeInFormul.join(" , ");
            let otput = "Сначала измените:" + " " + stringNameIncome;
            this.handle(otput)
        }
    }
    handle = (event) => {
        // Показываем уведомление
        this.setState({ showNotificationText: event });
        this.setState({ showNotification: true });
        setTimeout(() => {
            this.setState({ showNotification: false });
        }, 2000);
    };
    nameCheckingChange = (name) => {
        const NameStore = this.props.masIncome;
        let foundName = NameStore.find(item => item.income.incomeName === name)
        if (name === undefined) {
            this.setState({ errorName: false })
            return false
        }
        if (foundName && name !== this.state.oldName || name.length < 2) {
            this.setState({ errorName: false })
            return false
        } else {
            this.setState({ errorName: true })
            return true
        }
    }
    change = () => {
        this.setState({ klick: "change", oldName: this.state.income.incomeName, originalIncome: { ...this.state.income } })
    }
    ChangeIncome = () => {
        if (this.nameCheckingChange(this.state.income.incomeName) == true && this.dateCheking() == true && this.sumCheking() == true) {
            let CalculationSum = calculationSum(this.state.income.incomeFormula, this.props.masIncome, this.state.oldName);
            if (CalculationSum.colback == true) {
                let newIncome = {
                    income: {
                        incomeName: this.state.income.incomeName,
                        incomeDat: this.state.income.incomeDat,
                        incomeFormula: CalculationSum.formul,
                        incomeSum: CalculationSum.sum,
                    }
                }
                let prevmasIncome = [...this.props.masIncome];
                prevmasIncome.forEach((element, index) => {
                    if (element.income.incomeName === this.state.oldName) {
                        prevmasIncome[index] = newIncome;
                    }
                });
                let newmas = changingFormulas(prevmasIncome, this.state.oldName, this.state.income.incomeName);
                let newprevmasIncome = newmas;
                const newmasSum = conversionSum(newprevmasIncome);
                this.props.updateElectronIncome(newmasSum);
                let win = window.electron.SaveIncome(newmasSum);
                this.setState({ klick: true, income: newIncome.income, errorSum: true })
                this.props.handleFunction("");
            }
            else {
                this.setState({ errorSum: false })
            }
        }
    }
    SanselIncome = () => {
        this.setState({ klick: true, income: { ...this.state.originalIncome } });
        this.props.handleFunction("");
    }
    SanselIncomeDontChange = () => {
        this.setState({ klick: true, income: { ...this.state.originalIncome } });
        this.props.handleFunction("");
    }
    componentDidMount() {
        document.addEventListener('click', globalCopyHandler);
      }
      componentWillUnmount() {
        document.removeEventListener('click', globalCopyHandler);
      }
    render() {
        if (this.state.klick == false) {
            return (
                <div className='Expense'>
                    <div className='Expense-box_input'>
                        <input name="incomeName" value={this.state.income.incomeName} onChange={this.handleInputChangeName} className={this.state.errorName ? 'Expense-box_input-input glow_around ' : ' glow_around-false-name'} type="text" /> Наименование*
                    </div>
                    <div className='Expense-box_input_dat_sum'>
                        <input name="incomeDat" value={this.state.income.incomeDat} onKeyDown={this.handleKeyDown} onChange={this.handleInputDate} className={this.state.errorDate ? 'Expense-box_input-input-dat glow_around' : ' glow_around-false-date'} type="number" max="31" min="1" maxLength="2" /> Число выплаты*
                    </div>
                    <div className='Income-box-input-sum'>
                        <textarea name="incomeFormula" value={this.state.income.incomeFormula} onChange={this.handleInputChangeSum} className={this.state.errorSum ? 'Income-box-input-sum-textarea glow_around' : 'glow_around-sum-textarea-false'} placeholder="Для расчета составных выплат необходимо указать название другогой статьи дохода, так же можно использовать операторы: +,-,*,/ и числа" />Сумма*
                    </div>
                    <button onClick={this.SaveIncome} className='Expense-ok glow_around'>Ок</button>
                    <button onClick={this.SanselIncome} className='Expense-cansel glow_around'>Отмена</button>
                </div>
            )
        }
        else if (this.state.klick == "change") {
            return (
                <div className='Expense'>
                    <div className='Expense-box_input'>
                        <input name="incomeName" value={this.state.income.incomeName} onChange={this.handleInputChangeName} className={this.state.errorName ? 'Expense-box_input-input glow_around ' : ' glow_around-false-name'} type="text" /> Наименование*
                    </div>
                    <div className='Expense-box_input_dat_sum'>
                        <input name="incomeDat" value={this.state.income.incomeDat} onKeyDown={this.handleKeyDown} onChange={this.handleInputDate} className={this.state.errorDate ? 'Expense-box_input-input-dat glow_around' : ' glow_around-false-date'} type="number" max="31" min="1" maxLength="2" /> Число выплаты*
                    </div>
                    <div className='Income-box-input-sum'>
                        <textarea name="incomeFormula" value={this.state.income.incomeFormula} onChange={this.handleInputChangeSum} className={this.state.errorSum ? 'Income-box-input-sum-textarea glow_around' : 'glow_around-sum-textarea-false'} placeholder="Для расчета составных выплат необходимо указать название другогой статьи дохода, так же можно использовать операторы: +,-,*,/ и числа" />Сумма*
                    </div>
                    <button onClick={this.ChangeIncome} className='Expense-ok glow_around'>Ок</button>
                    <button onClick={this.SanselIncomeDontChange} className='Expense-cansel glow_around'>Отмена</button>
                </div>
            )
        }
        else if (this.state.klick == true) {
            return (
                <div className='ViewExpense'>
                    <div className='Expense-view'>
                        <div className='Expense-view-time' >
                            <div data-copy-text={this.state.income.incomeDat} className='Expense-view-description-text'> {this.state.income.incomeDat} числа</div>
                        </div>
                        <div>
                            <div className='Expense-view-description' >
                                <div data-copy-text={this.state.income.incomeName} className='Expense-view-description-text'> {this.state.income.incomeName}</div>
                            </div>
                            <div className='Expense-view-description' >
                                <div data-copy-text={calculationSum(this.state.income.incomeFormula, this.props.masIncome, this.state.income.incomeName).sum} className='Expense-view-description-text'> {calculationSum(this.state.income.incomeFormula, this.props.masIncome, this.state.income.incomeName).sum + " " + "руб"}</div>
                            </div>
                        </div>
                        <div className='Expense-view-description-delit'>
                            <button onClick={this.change} className='Expense-view-description-delit-button'>
                                <img className='Expense-view-description-delit-button-img' src={logo1} alt="" />
                            </button>
                            <button onClick={this.delit} className='Expense-view-description-delit-button'>
                                <img className='Expense-view-description-delit-button-img' src={logo2} alt="" />
                            </button>
                        </div>
                    </div>
                    <Notification isVisible={this.state.showNotification} text={this.state.showNotificationText} />
                </div>
            )
        }
        else {
            return null;
        }
    }
}
const mapStateToProps = state => {
    return {
        masIncome: state.masIncome,
    }
}
export default connect(mapStateToProps, { pushIncome, updateElectronIncome })(IncomeOne) 