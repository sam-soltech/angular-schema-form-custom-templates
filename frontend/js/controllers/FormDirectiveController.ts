module Formapp.controllers {
  'use strict';

  export class DynamicFormController {

    static $inject: string[] = [
      '$scope',
      '$attrs'
    ];

    schema:any;
    form:any;
    model:any;
    persons:Array<any>

    constructor(
      public $scope : ng.IScope,
      public $attrs : ng.IAttributes) {
        this.persons = []

        this.schema = {
          "type": "object",
          "properties": {
            "persons": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "name": {
                    "type": "string",
                    "title": "Name"
                  },
                  "eligible": {
                    "type": "boolean",
                    "title": "Eligible for awesome things"
                  },
                  "code": {
                    "type":"string",
                    "title": "The Code"
                  }
                }
              }
            }
          }
        }

        this.form = [
          {
            "key": "persons",
            "items": [
              "persons[].name",
              "persons[].eligible",
              {
                key: "persons[].code",
                condition: "persons[arrayIndex].eligible", //or "model[arrayIndex].eligable"
              }
            ]
          }
        ]

      this.model = {};
    }

  }
  angular.module('formapp').controller('DynamicFormController', DynamicFormController);
}
