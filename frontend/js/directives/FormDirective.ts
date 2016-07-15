module Formapp.directives {
  'use strict';

  export class dynamicForm implements ng.IDirective
  {
    public restrict: string = "E";
    public templateUrl: string = "./form-templates/base.html";
    public controller: string = "DynamicFormController";
    public controllerAs = "ctlr";
    public bindToController: boolean = true;
    public scope = {
      source: '=',
    }

    constructor(){}

  };

  angular.module('formapp').directive('dynamicForm', () => new dynamicForm());
}
