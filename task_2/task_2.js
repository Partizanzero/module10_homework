//получаем кнопку
const btn = document.querySelector('.j-btn-test');

//получаем размер экрана
const screenWidth = window.screen.width;
const screenHeight = window.screen.height;

//получаем размер окна браузера с учётом полосы прокрутки
const windowInnerWidthScroll = window.innerWidth;
const windowInnerHeightScroll = window.innerHeight;

//получаем размер окна браузера без учёта полосы прокрутки
const windowInnerWidth = document.documentElement.clientWidth;
const windowInnerHeight = document.documentElement.clientHeight;

//получаем размер веб-страницы
const pageWidth = document.documentElement.scrollWidth;
const pageHeight = document.documentElement.scrollHeight;

//вешаем обработчик на кнопку
btn.addEventListener('click', () => {
    alert(`Размер экрана: ${screenWidth}px x ${screenHeight}px. 
Размер окна браузера с полосой прокрутки: ${windowInnerWidthScroll}px x ${windowInnerHeightScroll}px.
Размер окна браузера без полосы прокрутки: ${windowInnerWidth}px x ${windowInnerHeight}px.
Размер веб-страницы: ${pageWidth}px x ${pageHeight}px.`);
});