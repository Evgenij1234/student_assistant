// Модули для управления приложением и создания окна
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const fs = require('fs');
const path = require('path');
const url = require('url');

let mainWindow;
const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    minWidth: 800,
    minHeight: 600,
    title: "ProjectStudent",
    frame: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true,
      contextIsolation: true,
      preload: path.join(__dirname, 'js_electron/preload.js'),
    }
  })

  // и загрузить index.html приложения.
  //mainWindow.loadFile(path.join(__dirname,'../index.html'));//закомменитровать если надо перейти к dev версии

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  });

  mainWindow.loadURL(startUrl); //закомментировать если надо перейти к билд версии
  mainWindow.loadURL('http://localhost:3000');//закомментировать если надо перейти к билд версии

  // Отображаем средства разработчика.
  mainWindow.webContents.openDevTools()
  mainWindow.setMenuBarVisibility(false);
}
//закрыть
app.on('ready', createWindow);
ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

//скрыть
ipcMain.on('min-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

//на весь экран
ipcMain.on('max-window', () => {
  if (mainWindow) {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize();
    }
    else {
      mainWindow.maximize();
    }
  }
});







app.on('window-all-closed', function () {

  if (process.platform !== 'darwin') app.quit()
})

//Расписание
// Базовый путь к пользовательским данным
const userDataPath = app.getPath('userData');
const schedulePath = path.join(userDataPath, 'store_electron', 'schedule');
const configSchedulePath = path.join(userDataPath, 'store_electron', 'configSchedule.txt');
const financePath = path.join(userDataPath, 'store_electron', 'finance');
const exercisePath = path.join(userDataPath, 'store_electron', 'exercise');
// Обеспечить существование папкок
if (!fs.existsSync(schedulePath)) {
  fs.mkdirSync(schedulePath, { recursive: true });
}
if (!fs.existsSync(financePath)) {
  fs.mkdirSync(financePath, { recursive: true });
}
if (!fs.existsSync(exercisePath)) {
  fs.mkdirSync(exercisePath, { recursive: true });
}

//Сохранить файл расписания
ipcMain.handle('save-file', async (event, fileName, fileContent) => {
  const filePath = path.join(schedulePath, fileName + '.json');
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to the file');
    }
  });
});
//Перезаписать файл расписания
ipcMain.handle('rewrite-file', async (event, newname, oldname, fileContent) => {
  const oldFilePath = path.join(schedulePath, oldname + '.json');
  const newFilePath = path.join(schedulePath, newname + '.json');
  fs.writeFile(oldFilePath, fileContent, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }
    fs.rename(oldFilePath, newFilePath, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
      } else {
        console.log('File has been renamed');
      }
    });
  });
});
//Выдать названия файлов расписания
ipcMain.handle('get-file-list', async (event) => {
  try {
    const filesName = await fs.promises.readdir(schedulePath);
    return filesName;
  } catch (error) {
    console.error('Error reading directory:', error);
    throw error;
  }
});
//Удалить файл расписания
ipcMain.handle('delete-file', async (event, nameFile) => {
  const filePath = path.join(schedulePath, nameFile + '.json');
  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    console.error('Error deleting file:', error);
    throw error;
  }
});
//Выдать данные из файла расписания
ipcMain.handle('get-viev-file-list', async (event, nameFile) => {
  const filePath = path.join(schedulePath, nameFile + '.json');
  try {
    const fileContent = await fs.promises.readFile(filePath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading file:', error);
    throw error;
  }
});
//Назначить расписание основным
ipcMain.handle('assign-primary-schedule', async (event, nameFile) => {
  fs.writeFile(configSchedulePath, nameFile, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to the file');
    }
  });
  return nameFile;
});
//Выдать основной файл расписания
ipcMain.handle('get-file-schedule', async (event) => {
  try {
    const filesName = await fs.promises.readdir(schedulePath);
    if (filesName.length == 1) {
      const fileContent = await fs.promises.readFile(path.join(schedulePath, filesName[0]), 'utf8');
      return JSON.parse(fileContent);
    } else if (filesName.length > 1) {
      const nameAssingSchedule = await fs.promises.readFile(configSchedulePath, 'utf8');
      const filePath = path.join(schedulePath, nameAssingSchedule + '.json');
      if (!fs.existsSync(filePath)) {
        return null;
      }
      const fileContent = await fs.promises.readFile(filePath, 'utf8');
      return JSON.parse(fileContent);
    } else {
      return null;
    }
  } catch (error) {
    console.error('Error reading directory or file:', error);
    throw error;
  }
});






//Расходы
const filePathExpense = path.join(financePath, 'Expense.json');
//Сохранить файл расходов
ipcMain.handle('Add-expense', async (event, fileContent) => {
  fs.writeFile(filePathExpense, fileContent, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to the file');
    }
  });
});
//Выдать файл расходов
ipcMain.handle('get-file-expense', async (event) => {
  try {
    if (!fs.existsSync(filePathExpense)) {
      fs.writeFileSync(filePathExpense, '[]');
      return '[]';
    }
    const fileContent = await fs.promises.readFile(filePathExpense, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading directory or file:', error);
    throw error;
  }
});







const filePathIncome = path.join(financePath, 'Income.json');
//Сохранить файл доходов
ipcMain.handle('Add-income', async (event, fileContent) => {
  fs.writeFile(filePathIncome, fileContent, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to the file');
    }
  });
});
//Выдать файл доходов
ipcMain.handle('get-file-income', async (event) => {
  try {
    if (!fs.existsSync(filePathIncome)) {
      fs.writeFileSync(filePathIncome, '[]');
      return '[]';
    }
    const fileContent = await fs.promises.readFile(filePathIncome, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading directory or file:', error);
    throw error;
  }
});
const filePathSumm = path.join(financePath, 'Summ.json');
//Выдать в наличии
ipcMain.handle('get-file-summ', async (event) => {
  try {
    if (!fs.existsSync(filePathSumm)) {
      fs.writeFileSync(filePathSumm, '0');
      return '0';
    }
    const fileContent = await fs.promises.readFile(filePathSumm, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading directory or file:', error);
    throw error;
  }
});
//Сохранить файл в наличии
ipcMain.handle('Add-summ', async (event, fileContent) => {
  fs.writeFile(filePathSumm, fileContent, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to the file');
    }
  });
});



//Задания
//Сохранить задания
const filePathExercise = path.join(exercisePath, 'Exercise.json');
//Сохранить файл доходов
ipcMain.handle('Save-exercise', async (event, fileContent) => {
  fs.writeFile(filePathExercise, fileContent, (err) => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('Data has been written to the file');
    }
  });
});
//Выдать файл доходов
ipcMain.handle('get-file-exercise', async (event) => {
  try {
    if (!fs.existsSync(filePathExercise)) {
      fs.writeFileSync(filePathExercise, '[]');
      return '[]';
    }
    const fileContent = await fs.promises.readFile(filePathExercise, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading directory or file:', error);
    throw error;
  }
});