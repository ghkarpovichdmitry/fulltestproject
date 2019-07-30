class Controller {
  constructor (Model, View) {
    this.containerWidget = null;
    this.model = Model;
    this.view = View;
  }

  convertDataArrayToObjectsArray (initialData) {
    const arr = initialData.map((item, index) => ({
      id: ++index,
      text: item,
      active: false,
      disabled: false
    }));

    return arr;
  }

  clearSearchAndSelectFields () {
    this.view.searchField.value = '';
    this.view.selectFilter.value = '';
  }

  convertDataToListElements (initialData) {
    return initialData.map((item, index) => (
      `<li class="widget__filter-list__item" data-id='${index + 1}' data-active='${item['active']}' data-disabled='${item['disabled']}' data-item_number='${index + 1}'>
        <span>${item['text']}</span>
      </li>`
    ));
  }

  fillDomElementFromArray (array, domElement) {
    domElement.innerHTML = array.join('');
  }

  countActiveItems (array) {
    let n = 0,
      i = 0,
      len = array.length;

    for (i; i < len; i++) {
      if (array[i]['active'] === true) {
        n = n + 1;
      }
    }
    return n;
  }

  refreshNumberOfActiveElements () {
    this.model.howManyActive = this.countActiveItems(this.model.arrayOfObjects);
  }

  addActivationPossibility (e) {
    let targ = e.target,
      itemID = null;

    if (targ.closest('li')) {
      itemID = targ.closest('li').dataset.id;
    } else { return false; }

    const index = itemID - 1,
      arr = this.model.arrayOfObjects, // передавать не напрямую а как агрумент сложно
      isActive = arr[index]['active'],
      n = this.model.howManyActive,
      max = this.model.maxActiveElements;

    if (isActive) {
      arr[index]['active'] = false;
    } else {
      if (n < max) {
        arr[index]['active'] = true;
      } else {
        console.log('can not select items');
        return false; // or through error ?
      }
    }

    this.refreshNumberOfActiveElements();
  }

  createCopies (arr) {
    const self = this,
      activated = this.getAcivatedItemsArray(arr), // or all in one line
      renderedArray = this.renderCopiesForFooter(activated);
    this.fillDomElementFromArray(renderedArray, this.view.containerSelectedItems);
    this.addAbilityToDeleteSelected(arr, self);
  }

  addAbilityToDeleteSelected (arr, el) {
    const array = document.querySelectorAll('.widget__footer-selected-items .widget__remove-item'),
      self = el;

    array.forEach(function (element) {
      element.addEventListener('click', function () {
        const parent = element.closest('li'),
          id = parent.dataset.id,
          listEl = document.querySelector(`[data-id='${id}']`),
          index = id - 1;

        listEl.dataset.active = 'false';
        parent.remove();
        arr[index]['active'] = false;
        parent.dataset.active = false;
        self.undisableElements(); // how to make faster ?
        self.refreshNumberOfActiveElements();
      });
    });
  }

  undisableElements () {
    const arr = document.querySelectorAll('.widget__filter-list__item');
    arr.forEach(function (element) {
      element.dataset.disabled = false;
    });
  }

  getAcivatedItemsArray (arr) {
    let a = [];

    arr.forEach(function (element) {
      if (element['active'] === true) {
        a.push(element)
      }
    });

    return a;
  }

  renderCopiesForFooter (arr) {
    return arr.map((item) => (
      `<li data-id='${item['id']}'><span class='widget__item-name'>${item['text']}</span><span class='widget__remove-item'></span></li>`
    ));
  }

  disableActivation () {
    let n = this.model.howManyActive,
      arr = this.model.arrayOfObjects,
      max = this.model.maxActiveElements,
      i = 0,
      len = arr.length;

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
        // console.log('make all undisabled'); // ***
        arr[i]['disabled'] = false;
      }
    }

    this.renderListItems();
  }

  renderListItems () {
    const arr = this.convertDataToListElements(this.model.arrayOfObjects); // need to fix this line ?
    this.fillDomElementFromArray(arr, this.view.containerWidgetItems);
  }

  addToSavedItems (arr) {
    const len = document.querySelectorAll('#widget__footer-selected-items li').length;
    if (len) {
      const activated = this.getAcivatedItemsArray(arr), // or all in one line
        renderedArray = this.createCopiesToHead(activated),
        containerSavedList = this.view.containerSavedList;
      this.fillDomElementFromArray(renderedArray, containerSavedList);
    }
  }

  createCopiesToHead (arr) {
    return arr.map((item) => (
      `<li data-id='item-${item['id']}'><span class='widget__item-name'>${item['text']}</span><span class='widget__remove-item'></span></li>`
    ));
  }

  cancelSelection (arr) {
    this.view.containerSelectedItems.innerHTML = '';
    this.setInitialData();
    this.renderListItems()
    this.clearSearchAndSelectFields();
    this.model.howManyActive = null;
  }

  resetArrayOfObjects (arr) {
    arr.map((item, index) => ({
      active: false,
      disabled: false
    }));

    return arr;
  }

  setInitialData () {
    this.model.arrayOfObjects = this.convertDataArrayToObjectsArray(this.model.initialData);
  }

  setupInitialData () {
    this.setInitialData();
    this.refreshNumberOfActiveElements();
    this.renderListItems();
  }

  filterItems () {
    let string = this.view.searchField.value,
      selectValue = parseInt(this.view.selectFilter.value),
      elementsArray = document.querySelectorAll('.widget__filter-list__item');

    elementsArray.forEach(function (element) {
      const elemText = element.textContent.trim(),
        elemNum = elemText.indexOf(string),
        elId = parseInt(element.dataset.id);

      if ((elemNum === -1) || (elId <= selectValue)) {
        element.classList.add('hidden-searched');
      } else {
        element.classList.remove('hidden-searched');
      }
    });
  }

  registerEvents () {
    this.clearSearchAndSelectFields();
    // this.view.buttonChangeChoiсe.addEventListener('click', this.changeChoice); // where to place? this or next line variant
    this.view.buttonChangeChoiсe.addEventListener('click', (e) => { this.view.changeChoice(e) });
    this.view.containerWidgetItems.addEventListener('click', (e) => { this.addActivationPossibility(e) });
    this.view.containerWidgetItems.addEventListener('click', (e) => { this.createCopies(this.model.arrayOfObjects) });
    // this.refreshNumberOfActiveElements();
    this.view.containerWidgetItems.addEventListener('click', (e) => { this.disableActivation(e) });
    this.view.buttonSaveChoiсe.addEventListener('click', (e) => { this.addToSavedItems(this.model.arrayOfObjects) });
    this.view.buttonCancelChoiсe.addEventListener('click', (e) => { this.cancelSelection(this.model.arrayOfObjects) });
    this.view.searchField.addEventListener('input', this.filterItems.bind(this));
    this.view.selectFilter.addEventListener('change', this.filterItems.bind(this));
    // this.view.containerWidgetItems.addEventListener('click', this.checkActivationPosibility.bind(this));
    // this.view.containerWidgetItems.addEventListener('click', this.saveClickedNumber.bind(this));
    // this.view.containerWidgetItems.addEventListener('click', (e) => { this.handleClick(e) });
    // this.view.containerWidgetItems.addEventListener('click', this.disableActivation.bind(this));
  }

  init () {
    this.setupInitialData();
    this.registerEvents();
  }
}

export default Controller;

// saveClickedNumber (e) {
//   this.model.clickedNumber = e.target.closest('li').dataset.id;
// }

// handleClick (e) {
//   this.refreshNumberOfActiveElements(); // maybe not needed

//   let active = this.checkIsElActive(),
//     i = this.model.clickedNumber - 1,
//     n = this.model.howManyActive,
//     max = this.model.maxActiveElements;

//   if (active === 'true') {
//     this.model.arrayOfObjects[i]['active'] = 'false';
//   } else {
//     if (n === max) {
//       console.log('can not select items');
//     } else if (n < max) {
//       this.model.arrayOfObjects[i]['active'] = 'true';
//     }
//   }

//   this.refreshNumberOfActiveElements();
//   this.showHowManyActive();
//   this.renderListItems();
// }

// lockItems (array) {
//   console.log('---lockItems---');

//   let i = 0,
//     len = array.length;

//   // debugger;
//   console.log('1');

//   for (i; i < len; i++) {
//     // debugger;
//     console.log(array[i]['active']);
//     // if (array[i]['active'] === 'false') {

//     //   console.log('*** unactive' + i)
//     //   array[i]['disabled'] = 'true';
//     // }
//     // array[i]['disabled'] = 'true';
//   }
//   console.log(array);
//   // return array;
// }

// checkActivationPosibility () {
//   let n = this.model.howManyActive,
//     max = this.model.maxActiveElements;
//   // console.log('checkActivationPosibility n ' + n);
//   // console.log('checkActivationPosibility max ' + max);

//   if (n < max) {
//     // console.log(true);
//     // let i = is
//     // this.toggleActive(a);
//   } else if (n === max) {
//     // console.log(false);
//   } else {
//     console.log('error');
//   }
// }

// console.log('* elemText === ' + elemText);

// console.log('elId === ' + elId);
// console.log('selectValue value = ' + selectValue)

// if (elemNum === -1) {
//   element.classList.add('hidden-searched');
// } else {
//   element.classList.remove('hidden-searched');
// }

// if (elId > selectValue) {
//   console.log('elId > selectValue');
//   element.classList.remove('hidden-searched');
// } else if (elId <= selectValue) {
//   console.log('elId <= selectValue');
//   element.classList.add('hidden-searched');
// } else {
//   console.log('***');
// }

// if (n === max) {
//   console.log('can not select items');
//   return false; // or through error ?
// } else if (n < max) {
//   arr[index]['active'] = true;
// } else {
//   console.log('can understand');
//   return false; // or through error ?
// }
