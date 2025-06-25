//Функция для подсчета составной статьи расхода по формуле expression и переменных из massVariables
export function calculationSum(expression, massVariables, incomeName) {
    const output = { sum: "", colback: "", formul: "" }
    //Вариант когда ввели только цифры
    const regex = /^[0-9 .]*$/;
    if (regex.test(expression)) {
        output.sum = expression;
        output.colback = true;
        output.formul = expression;
        return output
    }
    //Вариант когда ввели Значения кроме цифр
    else {
        try {
            var masExpression = formulaDisassembly(expression);
            if (masExpression.includes(incomeName)) {
                output.sum = ""
                output.formul = expression
                output.colback = false;
                return output
            }
            const perem = /^[a-zA-Zа-яА-Я]*$/;
            var stringCalculation = "";
            for (let i in masExpression) {
                if (perem.test(masExpression[i])) {
                    //логика поиска значения в других объектах
                    stringCalculation += searchPerem(masExpression[i])
                }
                else {
                    stringCalculation += masExpression[i]
                }
            }
            const sum = eval(stringCalculation);
            if (regex.test(sum)) {
                output.sum = sum;
                output.colback = true;
                output.formul = expression;
                return output
            }
            else {
                output.sum = ""
                output.formul = expression
                output.colback = false;
                return output
            }
        }
        catch {
            output.sum = ""
            output.formul = expression
            output.colback = false;
            return output
        }
    }
    function searchPerem(perem) {
        for (let i in massVariables) {
            if (massVariables[i].income.incomeName == perem) {
                return massVariables[i].income.incomeSum
            }
        }
    }
}
//функция для разбиения формулы на массив
function formulaDisassembly(expression) {
    var masExpression = [];
    const perem = /^[a-zA-Zа-яА-Я]*$/;
    const operation = /^[+\-*/]*$/;
    const numbers = /^[0-9 .]*$/;
    var box = "";
    for (let i = 0; i < expression.length; i++) {
        if (perem.test(expression[i])) {
            box += expression[i];
        }
        if (operation.test(expression[i])) {
            if (box.length != 0) {
                masExpression.push(box)
            }
            masExpression.push(expression[i])
            box = "";
        }
        if (numbers.test(expression[i])) {
            box += expression[i];
        }
        if (expression[i] == "(" || expression[i] == ")") {
            if (box.length != 0) {
                masExpression.push(box)
            }
            masExpression.push(expression[i])
            box = "";
        }
        if (i + 1 == expression.length) {
            if (box.length != 0) {
                masExpression.push(box)
            }
        }
    }
    return masExpression
}
//функция для обновления формул при изменении названия переменных
export function changingFormulas(masIncome, oldName, incomeName) {
    const newmasIncome = masIncome;
    if (oldName !== incomeName) {
        let output = [];
        for (let i = 0; i < newmasIncome.length; i++) {
            let formul = formulaDisassembly(newmasIncome[i].income.incomeFormula);
            for (let j = 0; j < formul.length; j++) {
                if (formul[j] === oldName) {
                    formul[j] = incomeName;
                }
            }
            let newFormul = formul.join('');
            newmasIncome[i].income.incomeFormula = newFormul;
            output.push(newmasIncome[i]);
        }
        console.log("es")
        return output;
    } else {
        return masIncome;
    }
}
//функция пересчета суммы
export function conversionSum(masIncome) {
    for (let i in masIncome) {
        masIncome[i].income.incomeSum = calculationSum(masIncome[i].income.incomeFormula, masIncome, masIncome[i].income.incomeName).sum
    }
    return masIncome;
}
//функция для обновления формул при удалении учавствющей в расчете переменной
export function changingFormulasDelit(masIncome, incomeName) {
    const newmasIncome = [...masIncome];
    let masIncomeInFormul = []
    for (let i in newmasIncome) {
        let maSformul = formulaDisassembly(newmasIncome[i].income.incomeFormula)
        console.log(maSformul.length)
        for (let j in maSformul) {
            if (maSformul[j] == incomeName) {
                masIncomeInFormul.push(newmasIncome[i].income.incomeName)
            }
        }
    }
    const output = { newmasIncome: newmasIncome, masIncomeInFormul: masIncomeInFormul }
    return output;
}
export function deletingCompound(masIncome) {
    const newmasIncome = [...masIncome];
    let output = [];
    let masName = []
    for (let i in newmasIncome) {
        masName.push(newmasIncome[i].income.incomeName)
    }
    for (let i in newmasIncome) {
        let formul = formulaDisassembly(newmasIncome[i].income.incomeFormula);
        for (let j in formul) {
            if (masName.indexOf(formul[j]) !== -1) {
                masName.splice(masName.indexOf(formul[j]), 1)
            }
        }
    }
    for (let i in newmasIncome) {
        for (let j in masName) {
            if (newmasIncome[i].income.incomeName == masName[j]) {
                output.push(newmasIncome[i])
            }
        }
    }
    return output
}

