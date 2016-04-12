app.controller('CtrlBackend', [
  '$scope',
  'backend',
  function($scope, backend) {

    // วงกลม
    $scope.right_circle_bussiness = backend.getCircleBussinessRight();
    $scope.wrong_circle_bussiness = backend.getCircleBussinessWrong();
    $scope.right_circle_factory = backend.getCircleFactoryRight();
    $scope.wrong_circle_factory = backend.getCircleFactoryWrong();

    // วงรี
    $scope.right_ellipse_bussiness = backend.getEllipseBussinessRight();
    $scope.wrong_ellipse_bussiness = backend.getEllipseBussinessWrong();
    $scope.right_ellipse_factory = backend.getEllipseFactoryRight();
    $scope.wrong_ellipse_factory = backend.getEllipseFactoryWrong();

    // ไฮเปอร์
    $scope.right_hyperbola_bussiness = backend.getHyperBolaBussinessRight();
    $scope.wrong_hyperbola_bussiness = backend.getHyperBolaBussinessWrong();
    $scope.right_hyperbola_factory = backend.getHyperBolaFactoryRight();
    $scope.wrong_hyperbola_factory = backend.getHyperBolaFactoryWrong();

    // พาราโบลา
    $scope.right_parabola_bussiness = backend.getParaBolaBussinessRight();
    $scope.wrong_parabola_bussiness = backend.getParaBolaBussinessWrong();
    $scope.right_parabola_factory = backend.getParaBolaFactoryRight();
    $scope.wrong_parabola_factory = backend.getParaBolaFactoryWrong();


}]);
