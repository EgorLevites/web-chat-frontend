# Используем официальный образ Nginx как базовый
FROM nginx:alpine

# Установим рабочую директорию
WORKDIR /usr/share/nginx/html

# Удалим стандартный контент Nginx
RUN rm -rf ./*

# Копируем файлы фронтенда в директорию Nginx
COPY index.html app.js styles.css ./

# Заменяем хостинг URL на локальный URL для локального запуска
RUN sed -i 's|https://web-chat-backend-rry8.onrender.com|http://localhost:8080|g' app.js

# Если у вас есть дополнительные папки (например, assets), добавьте их:
# COPY assets/ ./assets/

# Открываем порт 80 для доступа извне
EXPOSE 80

# Запускаем Nginx в форграунд режиме
CMD ["nginx", "-g", "daemon off;"]
