(function ($) {
  $.fn.countTo = function (options) {
    options = options || {};

    return $(this).each(function () {
      var settings = $.extend({}, $.fn.countTo.defaults, {
        from: $(this).data('from'),
        to: $(this).data('to'),
        speed: $(this).data('speed'),
        refreshInterval: $(this).data('refresh-interval'),
        decimals: $(this).data('decimals')
      }, options);

      var loops = Math.ceil(settings.speed / settings.refreshInterval),
        increment = (settings.to - settings.from) / loops;

      var self = this,
        $self = $(this),
        loopCount = 0,
        value = settings.from,
        data = $self.data('countTo') || {};

      $self.data('countTo', data);

      if (data.interval) {
        clearInterval(data.interval);
      }

      // Use requestAnimationFrame if available
      var requestAnimationFrame = window.requestAnimationFrame ||
                                  window.mozRequestAnimationFrame ||
                                  window.webkitRequestAnimationFrame ||
                                  window.msRequestAnimationFrame ||
                                  function (callback) {
                                    setTimeout(callback, 1000 / 60);
                                  };

      data.interval = setInterval(function () {
        requestAnimationFrame(updateTimer);
      }, settings.refreshInterval);

      render(value);

      function updateTimer() {
        value += increment;
        loopCount++;

        render(value);

        if (typeof(settings.onUpdate) === 'function') {
          settings.onUpdate.call(self, value);
        }

        if (loopCount >= loops) {
          $self.removeData('countTo');
          clearInterval(data.interval);
          value = settings.to;

          if (typeof(settings.onComplete) === 'function') {
            settings.onComplete.call(self, value);
          }
        }
      }

      function render(value) {
        var formattedValue = settings.formatter.call(self, value, settings);
        $self.html(formattedValue);
      }
    });
  };

  $.fn.countTo.defaults = {
    from: 0,
    to: 0,
    speed: 500,             // Adjusted for a faster animation (500 milliseconds)
    refreshInterval: 100,   // Adjusted for a smoother animation
    decimals: 0,
    formatter: formatter,
    onUpdate: null,
    onComplete: null
  };

  function formatter(value, settings) {
    return value.toFixed(settings.decimals);
  }
}(jQuery));

// Debounce function
function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this, args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

jQuery(function ($) {
  // CSS Transition for smoother visual transition
  $('.count-number').css('transition', 'all 0.3s ease');

  // Trigger custom events
  $('.count-number').on('countTo.start', function () {
    // Your custom logic when counting starts
  });

  $('.count-number').on('countTo.update', function (event, value) {
    // Your custom logic during each update
  });

  $('.count-number').on('countTo.complete', function (event, value) {
    // Your custom logic when counting completes
  });

  // Use a lower refresh interval for smoother animations
  $('.timer').each(function () {
    var $this = $(this);
    var options = $.extend({}, $this.data('countToOptions') || {});
    $this.countTo(options);
  });
});
