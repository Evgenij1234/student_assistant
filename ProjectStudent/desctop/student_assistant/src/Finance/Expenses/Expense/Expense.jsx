import React from 'react';
import '../Expenses.css';
import '../../../Schedule/AddSchedule/AddSchedule.css'
import logo1 from '../../../Schedule/AddSchedule/img/img1.png'
import logo2 from '../../../Schedule/AddSchedule/img/img2.png';
import '../../../Schedule/EditSchedule/EditDaysWeek/EditLesson/EditLesson.css';
import { connect } from 'react-redux';
import { pushExpense } from '../../../store/store';
import { updateElectronExpense } from '../../../store/store';

class Expense extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            numbre: this.props.numbre,
            klick: this.props.klick,
            expens: {
                expensName: this.props.expensName,
                expensDat: this.props.expensDat,
                expensSum: this.props.expensSum,
            },
            originalExpens: {
                expensName: this.props.expensName,
                expensDat: this.props.expensDat,
                expensSum: this.props.expensSum,
            },
            oldName: "",
            isActive: false,
            errorName: true,
            errorDate: true,
            errorSum: true,
        }
    }
    toggleClass = () => {
        this.setState(prevState => ({
            isActive: !prevState.isActive
        }));
    };
    handleInputChangeName = (event) => {
        const { name, value } = event.target;
        const regex = /^[a-zA-Zа-яА-Я0-9]*$/;
        if (value.length < 50 && regex.test(value)) {
            this.setState(prevState => ({
                expens: {
                    ...prevState.expens,
                    [name]: value
                }
            }));
        }
    };
    handleInputChange = (event) => {
        const { name, value } = event.target;
        if (value.length <= 13) {
            this.setState(prevState => ({
                expens: {
                    ...prevState.expens,
                    [name]: value
                }
            }));
        }
    };
    handleInputChangeDate = (event) => {
        const { name, value } = event.target;
        if (value === '' || (value >= 1 && value <= 31)) {
            this.setState(prevState => ({
                expens: {
                    ...prevState.expens,
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
        const NameStore = this.props.masExpense;
        let foundName = NameStore.find(item => item.expens.expensName === name)
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
        if (this.state.expens.expensDat == undefined || this.state.expens.expensDat == "") {
            this.setState({ errorDate: false })
            return false
        }
        else {
            this.setState({ errorDate: true })
            return true
        }
    }
    sumCheking = () => {
        if (this.state.expens.expensSum == undefined || this.state.expens.expensSum < 0) {
            this.setState({ errorSum: false })
            return false
        }
        else {
            return true
        }
    }
    SaveExpense = () => {
        if (this.nameChecking(this.state.expens.expensName) == true && this.dateCheking() == true && this.sumCheking() == true) {
            this.setState({ klick: true })
            const newExpense = {
                expens: {
                    expensName: this.state.expens.expensName,
                    expensDat: this.state.expens.expensDat,
                    expensSum: this.state.expens.expensSum,
                }
            }
            let prevmasExpense = this.props.masExpense;
            prevmasExpense.push(newExpense);
            this.props.updateElectronExpense(prevmasExpense);
            let win = window.electron.SaveExpense(prevmasExpense);
            this.props.handleFunction("");
        }
    }
    delit = () => {
        const prevmasExpense = [...this.props.masExpense];
        let nevMasExpense = prevmasExpense.filter(element => element.expens.expensName !== this.state.expens.expensName);
        this.props.handleFunction("");
        this.props.updateElectronExpense(nevMasExpense);
        let win = window.electron.SaveExpense(nevMasExpense);
        this.setState({ klick: null })
    }


    nameCheckingChange = (name) => {
        const NameStore = this.props.masExpense;
        let foundName = NameStore.find(item => item.expens.expensName === name)
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
        this.setState({ klick: "change", oldName: this.state.expens.expensName, originalExpens: { ...this.state.expens } });
    };
    
    ChangeExpense = () => {
        if (this.nameCheckingChange(this.state.expens.expensName) == true && this.dateCheking() == true && this.sumCheking() == true) {
            this.setState({ klick: true })
            const newExpense = {
                expens: {
                    expensName: this.state.expens.expensName,
                    expensDat: this.state.expens.expensDat,
                    expensSum: this.state.expens.expensSum,
                }
            }
            let prevmasExpense = this.props.masExpense;
            console.log(prevmasExpense)
            console.log(this.state.oldName)
            prevmasExpense.forEach((element, index) => {
                if (element.expens.expensName === this.state.oldName) {
                    prevmasExpense[index] = newExpense;
                }
            });
            console.log(prevmasExpense)
            this.props.updateElectronExpense(prevmasExpense);
            let win = window.electron.SaveExpense(prevmasExpense);
            this.props.handleFunction("");
        }
    }
    SanselExpense = () => {
        this.props.handleFunction("");
    }
    SanselExpenseChange = () => {
        this.setState({ klick: true, expens: { ...this.state.originalExpens } });
    };
    
    render() {
        if (this.state.klick == false) {
            return (
                <div className='Expense'>
                    <div className='Expense-box_input'>
                        <input name="expensName" value={this.state.expens.expensName} onChange={this.handleInputChangeName} className={this.state.errorName ? 'Expense-box_input-input glow_around ' : ' glow_around-false-name'} type="text" /> Наименование*
                    </div>
                    <div className='Expense-box_input_dat_sum'>
                        <input name="expensDat" value={this.state.expens.expensDat}  onKeyDown={this.handleKeyDown} onChange={this.handleInputChangeDate} className={this.state.errorDate ? 'Expense-box_input-input-dat glow_around' : ' glow_around-false-date'} type="number" max="31" min="1" maxLength="2"/> Число выплаты*
                    </div>
                    <div className='Expense-box_input_dat_sum'>
                        <input name="expensSum" value={this.state.expens.expensSum}  onKeyDown={this.handleKeyDown} onChange={this.handleInputChange} className={this.state.errorSum ? 'Expense-box_input-input glow_around' : ' glow_around-false-sum'} type="number" maxLength="13" />Сумма*
                    </div>
                    <button onClick={this.SaveExpense} className='Expense-ok glow_around'>Ок</button>
                    <button onClick={this.SanselExpense} className='Expense-cansel glow_around'>Отмена</button>
                </div>
            )
        }
        else if (this.state.klick == "change") {
            const oldExpens = this.state.expens;
            return (
                <div className='Expense'>
                    <div className='Expense-box_input'>
                        <input name="expensName" value={this.state.expens.expensName} onChange={this.handleInputChangeName} className={this.state.errorName ? 'Expense-box_input-input glow_around ' : ' glow_around-false-name'} type="text" /> Наименование*
                    </div>
                    <div className='Expense-box_input_dat_sum'>
                        <input name="expensDat" onKeyDown={this.handleKeyDown} value={this.state.expens.expensDat} onChange={this.handleInputChangeDate} className={this.state.errorDate ? 'Expense-box_input-input-dat glow_around' : ' glow_around-false-date'} type="number" max="31" min="1" maxLength="2"/> Число выплаты*
                    </div>
                    <div className='Expense-box_input_dat_sum'>
                        <input name="expensSum" onKeyDown={this.handleKeyDown} value={this.state.expens.expensSum} onChange={this.handleInputChange} className={this.state.errorSum ? 'Expense-box_input-input glow_around' : ' glow_around-false-sum'} type="number" maxLength="13"/>Сумма*
                    </div>
                    <button onClick={this.ChangeExpense} className='Expense-ok glow_around'>Ок</button>
                    <button onClick={this.SanselExpenseChange} className='Expense-cansel glow_around'>Отмена</button>
                </div>
            )
        }
        else if (this.state.klick == true) {
            return (
                <div className='ViewExpense'>
                    <div className='Expense-view'>
                        <div className='Expense-view-time' >
                            <div className='Expense-view-description-text'> {this.state.expens.expensDat} числа</div>
                        </div>
                        <div>
                            <div className='Expense-view-description' >
                                <div className='Expense-view-description-text'> {this.state.expens.expensName}</div>
                            </div>
                            <div className='Expense-view-description' >
                                <div className='Expense-view-description-text'> {this.state.expens.expensSum}{" "} руб</div>
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
        masExpense: state.masExpense,
    }
}

export default connect(mapStateToProps, { pushExpense, updateElectronExpense })(Expense) 
