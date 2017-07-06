'use strict';

angular.module('scaffold-angularjs.components')
  .directive('confirmbox', [function() {
    return {
      restrict: 'A',
      scope: {
        okAction: '&fnOk',
        cancelAction: '&fnCancel',
        condition: '=condition',
        scopedMessage: '=scopedMessage'
      },
      link: function($scope, iElm, iAttrs, controller) {
        $(iElm).click(function(e) {
          //var msg = iAttrs.message ? $rootScope.getTranslateValue(iAttrs.message) : $rootScope.getTranslateValue('GENERAL.LABEL.ARE_YOU_SURE');
          var msg = iAttrs.message;

          if ($scope.scopedMessage) {
            msg = $scope.scopedMessage;
          }

          if ($scope.condition === false || $scope.condition === null) {
            $scope.okAction();
            return;
          }

          $(document).on('keyup.confirmBox', $('.modal'), function(e) {
            $('.modal').keyup(function(e) {
              e.preventDefault();
              if (e.keyCode === 13) {
                var btnSuccess = $('.modal-sm').find('button.btn-success');
                btnSuccess.trigger('click');
                $('.modal').unbind('keyup');
                btnSuccess.prop('disabled', true);
              } else if (e.keyCode === 27) {
                var btnCancel = $('.modal-sm').find('button.btn-danger');
                btnCancel.trigger('click');
                $('.modal').unbind('keyup');
                btnCancel.prop('disabled', true);
              }
              $(document).off('keyup.confirmBox')
            });
          });

          /**
           * @required Listener
           * change the style of the modal
           */
          $(document).on('click', $('.confirmbox'), function() {
            var dialog = $('.confirmbox .modal-dialog');

            if (!dialog.hasClass('modal-sm'))
              dialog.addClass('modal-sm');

            $('.bootbox-body').css('font-weight', 'bold');
          });

          bootbox.dialog({
            /**
             * @required String|Element
             */
            message: msg,

            /**
             * @optional String|Element
             * adds a header to the dialog and places this text in an h4
             */
            // title: msg,

            /**
             * @optional Function
             * allows the user to dismisss the dialog by hitting ESC, which
             * will invoke this function
             */
            onEscape: function() {},

            /**
             * @optional Boolean
             * @default: true
             * whether the dialog should be shown immediately
             */
            // show: true,

            /**
             * @optional Boolean
             * @default: true
             * whether the dialog should be have a backdrop or not
             */
            // backdrop: false,

            /**
             * @optional Boolean
             * @default: true
             * show a close button
             */
            // closeButton: true,

            /**
             * @optional Boolean
             * @default: true
             * animate the dialog in and out (not supported in < IE 10)
             */
            // animate: false,

            /**
             * @optional String
             * @default: null
             * an additional class to apply to the dialog wrapper
             */
            className: 'confirmbox',

            /**
             * @optional Object
             * @default: {}
             * any buttons shown in the dialog's footer
             */
            buttons: {
              'Ok': {
                className: 'btn-success',
                callback: function() {
                  $scope.$apply($scope.okAction);
                }
              },
              'Cancel': {
                className: 'btn-danger',
                callback: function() {
                  $scope.$apply($scope.cancelAction);
                }
              }
            }
          });
        });
      }
    };
  }]);
