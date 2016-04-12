app.controller('CtrlTax', [
  '$scope',
  function($scope) {
    var amount = 0;

    $scope.calculate = function() {

      if($scope.amount != undefined && $scope.amount >= 0) {
        var seven = parseInt($scope.amount * 7/100);

        var a = seven % 10;
        var b = 10 - a;
        amount = seven + b;

        $scope.money = 'เสียภาษีจำนวน: ' + amount.toLocaleString() + ' บาท';
      } else {
        $scope.money = 'กรุณากรอกจำนวนเงิน';
      }
    }

}]);
