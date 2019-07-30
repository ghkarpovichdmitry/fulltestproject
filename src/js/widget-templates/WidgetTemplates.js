export default class WidgetTemplates {
  getListTemplate (obj, index) {
    return `<li class="widget__filter-list__item" data-id='${index + 1}' data-active='${obj['active']}' data-disabled='${obj['disabled']}' data-item_number='${index + 1}'>
      ${obj['text']}
    </li>`
  }
}
