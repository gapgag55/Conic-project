app.factory('url', ['$location', '$rootScope', function($location, $rootScope) {

    return {
        geturl: function() {
            var url = $location.path();

            $rootScope.circle = false;
            $rootScope.ellipse = false;
            $rootScope.parabola = false;
            $rootScope.hyperbola = false;

            if(url == "/circle/") {
                return $rootScope.circle = true;
            } else if(url == "/ellipse/") {
                return $rootScope.ellipse = true;
            } else if(url == "/parabola/") {
                return $rootScope.parabola = true;
            } else {
                return $rootScope.hyperbola = true;
            }
        }
    }

}]);
