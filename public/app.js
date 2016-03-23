(function(){
    'use strict';
    angular.module('app', [])
        .controller('LoginCtrl', ['$scope', '$http', function($scope, $http){
            var self = this;
            $http.get('/api/login').success(function(resp){
                self.loginInfo = resp;
            });
            self.login = function(user){
                $http.post('/api/login', user).then(function(data){
                    self.loginInfo = data.data;
                });
            }
            self.logout = function(){
                $http.delete('/api/login').success(function(){
                    self.loginInfo = {};
                });
            };
    }])
})();
