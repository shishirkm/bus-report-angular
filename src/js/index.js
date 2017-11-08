'use strict';

var app = angular.module('angulartest',['ui.router', 'ui.bootstrap']); //jshint ignore:line

import appController from './controllers/app-controller';
import httpService from './services/http-service';
import stateProvider from './states';

app.config(stateProvider)
    .controller('appController',appController)
    .service('httpService',httpService);