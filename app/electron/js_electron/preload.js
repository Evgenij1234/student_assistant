const { contextBridge, ipcRenderer } = require('electron');
const path = require('path');
const fs = require('fs');
contextBridge.exposeInMainWorld(
    'electron', {
    common: (events) => {
        if (events == "close") {
            ipcRenderer.send('close-window'); // Отправляем сообщение в основной процесс
        }
        else if (events == "min") {
            ipcRenderer.send('min-window');
        }
        else if (events == "max") {
            ipcRenderer.send('max-window');
        }
    },
    saveFile: async (file) => {
        try {
            let fileContent = JSON.stringify(file);
            await ipcRenderer.invoke('save-file', file.nameSchedule, fileContent);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    },
    getNameFile: async () => {
        try {
            const filesName = await ipcRenderer.invoke('get-file-list');
            return filesName;
        }
        catch (error) {
            console.error('Error get name file:', error);
            return [];
        }
    },
    deleteFile: async (nameFile) => {
        try {
            await ipcRenderer.invoke('delete-file', nameFile);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    },
    getDataFile: (nameFile) => {
        try {
            const filesData = ipcRenderer.invoke('get-viev-file-list', nameFile);
            return filesData;
        }
        catch (error) {
            console.error('Error get file:', error);
            return [];
        }
    },
    rewriteSchedule: async (file, oldname) => {
        try {
            let fileContent = JSON.stringify(file);
            await ipcRenderer.invoke('rewrite-file', file.nameSchedule, oldname, fileContent);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    },

    getScheduleFile: async () => {
        try {
            const files = await ipcRenderer.invoke('get-file-schedule');
            return files;
        }
        catch (error) {
            console.error('Error get file:', error);
        }
    },
    assignPrimarySchedule: async (nameFile) => {
        try {
            const assign = await ipcRenderer.invoke('assign-primary-schedule', nameFile);
            return assign;
        } catch (error) {
            console.error('ошибка из прелоада:', error);
        }
    },
    SaveExpense: async (data) => {
        try {
            let fileContent = JSON.stringify(data);
            await ipcRenderer.invoke('Add-expense', fileContent);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    },
    getExpenseFile: async () => {
        try {
            const files = await ipcRenderer.invoke('get-file-expense');
            return files;
        }
        catch (error) {
            console.error('Error get file:', error);
        }
    },
    SaveIncome: async (data) => {
        try {
            let fileContent = JSON.stringify(data);
            await ipcRenderer.invoke('Add-income', fileContent);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    },
    getIncomeFile: async () => {
        try {
            const files = await ipcRenderer.invoke('get-file-income');
            return files;
        }
        catch (error) {
            console.error('Error get file:', error);
        }
    },
    getFileSumm: async () => {
        try {
            const files = await ipcRenderer.invoke('get-file-summ');
            return files;
        }
        catch (error) {
            console.error('Error get file:', error);
        }
    },
    SaveSumm: async (data) => {
        try {
            let fileContent = JSON.stringify(data);
            await ipcRenderer.invoke('Add-summ', fileContent);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    },
    getFileExercise: async () => {
        try {
            const files = await ipcRenderer.invoke('get-file-exercise');
            return files;
        }
        catch (error) {
            console.error('Error get file:', error);
        }
    },
    SaveExercise: async (data) => {
        try {
            let fileContent = JSON.stringify(data);
            await ipcRenderer.invoke('Save-exercise', fileContent);
        } catch (error) {
            console.error('Error saving file:', error);
        }
    },
})