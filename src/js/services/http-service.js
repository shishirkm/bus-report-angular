'use strict';

httpService.$inject = ['$http','$q'];

export default function httpService($http,$q){

    var httpServiceObj = {};

    httpServiceObj.getResults = function (url) {
        var deferred = $q.defer();

        $http({
            method: 'GET',
            url: url
        }).then(function successCallback(response) {
            deferred.resolve(response.data);
        }, function errorCallback(response) {
            deferred.reject(response);
        });

        return deferred.promise;
    };

    return httpServiceObj;
}

module.exports = httpService;
