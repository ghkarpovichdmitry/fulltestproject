// class SelectController {
//     constructor(mainController){
//         this.mainController = mainController;
//         this.init()
//     }
//
//     init(){
//         this.view = new View(this);
//         this.model = new Model(this);
//         this.onCreate();
//     }
//
//     onCreate(){
//         const initialDate = this.model.initalData;
//         this.view.render(initalData);
//     }
//
//
//     onFilterChanged(newFilterValue){
//         this.mainController.st();
//     }
// }
//
//
// class View{
//     constructor(controller){
//         this.controller = controller;
//     }
//
//     render(initalData){
//         'html'
//         this.setEvents();
//     }
//
//     onSelect(selectValue){
//         this.controller.onFilterChanged(selectValue);
//     }
// }
//
// class Model{
//     constructor(controller){
//         this.controller = controller;
//     }
//
//     get initalData(){
//         return ['>1','<10'];
//     }
// }

// class mainController{
//     constructor(){}
//     this.SelectController = new SelectController(this);
// }
