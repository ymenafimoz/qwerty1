// Создаем пустой словарь для хранения пользователей
let users = {}; // Инициализируем пустой объект для хранения данных пользователей

// Загружаем пользователей из локального хранилища
function loadUsersFromStorage() {
    const storedUsers = localStorage.getItem('users'); // Получаем сохраненные данные пользователей из локального хранилища
    if (storedUsers) {
        users = JSON.parse(storedUsers); // Парсим сохраненные данные в объект JavaScript
    } else {
        users = {}; // Инициализируем объект пользователей, если нет сохраненных данных
    }
}

// Сохраняем пользователей в локальное хранилище
function saveUsersToStorage() {
    localStorage.setItem('users', JSON.stringify(users)); // Преобразуем объект пользователей в строку и сохраняем в локальном хранилище
}

// Определяем функцию регистрации пользователя
function registerUser (username, password) {
    if (users[username]) { // Проверяем, существует ли пользователь с таким именем в объекте пользователей
        alert(`Пользователь ${username} уже зарегистрирован. Пожалуйста, выберите другое имя.`); // Логгируем сообщение о том, что пользователь уже существует
        return false; // Возвращаем false, указывая на неудачную регистрацию
    }
    users[username] = { password: password }; // Добавляем нового пользователя в объект пользователей с его паролем
    saveUsersToStorage(); // Сохраняем обновленный объект пользователей в локальном хранилище
    alert(`Пользователь ${username} успешно зарегистрирован. Добро пожаловать в мир кино!`);
    window.location.href = 'trpoaut.html'; // Перенаправляем на страницу входа
    return true; // Возвращаем true, указывая на успешную регистрацию
}

// Определяем функцию входа пользователя
function loginUser (username, password) {
    if (users[username] && users[username].password === password) { // Проверяем, существует ли пользователь с таким именем и паролем в объекте пользователей
        alert(`Пользователь ${username} успешно вошел в систему. Добро пожаловать обратно!`); 
        localStorage.setItem('username', username);
        localStorage.setItem('password', password); // Сохраняем имя пользователя в localStorage
        window.location.href = 'trpost.html'; // Перенаправляем на страницу каталога
        return true; // Возвращаем true, указывая на успешный вход
    }
    alert(`Ошибка входа: неверное имя пользователя или пароль. Попробуйте снова.`); // Логгируем сообщение о неудачном входе
    return false; // Возвращаем false, указывая на неудачный вход
}

// Добавляем обработчики событий после определения функций
document.addEventListener('DOMContentLoaded', function() {
    loadUsersFromStorage(); // Загружаем пользователей из локального хранилища при загрузке документа

    const registrationForm = document.getElementById('registrationForm1'); // Получаем элемент формы регистрации
    const loginForm = document.getElementById('loginForm1'); // Получаем элемент формы входа

    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы при отправке
            const usernameInput = document.getElementById('username'); // Получаем элемент ввода имени пользователя
            const passwordInput = document.getElementById('password'); // Получаем элемент ввода пароля
            if (usernameInput && passwordInput) {
                const username = usernameInput.value; // Получаем значение имени пользователя
                const password = passwordInput.value; // Получаем значение пароля
                loginUser (username, password); // Вызываем функцию входа пользователя с именем пользователя и паролем
            } else {
                console.log("Элемент ввода имени пользователя или пароля не найден."); // Логгируем сообщение о том, что элемент ввода не найден
            }
        });
    } else {
        console.log("Элемент формы входа не найден."); // Логгируем сообщение о том, что элемент формы входа не найден
    }

    if (registrationForm) {
        registrationForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Предотвращаем стандартное поведение формы при отправке
            const usernameRegInput = document.getElementById('usernamereg'); // Получаем элемент ввода имени пользователя для регистрации
            const passwordRegInput = document.getElementById('passwordreg'); // Получаем элемент ввода пароля для регистрации
            if (usernameRegInput && passwordRegInput) {
                const username = usernameRegInput.value; // Получаем значение имени пользователя для регистрации
                const password = passwordRegInput.value; // Получаем значение пароля для регистрации
                registerUser (username, password); // Вызываем функцию регистрации пользователя с именем пользователя и паролем
            } else {
                console.log("Элемент ввода имени пользователя или пароля для регистрации не найден."); // Логгируем сообщение о том, что элемент ввода не найден
            }
        });
    } else {
        console.log("Элемент формы регистрации не найден."); // Логгируем сообщение о том, что элемент формы регистрации не найден
    }
});