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

   // Загрузка приложения в зависимости от режима работы
  if (process.env.ELECTRON_START_URL) {
    // Режим разработки - подключаемся к webpack-dev-server
    mainWindow.loadURL(process.env.ELECTRON_START_URL);
    mainWindow.webContents.openDevTools(); // Автоматически открываем DevTools в dev-режиме
    console.log('Running in development mode');
  } else {
    // Production режим - пробуем разные варианты загрузки
    try {
      // Сначала пробуем загрузить из build-папки (стандартный путь для create-react-app)
      const buildPath = path.join(__dirname, '../build/index.html');
      if (fs.existsSync(buildPath)) {
        mainWindow.loadFile(buildPath);
        console.log('Loaded from build directory');
      } else {
        // Если билда нет, пробуем загрузить напрямую (для кастомных конфигураций)
        const fileUrl = url.format({
          pathname: path.join(__dirname, '../index.html'),
          protocol: 'file:',
          slashes: true
        });
        mainWindow.loadURL(fileUrl);
        console.log('Loaded directly from index.html');
      }
    } catch (error) {
      console.error('Failed to load application:', error);
      dialog.showErrorBox('Ошибка', 'Не удалось загрузить приложение');
      app.quit();
    }
  }

  // Всегда скрываем меню (ваша оригинальная настройка)
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
// Обеспечить существование папок с обработкой ошибок
function ensureDirSync(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created directory: ${dirPath}`);
    }
  } catch (err) {
    console.error(`Failed to create directory ${dirPath}:`, err);
    throw err; // Пробрасываем ошибку дальше для обработки в вызывающем коде
  }
}

// Создаем все необходимые папки
[schedulePath, financePath, exercisePath].forEach(ensureDirSync);

// Создаем обязательные файлы с дефолтным содержимым (если их нет)
const requiredFiles = {
  [configSchedulePath]: '',
  [path.join(financePath, 'Expense.json')]: '[]',
  [path.join(financePath, 'Income.json')]: '[]',
  [path.join(financePath, 'Summ.json')]: '0',
  [path.join(exercisePath, 'Exercise.json')]: '[]'
};

Object.entries(requiredFiles).forEach(([filePath, defaultContent]) => {
  try {
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, defaultContent);
      console.log(`Created default file: ${filePath}`);
    }
  } catch (err) {
    console.error(`Failed to create file ${filePath}:`, err);
  }
});

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