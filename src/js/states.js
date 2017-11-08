'use strict';

routes.$inject = ['$stateProvider','$urlRouterProvider'];

export default function routes($stateProvider, $urlRouterProvider){
    $urlRouterProvider
        .otherwise('/home');

    $stateProvider.state('home', {
        url: '/home',
        templateUrl: 'templates/home.html'
    });
}

module.exports = routes;
