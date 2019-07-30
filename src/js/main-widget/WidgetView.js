// import {AbstractView} from "./abstract.view";

export default class WidgetView {
  constructor (controller) {
    this.mainController = controller;
    this.showFilter = this.showFilter.bind(this);
  }

  setSelectors () {
    this.widget = document.querySelector('.widget__filter');
    this.buttonChangeChoice = document.querySelector('.widget__head-change-button');
    this.widgetList = document.querySelector('.widget__filter-list');
    this.containerSelectedItems = document.querySelector('#widget__footer-selected-items');
    this.buttonSaveChoice = document.querySelector('.save-choice-button');
    this.buttonCancelChoice = document.querySelector('.cancel-choice-button');
    this.containerSavedList = document.querySelector('.widget__selected-items');
  }

  showFilter () {
    if (this.widget) {
      this.widget.classList.toggle('showed');
      this.mainController.initForm(); // * make destroy form method later
      this.mainController.clearSearchAndSelectFields();
    }
  }

  convertDataToListElements (data) {
    return data.map((item, index) => (
      `<li class="widget__filter-list__item" data-id='${index + 1}' data-active='${item['active']}' data-disabled='${item['disabled']}' data-item_number='${index + 1}'>
        ${item['text']}
      </li>`
    ));
  }

  fillDomElementFromArray (array, domElement) {
    domElement.innerHTML = array.join('');
  }

  renderWidgetItems (array) {
    const arr = this.convertDataToListElements(array);
    this.fillDomElementFromArray(arr, this.widgetList);
  }

  renderCopiesForFooter (arr) {
    return arr.map((item) => (
      `<li data-id='${item['id']}'><span class='widget__item-name'>${item['text']}</span><span class='widget__remove-item'></span></li>`
    ));
  }

  createActiveItemsCopies (arr) {
    const self = this;
    const activated = this.mainController.getActivatedItemsArray();
    const renderedArray = this.renderCopiesForFooter(activated);
    this.fillDomElementFromArray(renderedArray, this.containerSelectedItems);
    this.addAbilityToDeleteSelected(arr, self);
  }

  addAbilityToDeleteSelected (arr, self) {
    const array = document.querySelectorAll('.widget__footer-selected-items .widget__remove-item');

    array.forEach(function (element) {
      element.addEventListener('click', function () {
        const tag = 'LI';
        const parent = element.closest(tag);
        let id = parent.dataset.id;
        const listEl = document.querySelector(`[data-id='${id}']`);

        listEl.dataset.active = 'false';
        parent.remove();
        arr[--id]['active'] = false;
        parent.dataset.active = false;
        self.undisableElements();
        self.mainController.refreshNumberOfActiveElements();
      });
    });
  }

  undisableElements () {
    const arr = document.querySelectorAll('.widget__filter-list__item');
    arr.forEach(function (element) {
      element.dataset.disabled = false;
    });
  }

  createSavedItemsCopies (arr) {
    return arr.map((item) => (
      `<li data-id='item-${item['id']}'><span class='widget__item-name'>${item['text']}</span><span class='widget__remove-item'></span></li>`
    ));
  }

  addLogicToListItems (e) {
    this.mainController.addItemsActivationPossibility(e);
    this.mainController.disableItemsActivationPossibility();
    this.mainController.renderWidgetItems();
    this.mainController.createActiveItemsCopies();
  }

  addToSavedItems (arr) {
    const len = document.querySelectorAll('#widget__footer-selected-items li').length;
    if (len) {
      const activated = this.mainController.getActivatedItemsArray(arr);
      const renderedArray = this.createSavedItemsCopies(activated);
      const containerSavedList = this.containerSavedList;
      this.fillDomElementFromArray(renderedArray, containerSavedList);
    }
  }

  setEvents () {
    this.buttonChangeChoice.addEventListener('click', this.showFilter);
    this.widgetList.addEventListener('click', (e) => {
      this.addLogicToListItems(e);
    });
    this.buttonSaveChoice.addEventListener('click', () => {
      this.mainController.addToSavedItems();
    });
    // this.buttonSaveChoice.addEventListener('click', this.mainController.addToSavedItems);
    this.buttonCancelChoice.addEventListener('click', () => {
      this.mainController.cancelSelection();
    });
    // this.buttonCancelChoice.addEventListener('click', this.mainController.cancelSelection);
  }

  init () {
    this.setSelectors();
    this.setEvents();
  }
}
