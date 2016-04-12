app.controller("CtrlCircle", [
    '$scope',
    'url',
    '$interval',
    '$window',
    'root',
    'backend',
    'sound',
    function($scope, url, $interval, $window, root, backend, sound) {

    url.geturl();

 /*******************      ซื้อที่ดิน      **************************/

    $scope.isToy = false; // ถ้ากรอก 3 ช่องครับ
    $scope.isAnswer = false; // ถ้าใส่คำตอบแล้ว
    $scope.correctAnswer = false; // ตรวจสอบคำตอบถูกหรือผิด

    $scope.buy = 0; // เก็บค่าซื้อ
    $scope.sell = 0; // เก็บค่าขาย
    $scope.choice = 1;

    $scope.answerInput = {}; // รับคำตอบจาก Keyboard
    $scope.time = 90; // count down
    var sound_round = 1;
    var timeout;
    var i = 1;

    var answer = {}; // เก็บคำตอบที่ถูกต้องไว้
    var operator = ["+", "-"];

    // choice == 2
    var answer_r = 0;

    $scope.showText = {
      'rightBussiness': backend.getCircleBussinessRight(),
      'wrongBussiness':  backend.getCircleBussinessWrong(),
      'rightFactory': backend.getCircleFactoryRight(),
      'wrongFactory': backend.getCircleFactoryWrong()
    };

    function countDown() {
        $scope.time = $scope.time - 1;
        //เสียงหมดเวลา
        sound.countdown();
        if($scope.time <= 0) {
            $interval.cancel(timeout);
            $scope.time = "เสียใจด้วยหมดเวลา";
            sound.timeout();
        }
    }

    $scope.reset = function() {
        $window.location.reload();
    }

    $scope.root = function(x) {
        $scope.showRoot = root.getRoot(x);
    }

    $scope.randQuestion = function() { // ตรวจสอบการกรอบครบ 3 ช่อง
        if($scope.red && $scope.yellow && $scope.green) {
            $scope.isToy = true;

            // สุ่ม Operator
            $scope.operator_x = operator[Math.floor(Math.random()*operator.length)];
            $scope.operator_y = operator[Math.floor(Math.random()*operator.length)];
            $scope.operator_z = operator[Math.floor(Math.random()*operator.length)]

            if($scope.choice == 1) {
                if($scope.operator_x == "+" && $scope.operator_y == "+") {
                    // if + , +
                    answer.x = -parseInt($scope.red)/2;
                    answer.y = -parseInt($scope.yellow)/2;

                } else if ($scope.operator_x == "+" && $scope.operator_y == "-") {
                    // if + , -
                    answer.x = -parseInt($scope.red)/2;
                    answer.y = parseInt($scope.yellow)/2;

                } else if ($scope.operator_x == "-" && $scope.operator_y == "+") {
                    // if - , +
                    answer.x = parseInt($scope.red)/2;
                    answer.y = -parseInt($scope.yellow)/2;

                } else {
                    // if - , -
                    answer.x = parseInt($scope.red)/2;
                    answer.y = parseInt($scope.yellow)/2;

                }
            } else if ($scope.choice == 2) { // ธุรกิจขายปลีก


                  var check_operator = -4*(parseInt($scope.green)) + (Math.pow(parseInt($scope.red),2) + Math.pow(parseInt($scope.yellow),2))/4;


                  if(check_operator > 0) {
                      $scope.operator_z = "+";
                  } else {
                      $scope.operator_z = "-";
                  }
                  console.log(answer_r);

                  if($scope.operator_z == "+") {
                      answer_r = Math.sqrt((-4*(parseInt($scope.green)) + (Math.pow(parseInt($scope.red),2) + Math.pow(parseInt($scope.yellow),2)))/4).toFixed(2);
                  } else {
                      // เติมลบ $scope.green
                      answer_r = Math.sqrt((-4*(-parseInt($scope.green)) + (Math.pow(parseInt($scope.red),2) + Math.pow(parseInt($scope.yellow),2)))/4).toFixed(2);
                  }

            } else {

                /* จุดศูนย์กลางของวงกลม */

                if($scope.operator_x == "+" && $scope.operator_y == "+") {
                    // if + , +
                    answer.x = -parseInt($scope.red)/2;
                    answer.y = -parseInt($scope.yellow)/2;

                } else if ($scope.operator_x == "+" && $scope.operator_y == "-") {
                    // if + , -
                    answer.x = -parseInt($scope.red)/2;
                    answer.y = parseInt($scope.yellow)/2;

                } else if ($scope.operator_x == "-" && $scope.operator_y == "+") {
                    // if - , +
                    answer.x = parseInt($scope.red)/2;
                    answer.y = -parseInt($scope.yellow)/2;

                } else {
                    // if - , -
                    answer.x = parseInt($scope.red)/2;
                    answer.y = parseInt($scope.yellow)/2;

                }

                 /* รัศมีของวงกลม */
                 var check_operator = -4*(parseInt($scope.green)) + (Math.pow(parseInt($scope.red),2) + Math.pow(parseInt($scope.yellow),2))/4;


                  if(check_operator > 0) {
                      $scope.operator_z = "+";
                  } else {
                      $scope.operator_z = "-";
                  }

                  if($scope.operator_z == "+") {
                      answer_r = Math.sqrt((-4*(parseInt($scope.green)) + (Math.pow(parseInt($scope.red),2) + Math.pow(parseInt($scope.yellow),2)))/4).toFixed(2);
                  } else {
                      // เติมลบ $scope.green
                      answer_r = Math.sqrt((-4*(-parseInt($scope.green)) + (Math.pow(parseInt($scope.red),2) + Math.pow(parseInt($scope.yellow),2)))/4).toFixed(2);
                  }

                  console.log(answer_r);
                  console.log(answer);
            }

            if(i == 1)
                timeout = $interval(countDown, 1000); i++;

        }
    }

    $scope.checkAnswer = function() { // คำนวณคำตอบที่รับเข้ามา
        if($scope.choice == 1) {
            if($scope.answerInput.x && $scope.answerInput.y) {
                $scope.isAnswer = true;
                $interval.cancel(timeout);

                var x = Math.abs(Math.round(answer.x));
                var y = Math.abs(Math.round(answer.y));

                if(answer.x == $scope.answerInput.x && answer.y == $scope.answerInput.y) {
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

                    // เสียงวงกลมที่ดินถูก
                    if(sound_round == 1) {
                      sound.circleLandRight();
                      sound_round = sound_round + 1;
                    }

                } else {
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

                    // เสียงผิดที่ดินวงกลม
                    if(sound_round == 1) {
                      sound.circleLandWrong();
                      sound_round = sound_round + 1;
                    }
                }
            }
        } else if ($scope.choice == 2) {
             var check_radius;
             $scope.isAnswer = true;
             $interval.cancel(timeout);

             console.log(answer_r);

             // ตรวจสอบ ว่าค่าที่รับมา เป็นทศนิยมหรือ จำนวนเต็ม ถ้าจำนวนเต็มให้เติม .00 ต่อท้าย เพื่อตรวจสอบค่า
             if($scope.answerInput.radius % 1 != 0) {
               check_radius = $scope.answerInput.radius;
             } else {
               check_radius = parseInt($scope.answerInput.radius).toFixed(2)
             }

            if(check_radius == answer_r) {
                $scope.correctAnswer = true;
                // เสียงถูกวงกลมร้านค้า
            } else {
                $scope.correctAnswer = false;
                // เสียงผิดวงกลมร้านค้า
            }
        } else {

            if($scope.answerInput.x && $scope.answerInput.y && $scope.answerInput.radius) {

                var check_radius;
                var check_point = 0; // ไว้ตรวจสอบถ้าทั้ง 2 ตอบถูกให้แสดงคำ...
                $scope.isAnswer = true;
                $interval.cancel(timeout);

                if(answer.x == $scope.answerInput.x && answer.y == $scope.answerInput.y) {
                     $scope.correctAnswer_point = true;
                     check_point = check_point + 1;

                     // แสดงข้อความถูก
                } else {
                    $scope.correctAnswer_point = false;
                }


                // ตรวจสอบ ว่าค่าที่รับมา เป็นทศนิยมหรือ จำนวนเต็ม ถ้าจำนวนเต็มให้เติม .00 ต่อท้าย เพื่อตรวจสอบค่า
                if($scope.answerInput.radius % 1 != 0) {
                    check_radius = $scope.answerInput.radius;
                } else {
                    check_radius = parseInt($scope.answerInput.radius).toFixed(2)
                }

                if(check_radius == answer_r) {
                    $scope.correctAnswer_radius = true;
                    check_point = check_point + 1;
                } else {
                    $scope.correctAnswer_radius = false;
                }

                if(check_point == 2) {
                    $scope.correctAnswer_choice3 = true;
                    // เสียงถูก
                } else {
                    $scope.correctAnswer_choice3 = false;
                    // เสียงผิด
                }

            }
        }
    }

 /*******************      จบซื้อที่ดิน      **************************/

}]);
