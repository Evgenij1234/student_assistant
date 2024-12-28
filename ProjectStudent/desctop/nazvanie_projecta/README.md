DESCTOP
node -v = v21.6.1
# ProjectStudent
Все папки node_modules докачивать отдельно в соответствии с версией в файле package.json для фронтенда и досктоп версий!!!

Файлы Сервер, Терминал актуальны для Линукс

Настройка запуска и упаковки под Виндовс 10!

При запуске билд версии в виндовс:
1. Скачать репозиторий с исходниками
2. Закомментить игнор папок в .gitignore в корне репозитория.
3. Открыть папку nazvanie_projecta в терминале => npm i 
4. Открыть файл package.json и изменить следующие строки:
"start": "set BROWSER=none && react-scripts start",
”dev”: "set ELECTRON_START_URL=http://localhost:3000 && electron .”
"main": "build/electron/main.js",
Теперь запуск проекта для разработки будет такими двумя командами в разных терминалах:

npm start
npm run dev

При сборке проекта в готовое приложение под виндовс:
1. приводим одноименый блок кода в файле mine.js к такому виду 
// и загрузить index.html приложения.
  mainWindow.loadFile(path.join(__dirname,'../index.html'));//закомменитровать если надо перейти к dev версии

  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '../index.html'),
    protocol: 'file:',
    slashes: true
  });

  //mainWindow.loadURL(startUrl); //закомментировать если надо перейти к билд версии
  //mainWindow.loadURL('http://localhost:3000');//закомментировать если надо перейти к билд версии

  // Отображаем средства разработчика.
  //mainWindow.webContents.openDevTools()
  mainWindow.setMenuBarVisibility(false);

2. в консоле npm run build
3. Папку electron кидаем в папку build
4. в консоле npm install --save-dev electron-builder если не установлен
5. в консоле npm run package
6. Смотрим содержимое папки dist, запускать, или с установочного, или через exe

Настройка запуска и упаковки под Linux!

1. Скачать репозиторий с исходниками
2. Закомментить игнор папок в .gitignore в корне репозитория.
3. Открыть папку nazvanie_projecta в терминале => npm i 
4. Открыть файл package.json и изменить следующие строки:
 "start": "export BROWSER=none && react-scripts start",
"dev": "ELECTRON_START_URL=http://localhost:3000 electron .",

Теперь запуск проекта для разработки будет такими двумя командами в разных терминалах:

npm start
npm run dev
