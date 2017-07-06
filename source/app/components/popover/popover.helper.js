(function() {
  'use strict';

  angular
    .module('scaffold-angularjs.components')
    .directive('customPopover', CustomPopover)
    .directive('overlayEvent', OverlayEvent);

  /** @ngInject */
  function CustomPopover($compile, $templateCache, $timeout, Spin) {
    var directive = {
      scope: false,
      restrict: 'A',
      link: link
    };
    return directive;

    function link($scope, el, attrs) {
      var vm = $scope.vm;

      var button = $(el);
      var popoverTemplate;
      var placement = attrs.popoverPlacement;
      var viewport = attrs.popoverViewport;
      var container = attrs.popoverContainer;
      var templateId = attrs.customPopover;
      var title = attrs.popoverTitle;
      var recompile = attrs.recompile;
      var customClass = attrs.customClass;
      var template =
        '<div class="popover" role="tooltip">' +
        '<div class="arrow"></div>' +
        '<h3 class="popover-title"></h3>' +
        '<div class="popover-content"></div>' +
        '</div>';
      var popover;

      //Gets the popover template. Compile if needed
      function getPopoverTemplate() {
        //Get the popover content template
        popoverTemplate = $templateCache.get(templateId);
        //Check if the template is compiled
        if (!(popoverTemplate instanceof jQuery) || recompile) {
          //Compile the template
          var scope = $scope.$$transcluded ? $scope.$parent : $scope;
          popoverTemplate = $compile($('#' + templateId).html())(scope);
          //Save the compiled template in the template cache
          popoverTemplate.addClass(templateId);
          $templateCache.put(templateId, popoverTemplate);
        }
        clearValidation(popoverTemplate);
        clearFileInput(popoverTemplate);
      }

      //Build the popover using bootstrap popover
      function buildPopover() {
        if (!placement) {
          placement = 'auto';
        }
        if (!viewport) {
          viewport = 'body';
        }
        if (!container) {
          container = '.production-wrapper';
        }
        if (!title) {
          title = '';
        }
        if (customClass) {
          template = $(template).addClass(customClass);
        }

        //Creates the popover element
        button.popover({
          title: title,
          placement: placement,
          template: template,
          animation: false,
          html: true,
          container: container,
          trigger: 'manual',
          viewport: {
            selector: viewport,
            padding: 0
          },
          content: popoverTemplate
        });
        //Toggle the overlay
        $('#overlay').removeClass('hide').addClass('in');
        //Show the popover
        button.popover('show');
        popover = $('#' + button.attr('aria-describedby'));
      }

      //Close the popover if it's already open
      function closeIfOpen() {
        var open = button.attr('aria-describedby');
        if (typeof open !== typeof undefined && open !== false) {
          button.popover('destroy');
          return true;
        }
        return false;
      }

      function clearValidation(template) {
        template.find('form').each(function() {
          var form = $scope[$(this).attr('name')];
          if (form) {
            form.$setPristine();
          }
        });
      }

      function clearFileInput(template) {
        template.find('input[type=file]').each(function() {
          $(this).val("");
        });
      }

      //Close other popovers
      function closeOthers() {
        var others = $('.' + templateId);
        if (others.length > 0) {
          $(others.get(0)).closest('.popover').popover('destroy');
        }
      }

      //Start the Spin inside the popover if the attribute 'Spin' is present
      function toggleSpin() {
        if (vm.popoverSpin === true && popover.find('.spinner').length == 0) {
          Spin.start(popover, {
            relative: false
          });
        } else if (vm.popoverSpin === false && popover.find('.spinner').length > 0) {
          Spin.stop(popover);
        }
      }

      //Bind timers to watch for popover dimensions changes and window resize handle
      //the popover positioning refresh
      function bindRefreshPopoverPosition() {
        var old_height_val = popover.height();
        var old_width_val = popover.width();
        var timer;

        function refreshPosition() {
          popover.popover('show');
        }
        //Watcher function to check the popover dimensions and refresh the position
        function watch() {
          //Clear watcher if popover is closed
          if (popover.parent().length === 0) {
            timer = clearInterval(timer);
            $(window).off('resize', refreshPosition);
            return;
          }

          toggleSpin();

          //Check dimensions
          if (popover.height() != old_height_val || popover.width() != old_width_val) {
            old_height_val = popover.height();
            old_width_val = popover.width();
            //Refresh popover position
            refreshPosition();
          }
        }

        timer = setInterval(watch, 10);
        $(window).resize(refreshPosition);
      }

      //Bind the popover logic to the element click event handler
      $(el).click(function(e) {
        if (closeIfOpen())
          return;

        closeOthers();
        getPopoverTemplate();
        $timeout(function() {
          buildPopover();
          Spin.start(popover, {
            relative: false
          });
          bindRefreshPopoverPosition();
        });
      });
    }
  }

  function OverlayEvent() {
    var directive = {
      scope: false,
      restrict: 'A',
      link: link
    };
    return directive;

    function link(_, el) {
      el.bind('click', function() {
        $('.popover-container').removeClass('in').addClass('hide');
        var popover = $('.popover');

        if (popover)
          popover.popover('destroy');

        $(this).removeClass('in').addClass('hide');
      })
    }
  }
})();
