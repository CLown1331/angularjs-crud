(function() {
    'use strict';

    angular.module('app').controller('CompareController', CompareController);

    function CompareController($scope, $state, UserService, $q) {
        
        $scope.submitData           = submitData;
        let ctx = null;
        let canvas = null;

        (function() {
            canvas = document.getElementById('myChart');
            ctx = canvas.getContext("2d");
        })();

        function submitData() {
            $q.all([UserService.GetRatingChangeFromCF($scope.u1), UserService.GetRatingChangeFromCF($scope.u2)]).then(
                function(result) {
                    console.log(result[0]);
                    console.log(result[1]);
                    let data1 = [];
                    let data2 = [];
                    let colors1 = [];
                    let colors2 = [];
                    for (let value of result[0]) {
                        data1.push({
                            x: new Date(value.ratingUpdateTimeSeconds * 1000),
                            y: value.newRating,
                        });
                        colors1.push(UserService.GetColor(value.newRating));
                    }
                    for (let value of result[1]) {
                        data2.push({
                            x: new Date(value.ratingUpdateTimeSeconds * 1000),
                            y: value.newRating,
                        });
                        colors2.push(UserService.GetColor(value.newRating));
                    }

                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    let config = {
                        type: 'line',
                        data: {
                            datasets: [
                                {
                                    label: $scope.u1.userName,
                                    fill: false,
                                    // borderColor: '#3f51b5',
                                    borderColor: '#000000',
                                    data: data1,
                                    lineTension: 0,
                                    pointBackgroundColor: colors1,
                                    pointBorderColor: colors1,
                                },
                                {
                                    label: $scope.u2.userName,
                                    fill: false,
                                    // borderColor: 'rgba(255, 87, 34, 1)',
                                    borderColor: '#000000',
                                    data: data2,
                                    lineTension: 0,
                                    pointBackgroundColor: colors2,
                                    pointBorderColor: colors2,
                                }
                            ]
                        },
                        options: {
                            title: {
                                text: 'Codeforces Compare'
                            },
                            scales: {
                                xAxes: [{
                                    type: 'time',
                                    time: {
                                        unit: 'month',
                                    }
                                }],
                                yAxes: [{
                                    id: 'y-axis',
                                    type: 'linear',
                                    display: true,
                                    position: 'left'                                    
                                }]
                            },
                            elements: { 
                                point: {
                                    borderWidth: 7,
                                    pointStyle: 'circle',
                                }
                            }
                        }
                    };
                    let myChart = new Chart(ctx, config);
                    console.log(ctx);
                }, function() {

                }
            );
        }
    
    }

    CompareController['$inject'] = ['$scope', '$state', 'UserService', '$q'];

})();