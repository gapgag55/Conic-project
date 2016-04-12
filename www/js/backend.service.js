app.factory('backend', [
  '$localStorage',
  function($localStorage) {

    return {
      // กำหนดข้อความถูก วงกลมธุรกิจขายปลีก
      getCircleBussinessRight: function() {
        return 'วงกลมธุรกิจถูก';
      },
      // กำหนดข้อความผิด วงกลมธุรกิจขายปลีก
      getCircleBussinessWrong: function() {
        return 'วงกลมธุรกิจผิด';
      },
      // กำหนดข้อความถูก วงกลมโรงงาน
      getCircleFactoryRight: function() {
        return 'วงกลมโรงงานถูก';
      },
      // กำหนดข้อความผิด วงกลมโรงงาน
      getCircleFactoryWrong: function() {
        return 'วงกลมโรงงานผิด';
      },


      // กำหนดข้อความถูก วงรีธุรกิจขายปลีก
      getEllipseBussinessRight: function() {
        return 'วงรีธุรกิจถูก';
      },
      // กำหนดข้อความผิด วงรีธุรกิจขายปลีก
      getEllipseBussinessWrong: function() {
        return 'วงรีธุรกิจผิด';
      },
      // กำหนดข้อความถูก วงกลมโรงงาน
      getEllipseFactoryRight: function() {
        return 'โรงงานวงรีถูก';
      },
      // กำหนดข้อความผิด วงกลมโรงงาน
      getEllipseFactoryWrong: function() {
        return 'โรงงานวงรีผิด';
      },


      // กำหนดข้อความถูก ไฮเปอร์โบลาธุรกิจขายปลีก
      getHyperBolaBussinessRight: function() {
        return 'ไฮเปอร์ธุรกิจถูก';
      },
      // กำหนดข้อความผิด ไฮเปอร์โบลาีธุรกิจขายปลีก
      getHyperBolaBussinessWrong: function() {
        return 'ไฮเปอร์ธุรกิจผิด';
      },
      // กำหนดข้อความถูก ไฮเปอร์โบลาโรงงาน
      getHyperBolaFactoryRight: function() {
        return 'ไฮเปอร์โรงงานถูก';
      },
      // กำหนดข้อความผิด ไฮเปอร์โบลาโรงงาน
      getHyperBolaFactoryWrong: function() {
        return 'ไฮเปอร์โรงงานผิด';
      },


      // กำหนดข้อความถูก ไฮเปอร์โบลาธุรกิจขายปลีก
      getParaBolaBussinessRight: function() {
        return 'พาราธุรกิจถูก';
      },
      // กำหนดข้อความผิด ไฮเปอร์โบลาีธุรกิจขายปลีก
      getParaBolaBussinessWrong: function() {
        return 'พาราธุรกิจผิด';
      },
      // กำหนดข้อความถูก ไฮเปอร์โบลาโรงงาน
      getParaBolaFactoryRight: function() {
        return 'พาราโรงงานถูก';
      },
      // กำหนดข้อความผิด ไฮเปอร์โบลาโรงงาน
      getParaBolaFactoryWrong: function() {
        return 'พาราโรงงานผิด';
      },
    }

}]);
