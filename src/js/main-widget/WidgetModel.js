export default class WidgetModel {
  constructor (controller, data) {
    this.mainController = controller;
    this.initialData = data;
    this.maxActiveElements = 3;
    this.initialDataObjects = [];
    this.howManyActive = null;
  }

  convertDataToObjects (data) {
    const array = data.map((item, index) => ({
      id: ++index,
      text: item,
      active: false,
      disabled: false
    }));
    return array;
  }

  getActivatedItemsArray (arr) {
    let a = [];

    arr.forEach(function (element) {
      if (element['active'] === true) {
        a.push(element)
      }
    });
    return a;
  }

  addItemsActivationPossibility (e) {
    const elem = e.target;
    const tag = 'LI';
    let itemID = null;

    if (elem.tagName === tag) {
      itemID = elem.dataset.id;
    } else { return false; }

    let index = itemID - 1;
    const arr = this.initialDataObjects;
    const isActive = arr[index]['active'];
    const n = this.howManyActive;
    const max = this.maxActiveElements;

    if (isActive) {
      arr[index]['active'] = false;
    } else {
      if (n < max) {
        arr[index]['active'] = true;
      } else {
        console.log('can not select-element items');
        return false; // or through error ?
      }
    }
    this.refreshNumberOfActiveElements();
  }

  disableItemsActivationPossibility () {
    const n = this.howManyActive;
    const arr = this.initialDataObjects;
    const max = this.maxActiveElements;
    let i = 0;
    const len = arr.length;

    if (n === max) {
      for (i; i < len; i++) {
        if (arr[i]['active'] === true) {
          arr[i]['disabled'] = false;
        } else {
          arr[i]['disabled'] = true;
        }
      }
    } else {
      for (i; i < len; i++) {
        arr[i]['disabled'] = false;
      }
    }
  }

  refreshNumberOfActiveElements () {
    this.howManyActive = this.countActiveItems(this.initialDataObjects);
  }

  countActiveItems (array) {
    let n = 0;
    let i = 0;
    const len = array.length;

    for (i; i < len; i++) {
      if (array[i]['active'] === true) {
        n += 1;
      }
    }
    return n;
  }

  filterWidgetItems () {
    // let string = this.view.searchField.value;
    let string = this.mainController.getSearchValue();
    console.log('string ' + string);
    // let selectValue = parseInt(this.view.selectFilter.value);
    // let elementsArray = document.querySelectorAll('.widget__filter-list__item');
    //
    // elementsArray.forEach(function (element) {
    //   const elemText = element.textContent.trim();
    //   const elemNum = elemText.indexOf(string);
    //   const elId = parseInt(element.dataset.id);
    //
    //   if ((elemNum === -1) || (elId <= selectValue)) {
    //     element.classList.add('hidden-searched');
    //   } else {
    //     element.classList.remove('hidden-searched');
    //   }
    // });
  }

  setInitialData (data) {
    this.initialDataObjects = this.convertDataToObjects(data)
  }

  init () {
    this.setInitialData(this.initialData);
    this.refreshNumberOfActiveElements();
    this.mainController.renderWidgetItems(this.initialDataObjects);
  }
}
