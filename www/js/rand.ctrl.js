app.controller('CtrlRand', [
  '$scope',
  '$http',
  '$sce',
  '$window',
  function($scope, $http, $sce, $window) {

  // Defined Variable
  $scope.question = false; // แสดงข้อความเมื่อ กดสุ่ม
  $scope.error = false; // แสดง Error
  $scope.showDialog = false;
  $scope.isAnswer = false;

  $scope.choice = [
    {name: 'วงกลม'},
    {name: 'วงรี'},
    {name: 'ไฮเปอร์โบลา'},
    {name: 'พาราโบลา'}
  ];

  var question = {};

  $scope.reset = function() {
    $window.location.reload();
  }

  $scope.RandomQuestion = function() {
    $scope.isAnswer = false;
    var num_card = parseInt($scope.num_card);

    if(num_card && num_card <= 50) {
      $scope.error = false;
      $scope.question = true;

      $http.get('data/question.json').success(function(data) {
        var title = data[num_card - 1];

        $scope.QuestTitle = $sce.trustAsHtml(title.question + '<br/> <p style="font-size:20px">สมการดังกล่าวเป็นรูปอะไร </p>');
        question.answer = title.answer;
        $scope.num_card = '';
      });
    } else {
      $scope.error = true;
      $scope.question = false;
    }
  }

  $scope.AnswerUser = function(ans) {
    $scope.isAnswer = true;
    var answer = ans.name;

    if(answer == question.answer) {
      $scope.alert = 'alert-info';
      $scope.showText = $sce.trustAsHtml('<strong>ดีใจด้วย</strong> คุณมีสิทธิ์ใช้การ์ดนี้');
    } else {
      $scope.alert = 'alert-danger';
      $scope.showText = $sce.trustAsHtml('<strong>เสียใจด้วย</strong> คุณไม่มีสิทธิ์ใช้การ์ดนี้');
    }
  }
}]);
