class View {
  constructor () {
    this.containerWidget = document.querySelector('.widget__filter');
    this.buttonChangeChoice = document.querySelector('.widget__head-change-button');
    this.containerWidgetItems = document.querySelector('.widget__filter-list');
    this.containerSelectedItems = document.querySelector('#widget__footer-selected-items');
    this.buttonSaveChoice = document.querySelector('.save-choice-button');
    this.buttonCancelChoiсe = document.querySelector('.cancel-choice-button');
    this.containerSavedList = document.querySelector('.widget__selected-items');
    this.searchField = document.querySelector('.widget__filter-search input');
    this.selectFilter = document.querySelector('.widget__filter-select select');
  }

  changeChoice () {
    this.containerWidget.classList.toggle('showed');
  }

  init () {
  }
}

export default View;
