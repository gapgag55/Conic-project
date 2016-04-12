app.factory('sound', [function() {

  function url(url) {
    return new Audio(url).play();
  }

  return {

    countdown: function() {
      return url('data/sound/countdown.mp3');
    },
    timeout: function() {
      return url('data/sound/timeout.mp3');
    },

    circleLandRight: function() {
      return url('data/sound/circleRight.mp3');
    },
    circleLandWrong: function() {
      return url('data/sound/circleWrong.mp3');
    },
    /*circleBusRight: function() {
      return url('');
    },
    circleBusWrong: function() {
      return url('');
    },
    circleFacRight: function() {
      return url('');
    },
    cirleFacWrong: function() {
      return url('');
    }*/

  }
}]);
