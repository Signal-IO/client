'use strict';

var VIA_PREFIX = 'https://via.travr.se/';

function ShareDialogController($scope, $element, analytics, store) {
  var self = this;

  function updateSharePageLink(frames) {
    if (!frames.length) {
      self.sharePageLink = '';
      return;
    }

    self.sharePageLink = 'https://hyp.is/go?url=' + encodeURIComponent(frames[0].uri);
  }

  var shareLinkInput = $element[0].querySelector('.js-share-link');
  shareLinkInput.focus();
  shareLinkInput.select();

  $scope.$watch(function () { return store.frames(); },
    updateSharePageLink);

  $scope.onShareClick = function(target){
    if(target){
      analytics.track(analytics.events.DOCUMENT_SHARED, target);
    }
  };
}

module.exports = {
  controller: ShareDialogController,
  controllerAs: 'vm',
  bindings: {
    onClose: '&',
  },
  template: require('../templates/share-dialog.html'),
};
