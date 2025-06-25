# student_assistant
Приложение для отслеживания расписания, учета финансов и заметок

node -v = v21.6.1

# Инструкция по заупуску!
1. Скачать репозиторий с исходниками
2. Открыть папку app в терминале => npm i 
3. Для запуска в режиме разработки npm start, npm run dev в разных терминала

# Сборка проекта в готовое приложение:

Для Windows:
1. npm run build
2. npm install --save-dev @electron-forge/maker-squirrel
3. npm run package-win
4. Смотрим папку dist

Для Linux:
1. npm run build
2. npm run package-linux
3. Смотрим папку dist

