export default class WidgetModel {
  constructor (controller, data) {
    this.mainController = controller;
    this.initialData = data;
    this.maxActiveElements = 3;
    this.initialDataObjects = [];
    this.howManyActive = null;
  }

  convertDataToObjects (data) {
    const arrayOfObjects = data.map((item, index) => ({
      id: ++index,
      text: item,
      active: false,
      disabled: false
    }));
    return arrayOfObjects;
  }

  // getActivatedItemsArray (array) {
  //   let activeItems = [];
  //
  //   array.forEach(function (element) {
  //     if (element['active'] === true) {
  //       activeItems.push(element)
  //     }
  //   });
  //   return activeItems;
  // }

  // addItemsActivationPossibility (e) {
  //   const elem = e.target;
  //   const tag = 'LI';
  //   let itemID = null;
  //
  //   if (elem.tagName === tag) {
  //     itemID = elem.dataset.id;
  //   } else { return false; }
  //
  //   let index = itemID - 1;
  //   const arr = this.initialDataObjects;
  //   const isActive = arr[index]['active'];
  //   const n = this.howManyActive;
  //   const max = this.maxActiveElements;
  //
  //   if (isActive) {
  //     arr[index]['active'] = false;
  //   } else {
  //     if (n < max) {
  //       arr[index]['active'] = true;
  //     } else {
  //       console.log('can not select items');
  //       return false; // or through error ?
  //     }
  //   }
  //   this.refreshNumberOfActiveElements();
  // }

  // disableItemsActivationPossibility () {
  //   const n = this.howManyActive;
  //   const arr = this.initialDataObjects;
  //   const max = this.maxActiveElements;
  //   let i = 0;
  //   const len = arr.length;
  //
  //   if (n === max) {
  //     for (i; i < len; i++) {
  //       if (arr[i]['active'] === true) {
  //         arr[i]['disabled'] = false;
  //       } else {
  //         arr[i]['disabled'] = true;
  //       }
  //     }
  //   } else {
  //     for (i; i < len; i++) {
  //       arr[i]['disabled'] = false;
  //     }
  //   }
  // }

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

  // filterWidgetItems () {
  //   let string = this.mainController.getSearchValue();
  //   console.log('string ' + string);
  // }

  setInitialData (data) { // +
    this.initialDataObjects = this.convertDataToObjects(data);
  }

  init () {
    this.setInitialData(this.initialData);
    // this.mainController.renderWidgetList();
    this.refreshNumberOfActiveElements();
  }
}
