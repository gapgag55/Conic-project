var app = angular.module('myApp', ['ui.router', 'ngStorage']);

app.config(function($stateProvider, $urlRouterProvider) {
   $stateProvider
    .state('circle', {
        url: '/circle/:id?',
        templateUrl: 'templates/circle.html',
        controller: 'CtrlCircle'
    })
    .state('ellipse', {
        url: '/ellipse/:id2?',
        templateUrl: 'templates/ellipse.html',
        controller: 'CtrlEllipse'
    })
    .state('parabola', {
        url: '/parabola/:id3?',
        templateUrl: 'templates/parabola.html',
        controller: 'CtrlParabola'
    })
    .state('hyperbola', {
        url: '/hyperbola/:id4?',
        templateUrl: 'templates/hyperbola.html',
        controller: 'CtrlHyperbola'
    })
    .state('tax', {
        url: '/tax',
        templateUrl: 'templates/tax.html',
        controller: 'CtrlTax'
    })
    .state('rand', {
        url: '/rand',
        templateUrl: 'templates/rand.html',
        controller: 'CtrlRand'
    });

    $urlRouterProvider.otherwise('/circle/');
});
