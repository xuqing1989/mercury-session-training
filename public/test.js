(function(){
    angular.module('test',[])
        .controller('ctrl', function($scope) {
        })
        .directive('myDir',function(){
            return {
                template: '<input ng-model="info">',
                scope: {
                    info:'<'
                },
                controller:function(){
                },
            }
        });
    angular.module('test1',[])
        .controller('tempctr', function() {
            console.log(123);
        })
        .directive('youDir',function(){
            return {
                template: '<input ng-model="info1">',
                scope: {
                    info1:'<'
                },
                controller:function(){
                },
            }
        });
    angular.element(document).ready(function() {
      angular.bootstrap(document, ['test','test1']);
    });
})();
