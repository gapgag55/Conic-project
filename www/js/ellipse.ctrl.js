app.controller('CtrlEllipse', [
  'root',
  'url',
  '$window',
  '$scope',
  '$location',
  '$interval',
  'backend',
  function(root, url, $window, $scope, $location, $interval, backend) {


    $scope.isToy = false; // ถ้ากรอก 3 ช่องครับ
    $scope.isAnswer = false; // ถ้าใส่คำตอบแล้ว
    $scope.correctAnswer = false; // ตรวจสอบคำตอบถูกหรือผิด

    $scope.choice = 1;
    $scope.time = 90;
    $scope.answerInput = {};
    var answer = {};
    var operator = ["+", "-"]
    var timeout;
    var i = 1;

    $scope.showText = {
      'rightBussiness': backend.getEllipseBussinessRight(),
      'wrongBussiness':  backend.getEllipseBussinessWrong(),
      'rightFactory': backend.getEllipseFactoryRight(),
      'wrongFactory': backend.getEllipseFactoryWrong()
    };

    /* Fixed starter */

    url.geturl();

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


    /* ซื้อที่ดิน */

    $scope.randQuestion = function() { // ตรวจสอบการกรอบครบ 3 ช่อง
      if ($scope.red && $scope.yellow && $scope.green) {
        $scope.isToy = true;

        // สุ่ม Operator
        $scope.operator_x = operator[Math.floor(Math.random() * operator.length)];
        $scope.operator_y = operator[Math.floor(Math.random() * operator.length)];

        // เพิ่มเงื่อนไข -8c+2a^2+b >= 0 เป็น + น้อยกว่าเป็น -
        $scope.operator_z = operator[Math.floor(Math.random() * operator.length)];

        if ($scope.choice == 1) {
          var check_operator = (-8 * $scope.green) + (2 * Math.pow($scope.red, 2)) + $scope.yellow;


           if(check_operator > 0) {
               $scope.operator_z = "+";
           } else {
               $scope.operator_z = "-";
           }


          if ($scope.operator_x == "+" && $scope.operator_y == "+") {
            // if + , +
            answer.x = -parseInt($scope.red) / 2;
            answer.y = -parseInt($scope.yellow) / 4;

          } else if ($scope.operator_x == "+" && $scope.operator_y == "-") {
            // if + , -
            answer.x = -parseInt($scope.red) / 2;
            answer.y = parseInt($scope.yellow) / 4;

          } else if ($scope.operator_x == "-" && $scope.operator_y == "+") {
            // if - , +
            answer.x = parseInt($scope.red) / 2;
            answer.y = -parseInt($scope.yellow) / 4;

          } else {
            // if - , -
            answer.x = parseInt($scope.red) / 2;
            answer.y = parseInt($scope.yellow) / 4;

          }
          console.log(answer);

        }
        else if ($scope.choice == 2) {
          answer.a = Math.sqrt((parseInt($scope.green)/parseInt($scope.red))).toFixed(2);
          answer.b = Math.sqrt((parseInt($scope.green)/parseInt($scope.yellow))).toFixed(2);

          if(answer.a >= answer.b) {
            answer.max = answer.a;
            answer.min = answer.b;
          } else {
            answer.max = answer.b;
            answer.min = answer.a;
          }
        }
        else {
            answer.z = Math.sqrt(Math.abs((parseInt($scope.green)/parseInt($scope.red)) - (parseInt($scope.green)/parseInt($scope.yellow)))).toFixed(2);
            console.log(answer.z);
        }

        if (i == 1)
          timeout = $interval(countDown, 1000);
        i++;

      }
    }

    $scope.checkAnswer = function() {

      if($scope.choice == 1) {
        if ($scope.answerInput.x && $scope.answerInput.y) {
          $scope.isAnswer = true;
          $interval.cancel(timeout);

          var x = Math.abs(Math.round(answer.x));
          var y = Math.abs(Math.round(answer.y));

          if (answer.x == $scope.answerInput.x && answer.y == $scope.answerInput.y) {
            $scope.correctAnswer = true;

            if (x > y) {
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
            $scope.correctAnswer = false;

            if (x >= y) {
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

        if($scope.answerInput.x % 1 == 0) {
          var answerInput_x = parseInt($scope.answerInput.x).toFixed(2);
        } else {
          var answerInput_x = $scope.answerInput.x;
        }
        if($scope.answerInput.y % 1 == 0) {
          var answerInput_y = parseInt($scope.answerInput.y).toFixed(2);
        } else {
          var answerInput_y = $scope.answerInput.y;
        }

        if(answerInput_x) {
          if(answerInput_x == answer.max) {
            $scope.correctAnswer_a = true;
            $scope.isAnswer_a = true;
          } else {
            $scope.isAnswer_a = true;
            $scope.correctAnswer_a = false;
          }
        }

        if(answerInput_y) {
          if(answerInput_y == answer.min) {
            $scope.isAnswer_b = true;
            $scope.correctAnswer_b = true;
          } else {
            $scope.isAnswer_b = true;
            $scope.correctAnswer_b = false;
          }
        }

        if(answerInput_x == answer.max && answerInput_y == answer.min) {
          $scope.isAnswer = true;
          $interval.cancel(timeout);

          $scope.correctAnswer = true;
        } else {
          $scope.isAnswer = true;
          $scope.correctAnswer = false;

          $interval.cancel(timeout);
        }
      }
      else {
        if($scope.answerInput.z) {
          $scope.isAnswer = true;
          $interval.cancel(timeout);
          var ans = 0;

          if($scope.answerInput.z % 1 == 0) {
            ans = parseInt($scope.answerInput.z).toFixed(2);
          } else {
            ans = $scope.answerInput.z;
          }
          console.log(ans);

          if(ans == answer.z) {
            $scope.correctAnswer = true;
          } else {
            $scope.correctAnswer = false;
          }
        }
      }
    }

  }
]);
