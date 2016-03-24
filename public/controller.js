(function(){
    'use strict';
    angular.module('app')
        .controller('page1Ctrl', function($scope){
            $scope.title = 'Page 1';
        })
        .controller('page2Ctrl', function($scope){
            $scope.title = 'Page 2';
        })
        .controller('LoginCtrl', ['$scope', '$http','$location', function(scope, $http, $location){
            $http.get('/api/login').success(function(resp){
                scope.loginInfo = resp;
            });
            scope.logout = function(){
                $http.delete('/api/login').success(function(){
                    scope.loginInfo = {};
                });
            };
            scope.onLogin = function(info){
                scope.loginInfo = info;
            };
            scope.isActive = function(hash){
                if(hash == '#'+$location.path()){
                    return 'active';
                }
                return '';
            }
        }])
})();
