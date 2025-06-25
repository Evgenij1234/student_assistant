import { createStore } from "redux"

var currentDate = new Date();
let year = currentDate.getFullYear();
let month = currentDate.getMonth();
let day = currentDate.getDate();
let newData = [year, month, day];
let initialState = {
    openClose: false,
    check: false,
    calendarDate: newData,
    calendarDateEdit: newData,
    data: [],
    //сохраняемые
    saveLesson: [],
    masExpense: [],
    masIncome:[],
    masExercise:undefined,
}

const store = createStore((state = initialState, action) => {
    switch (action.type) {
        case 'SIDEBAR_STATE': {
            return { ...state, openClose: action.payload };
        };
        case 'CALENDAR_DAT': {
            return { ...state, calendarDate: action.payload };
        };
        case 'CALENDAR_DAT_EDIT': {
            return { ...state, calendarDateEdit: action.payload };
        };
        case 'DATA_LESSON': {
            return { ...state, data: action.payload };
        };
        case 'SAVE_LESSON': {
            const { numbreDay, numbreLesson } = action.payload;
            const updatedSaveLesson = [...state.saveLesson];
            const index = updatedSaveLesson.findIndex(item => item.numbreLesson === numbreLesson && item.numbreDay === numbreDay);
            if (index !== -1) {
                if (action.payload.delit === true) {
                    updatedSaveLesson.splice(index, 1);
                }
                else {
                    updatedSaveLesson[index] = action.payload;
                }
            }
            else {
                updatedSaveLesson.push(action.payload);
            }
            return { ...state, saveLesson: updatedSaveLesson };
        }
        case 'CLEAR_SAVE_LESSON': {
            return {
                ...state, saveLesson: [], calendarDate: newData,
                calendarDateEdit: newData,
            };
        }
        case 'PUSH_EXPENSE': {
            const updatedExpens = [...state.masExpense];
            updatedExpens.push(action.payload);
            return { ...state, masExpense: updatedExpens };
        }
        case 'UPDATE_ELECTRON_EXPENSE': {
            return { ...state, masExpense: action.payload };
        }
        case 'PUSH_INCOME': {
            const updatedIncome = [...state.masIncome];
            updatedIncome.push(action.payload);
            return { ...state, masIncome: updatedIncome };
        }
        case 'UPDATE_ELECTRON_INCOME': {
            return { ...state, masIncome: action.payload };
        }
        case 'SAVE_EXERCISE':{
            return{...state, masExercise: action.payload}
        }
        default: return state;
    }
});
//Сайтбар

export const OpenSidebar = (event) => (
    {
        type: 'SIDEBAR_STATE',
        payload: event
    });
//Функции для расписания
export const sostCalendar = (date) => {
    return {
        type: 'CALENDAR_DAT',
        payload: date
    };
};
export const dataLesson = (text) => {
    return {
        type: 'DATA_LESSON',
        payload: text
    }
}
export const saveLessonGlobal = (saveLesson) => {
    return {
        type: 'SAVE_LESSON',
        payload: saveLesson
    }
}
export const sostCalendarEdit = (date) => {
    return {
        type: 'CALENDAR_DAT_EDIT',
        payload: date
    };
};
export const clearSaveLesson = (date) => {
    return {
        type: 'CLEAR_SAVE_LESSON',
        payload: date
    };
};
//Функции для финансов
export const pushExpense = (masExpense) => {
    return {
        type: 'PUSH_EXPENSE',
        payload: masExpense
    };
};
export const updateElectronExpense = (masExpense) => {
    return {
        type: 'UPDATE_ELECTRON_EXPENSE',
        payload: masExpense
    };
};
export const pushIncome = (masIncome) => {
    return {
        type: 'PUSH_INCOME',
        payload: masIncome
    };
};
export const updateElectronIncome = (masIncome) => {
    return {
        type: 'UPDATE_ELECTRON_INCOME',
        payload: masIncome
    };
};

//Функции для заданий
export const saveExercise = (masExercise) => {
    return {
        type: 'SAVE_EXERCISE',
        payload: masExercise
    };
};


window.store = store;
export default store;