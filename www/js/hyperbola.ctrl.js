app.controller('CtrlHyperbola', [
  '$scope',
  'url',
  'root',
  '$window',
  '$interval',
  'backend',
  function($scope, url, root, $window, $interval, backend) {

    url.geturl();

    $scope.isToy = false; // ถ้ากรอก 3 ช่องครับ
    $scope.isAnswer = false; // ถ้าใส่คำตอบแล้ว
    $scope.correctAnswer = false; // ตรวจสอบคำตอบถูกหรือผิด

    $scope.choice = 1;
    $scope.time = 90;
    $scope.answerInput = {};
    var answer = {};
    var operator = ["+", "-"];
    var timeout;
    var i = 1;

    $scope.showText = {
      'rightBussiness': backend.getCircleBussinessRight(),
      'wrongBussiness':  backend.getCircleBussinessWrong(),
      'rightFactory': backend.getCircleFactoryRight(),
      'wrongFactory': backend.getCircleFactoryWrong()
    };

    /* Fixed starter */

    function countDown() {
      $scope.time = $scope.time - 1;
      if ($scope.time <= 0) {
        $interval.cancel(timeout);
        $scope.time = "เสียใจด้วยหมดเวลา";
      }
    }

    $scope.root = function(x) {
      $scope.showRoot = root.getRoot(x);
    }

    $scope.reset = function() {
      $window.location.reload();
    }

    $scope.randQuestion = function() {
      if ($scope.red && $scope.yellow && $scope.green) {
        $scope.isToy = true;

        if ($scope.choice == 1) {
          var operator = ['+', '-'];

          var check_operator = (2*Math.pow(parseInt($scope.red),2)) + Math.pow(parseInt($scope.yellow),2) - (8*parseInt($scope.green));

          if(check_operator > 0) {
            $scope.operator_z = "+";
          } else {
            $scope.operator_z = "-";
          }

          $scope.operator_x = operator[Math.floor(Math.random()*operator.length)];
          $scope.operator_y = operator[Math.floor(Math.random()*operator.length)];

          if($scope.operator_x == "-") {
            answer.x = -1 * -parseInt($scope.red)/2;
          } else {
            answer.x = -parseInt($scope.red)/2;
          }

          if($scope.operator_y == "-") {
            answer.y = -parseInt($scope.yellow)/4;
          } else {
            answer.y = parseInt($scope.yellow)/4;
          }
          console.log(answer);
        } else if($scope.choice == 2) {

          var operator = ['+', '-'];
          $scope.operator_z = operator[Math.floor(Math.random()*operator.length)];
          var c = parseInt($scope.operator_z + $scope.green);

          var green = parseInt($scope.green);
          var red = parseInt($scope.red);
          var yellow = parseInt($scope.yellow);

          console.log(c);
          if(c < 0) {
            answer.x = Math.sqrt(green/red).toFixed(2);
            answer.y = Math.sqrt(green/yellow).toFixed(2);
          } else {
            answer.x = Math.sqrt(green/yellow).toFixed(2);
            answer.y = Math.sqrt(green/red).toFixed(2);
          }
          console.log(answer);
        } else {
          answer.z = Math.sqrt(Math.abs((parseInt($scope.green)/parseInt($scope.red)) + (parseInt($scope.green)/parseInt($scope.yellow)))).toFixed(2);
        }

        if (i == 1)
          timeout = $interval(countDown, 1000);
        i++;
      }
    }

    $scope.checkAnswer = function() {
      if($scope.choice == 1) {
        if($scope.answerInput.h && $scope.answerInput.k) {
          $interval.cancel(timeout);

          var x = Math.abs(Math.round(answer.x));
          var y = Math.abs(Math.round(answer.y));

          if($scope.answerInput.h == answer.x && $scope.answerInput.k == answer.y) {
            $scope.isAnswer = true;
            $scope.correctAnswer = true;

            if(x > y) {
              if (x == 0) {
                x = x + 1;
              }
              if (y == 0) {
                y = y + 1;
              }

              $scope.buy = y;
              $scope.sell = x;
            } else {
              if (x == 0) {
                x = x + 1;
              }
              if (y == 0) {
                y = y + 1;
              }
              
              $scope.buy = x;
              $scope.sell = y;
            }
          } else {
            if($scope.answerInput.h && $scope.answerInput.k) {
              $scope.isAnswer = true;
            }
            $scope.correctAnswer = false;

            if(x > y) {
              if (x == 0) {
                x = x + 1;
              }
              if (y == 0) {
                y = y + 1;
              }

              $scope.buy = x;
              $scope.sell = y;
            } else {
              if (x == 0) {
                x = x + 1;
              }
              if (y == 0) {
                y = y + 1;
              }

              $scope.buy = y;
              $scope.sell = x;
            }
          }
        }
      } else if($scope.choice == 2) {
        var ansX, ansY;

        if($scope.answerInput.x % 1 == 0) {
          ansX = parseInt($scope.answerInput.x).toFixed(2);
        } else {
          ansX = $scope.answerInput.x;
        }

        if($scope.answerInput.y % 1 == 0) {
          ansY = parseInt($scope.answerInput.y).toFixed(2);
        } else {
          ansY = $scope.answerInput.y;
        }

        if(ansX == answer.x) {
          $scope.isAnswer_a = true;
          $scope.correctAnswer_a = true;
        } else {
          if(ansX != undefined) {
            $scope.isAnswer_a = true;
          }
          $scope.correctAnswer_a = false;
        }
        console.log(answer);
        if(ansY == answer.y) {
          $scope.isAnswer_b = true;
          $scope.correctAnswer_b = true;
        } else {
          if(ansY != undefined) {
            $scope.isAnswer_b = true;
          }
          $scope.correctAnswer_b = false;
        }

        if(ansX == answer.x && ansY == answer.y) {
          $scope.isAnswer = true;
          $scope.correctAnswer = true;
        } else {
          if(ansY != undefined)
            $scope.isAnswer = true;
          $scope.correctAnswer = false;
        }
      } else {
        if ($scope.answerInput.z) {
          $scope.isAnswer = true;
          $interval.cancel(timeout);
          var ans = 0;

          if($scope.answerInput.z % 1 == 0) {
            ans = parseInt($scope.answerInput.z).toFixed(2);
          } else {
            ans = $scope.answerInput.z;
          }

          if(ans == answer.z) {
            $scope.correctAnswer = true;
          } else {
            $scope.correctAnswer = false;
          }
        }
      }
    }

}]);
