//получаем ноды поля и кнопок
const input = document.querySelector('.input');
const btnMess = document.querySelector('.btn-mess');
const btnGeo = document.querySelector('.btn-geo');
const userMessages = document.querySelector('.user-messages');
const serverMessages = document.querySelector('.server-messages');
const wrapperChat = document.querySelector('.wrapper-chat');

//эхо-сервер, к которому будем обращаться
const wsUri = 'wss://echo-ws-service.herokuapp.com';


//СООБЩЕНИЯ

//HTML-разметка для вывода сообщения, полученного от сервера
function writeToScreen(message) {
    userMessages.innerHTML += `<p class='messages' style='align-self: flex-end'>${message}</p>`;
}

//Устанавливаем соединение с сервером

let websocket = new WebSocket(wsUri); //создаем объект соединения

websocket.onopen = function () { //открываем соединение
    writeToScreen(`<span style="color:forestgreen">CONNECTED</span>`);
};

websocket.onmessage = function (event) { //получаем ответ от сервера
    writeToScreen(`Ответ сервера: ${event.data}`, 'flex-start');
};

websocket.onerror = function (event) {//получаем ответ от сервера при ошибке соединения
    writeToScreen(`server: ${event.data}`, 'flex-start');
}

//Отправляем сообщение на сервер

btnMess.addEventListener('click', () => {
    const message = input.value; //получаем данные из input
    websocket.send(message); //отправляем данные из input на сервер
    writeToScreen(`Вы: ${message}`); //выводим сообщение от сервера
    input.value = ''; //очищаем input
});

//Закрываем соединение с сервером
websocket.onclose = function () {
    writeToScreen(`<span style="color:red">DISCONNECTED</span>`);
    websocket = null; //очищаем объект-сокет
};

//ГЕОДАННЫЕ

//сообщение об ошибке при неуспешном получении геолокации
const error = () => {
    const textError = 'Невозможно получить ваше местоположение';
    writeToScreen(textError);
};

//функция, срабатывающая при успешном получении геолокации
const success = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const geoLink = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    writeToScreen(`<a href='${geoLink}' target='_blank'>Ваша геолокация</a>`);
};

//вешаем обработчик на кнопку геолокации
btnGeo.addEventListener('click', () => {
    //проверяем, есть ли доступ к API геолокации
    if (!navigator.geolocation) {
        console.log('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
});

//удаляем сообщения
serverMessages.addEventListener('click', () => {
    userMessages.innerHTML = " ";
});

