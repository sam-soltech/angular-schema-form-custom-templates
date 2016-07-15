module Formapp.controllers {
  'use strict';

  export class AppController {



    static $inject: string[] = [
      '$scope'
    ];

    constructor(
      public $scope : ng.IScope,
      public $attrs : ng.IAttributes) {
      console.log('in side man')
    }

  }
  angular.module('formapp').controller('AppController', AppController);
}
