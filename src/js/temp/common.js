'use strict'

import initialData from '../initial-data.js';
// import Controller from './controller.js';

let buttonChangeChoice  = document.querySelector('.widget__head-change-button'),
  widget = document.querySelector('.widget__filter'),
  arrayConvertedItems = [],
  arrayActivatedItems = [],
  arrayLiElements = [],
  arrayChangedItems = [],
  widgetItemsList = document.querySelector('.widget__filter-list'),
  savedChoiceList = document.querySelector('.widget__selected-items'),
  saveChoiceButton = document.querySelector('.save-choice-button'),
  cancelChoiceButton = document.querySelector('.cancel-choice-button'),
  destinationElement = document.querySelector('#widget__footer-selected-items'),
  searchField = document.querySelector('.widget__filter-search input'),
  selectFilter = document.querySelector('.widget__filter-select-box select'),
  itemsArray = initialData;

// 1) По клику на "Изменить мой выбор" открывать диалог окно с возможностью выбора элементов
/* show-hide dialog (selection elements) block */
const changeChoice = function () {
  widget.classList.toggle('showed');
}

// const clearSearchAndSelect = function () {
//   searchField.value  = '';
//   selectFilter.value = '';
// }

// clearSearchAndSelect();

buttonChangeChoice.addEventListener('click', changeChoice);

// 2) Конвертация массива начальных элементов для передачи в диалог
/* function creates array of converted items from existing array items */
const convertInitialArray = function (array) {
  let convertedItems = [],
    i = 0,
    len = array.length;

  for (; i < len; i++) {
    let convertedItem = `<li data-item_number='${i + 1}'><div class='checkbox'><input type='checkbox' id='item-num-${i + 1}'><label for='item-num-${i + 1}'>${array[i]}</label></div></li>`;
    convertedItems.push(convertedItem);
  }

  return convertedItems;
}

// 3) заполнить массив arrayConvertedItems сконвертированными элементами
/* fill arrayConvertedItems with converting function */
arrayConvertedItems = convertInitialArray(itemsArray);

// 4) Функция для копирования элементов из сконвертированного массива в UL лист в диалоговом окне
/* function takes elements from converted array and filling ul inside dialog */
const fillDialogList = function (array, domElement) {
  domElement.innerHTML = array.join('');
}

// 5) Исполнение функции fillDialogList
/* run fillDialogList func */
fillDialogList(arrayConvertedItems, widgetItemsList);

// 6) Функция для активации выбранного элемента
/* reset active elements array and add to selected elements ul list */
const activateElements = function (items) {
  items.forEach(function (element) {
    element.addEventListener('change', function () {
      element.classList.toggle('active');
      findActivatedElements();
      checkNumberOfElementsEqual(3); // const
      createCopiesAndPushToFooter(arrayActivatedItems);
    })
  });
}

// 7) Функция для добавления возможности активации элементов
/* find converted and placed to dialog items and add event listeners */
const selectElements = function () {
  arrayLiElements = document.querySelectorAll('.widget__filter-list li');
  activateElements(arrayLiElements);
}

// Запуск фун-ии добавления активации
/* run selectElements function */
selectElements();

// 8)
const findActivatedElements = function () {
  arrayActivatedItems = document.querySelectorAll('.widget__filter-list .active');
}

// 9)
const disableCheckboxes = function () {
  let liElems = document.querySelectorAll('.widget__filter-list li:not(.active)');

  liElems.forEach(function (item) {
    item.classList.add('disabled');
  });
}

// 10)
const removeDisabledClassFromItems = function () {
  let liElems = document.querySelectorAll('.widget__filter-list li');

  liElems.forEach(function (item) {
    item.classList.remove('disabled');
  });
}

// 11)
const cancelActivation = function () {
  arrayActivatedItems.forEach(function (item) {
    item.classList.remove('active');
  });
}

// 12)
/* xxx  почему не работает в yyy ? */
// const clearArray = function(arrayEl) {
//     arrayEl = [];
// }

// 13)
const checkNumberOfElementsEqual = function (number) {
  let numberOfSelected = arrayActivatedItems.length;

  if (numberOfSelected >= number) {
    disableCheckboxes();
  } else {
    removeDisabledClassFromItems();
  }
}

// 14) Добавить функцию-обработчик для удаления элемента по клику (удалить нужный элемент с классом active)
// Remove selected element and remove class active
const removeActivatedElement = function () {
  let removeButton = document.querySelectorAll('#widget__footer-selected-items .widget__remove-item');

  removeButton.forEach(function (el) {
    el.addEventListener('click', function () {
      // let currentNum = +el.closest('li').dataset.showed_number - 1;
      let currentNum = el.closest('li').dataset.showed_number - 1;

      el.closest('li').remove();
      arrayLiElements[currentNum].classList.remove('active');
      removeDisabledClassFromItems();
    });
  });
}

// 15) Функция для создания (преобразования из элементов диалога) массива элементов
//   который будет отображаться как выбранный в списке выбранных элементов внизу ***
/* create element for place to chosen elements dialog list */
const createCopiesAndPushToFooter = function (array) {
  // yyy не работает почему-то
  arrayChangedItems = [];

  array.forEach(function (element) {
    let itemText    = element.textContent.trim(),
        elemData    = element.dataset.item_number,  // eslint-disable-line indent
        elementCopy = `<li data-showed_number='${elemData}'><span class='widget__item-name'>${itemText}</span><span class='widget__remove-item'></span></li>`; // eslint-disable-line indent

    arrayChangedItems.push(elementCopy);
  });

  fillDialogList(arrayChangedItems, destinationElement);
  removeActivatedElement();
}

// 16)
saveChoiceButton.addEventListener('click', function () {
  findActivatedElements();
  createCopiesAndPushToFooter(arrayActivatedItems);
  fillDialogList(arrayChangedItems, savedChoiceList);
  changeChoice();
});

// 17)
cancelChoiceButton.addEventListener('click', function () {
  cancelActivation();
  removeDisabledClassFromItems();
  destinationElement.innerHTML = '';
});

// 18)
searchField.addEventListener('input', function () {
  let str = this.value,
    liVisible = document.querySelectorAll('.widget__filter-list li:not(.hidden-selected)');

  liVisible.forEach(function (element) {
    let elemText = element.textContent.trim(),
      elemNum = elemText.indexOf(str);

    if (elemNum === -1) {
      element.classList.add('hidden-searched');
    } else {
      element.classList.remove('hidden-searched');
    }
  });
});

// 19)
selectFilter.addEventListener('change', function () {
  let selectFilterValue = this.value,
    liVisible = document.querySelectorAll('.widget__filter-list li');

  liVisible.forEach(function (element, i) {
    element.classList.remove('hidden-selected');

    switch (+selectFilterValue) {
      case 4:
        if (i < 200) {
          element.classList.add('hidden-selected');
        }
        break;
      case 3:
        if (i < 100) {
          element.classList.add('hidden-selected');
        }
        break;
      case 2:
        if (i < 10) {
          element.classList.add('hidden-selected');
        }
        break;
      case 1:
        element.classList.remove('hidden-selected');
        break;
      default:
        console.log('Я таких значений не знаю');
    }
  });
});
