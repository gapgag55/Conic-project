app.controller('CtrlParabola', [
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
    $scope.items = ["หงาย", "คว่ำ"];
    var suprine; // ตัวแปรเชคหงายคว่ำ
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

        // Random
        var operator_x, operator_y, operator_z;
        operator_x = $scope.operator_x = operator[Math.floor(Math.random()*operator.length)];
        operator_y = $scope.operator_y = operator[Math.floor(Math.random()*operator.length)];
        operator_z = $scope.operator_z = operator[Math.floor(Math.random()*operator.length)];

        // Defind
        var red, yellow, green;
        if(operator_x == '-') {
          red = -parseInt($scope.red);
        } else {
          red = parseInt($scope.red);
        }
        if(operator_y == '-') {
          yellow = -parseInt($scope.yellow);
        } else {
          yellow = parseInt($scope.yellow);
        }
        if(operator_z == '-') {
          green = -parseInt($scope.green);
        } else {
          green = parseInt($scope.green);
        }

        // Defind cal
        var ne_a, ne_b, bigA, bigB, b_four, a_four, directic_cal;
        ne_a = (-red/2);
        ne_b = -yellow/2;
        bigA = (Math.pow(red,2) - 4*green) / (4*yellow);
        bigB = (Math.pow(yellow,2) - 4*green) / (4*red);
        b_four = yellow/4;
        a_four = red/4;
        directic_cal = (Math.pow(red,2) - 4*green + Math.pow(yellow,2)) / (4*yellow);

        if ($scope.choice == 1) {

            if(operator_x == '-') {
              answer.h = -1 * -red/2;
            } else {
              answer.h = -red/2;
            }
            answer.k = bigA;

        }
        else if($scope.choice == 2) {
            answer.x = -b_four;
            if(-b_four > 0) {
              suprine = "หงาย";
            } else {
              suprine = "คว่ำ";
            }
            console.log(answer.x + " " + suprine);
        }
        else {
          answer.directic = directic_cal;
        }

        if (i == 1)
          timeout = $interval(countDown, 1000);
        i++;
      }
    }

    $scope.checkAnswer = function() {
      var h,k,ansX,ansY, SupineOrProne;
      h = $scope.answerInput.h;
      k = $scope.answerInput.k;

      ansX = $scope.answerInput.x;
      SupineOrProne = $scope.answerInput.y;

      directic = $scope.answerInput.directic;

      var x = Math.abs(Math.round(answer.h));
      var y = Math.abs(Math.round(answer.k));

      if($scope.choice == 1) {
        if(h != undefined && k != undefined) {
          $interval.cancel(timeout);

          if(h == answer.h && k == answer.k) {
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
            $scope.isAnswer = true;
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
      }
      else if($scope.choice == 2) {
        if(ansX != undefined && SupineOrProne != null) {
          $interval.cancel(timeout);

          if(ansX == answer.x && SupineOrProne == suprine) {
            $scope.isAnswer = true;
            $scope.correctAnswer = true;
          } else {
            $scope.isAnswer = true;
            $scope.correctAnswer = false;
          }
        }
      } else {
        if(directic) {
          $interval.cancel(timeout);
          console.log(answer);

          if(directic == answer.directic) {
            $scope.isAnswer = true;
            $scope.correctAnswer = true;
          } else {
            $scope.isAnswer = true;
            $scope.correctAnswer = false;
          }
        }
      }
    }
}]);
