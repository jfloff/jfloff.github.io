/*
  Strata by HTML5 UP
  html5up.net | @n33co
  Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

$('.responsive-menu ul li').click(function() {
      $('.responsive-menu').stop(true,true).slideToggle();
  });

$('.menu-toggle-btn').click(function(){
      $('.responsive-menu').stop(true,true).slideToggle();
      return false;
  });

(function($) {

  var settings = {

    // Parallax background effect?
      parallax: true,

    // Parallax factor (lower = more intense, higher = less intense).
      parallaxFactor: 20

  };

  skel.breakpoints({
    xlarge: '(max-width: 1800px)',
    large: '(max-width: 1280px)',
    medium: '(max-width: 980px)',
    small: '(max-width: 736px)',
    xsmall: '(max-width: 480px)'
  });

  $(function() {

    var $window = $(window),
      $body = $('body'),
      $header = $('#header'),
      $nav = $('#nav'), $nav_a = $nav.find('a');
      $nav_top = $('#nav-top'), $nav_top_a = $nav_top.find('a');

    // Disable animations/transitions until the page has loaded.
      $body.addClass('is-loading');

      $window.on('load', function() {
        $body.removeClass('is-loading');
      });

    // Touch?
      if (skel.vars.mobile) {

        // Turn on touch mode.
          $body.addClass('is-touch');

        // Height fix (mostly for iOS).
          window.setTimeout(function() {
            $window.scrollTop($window.scrollTop() + 1);
          }, 0);

      }

    // Fix: Placeholder polyfill.
      $('form').placeholder();

    // Prioritize "important" elements on medium.
      skel.on('+medium -medium', function() {
        $.prioritize(
          '.important\\28 medium\\29',
          skel.breakpoint('medium').active
        );
      });

      // Header.
    var ids = [];

    // Set up nav items.
      $nav_a
        .scrolly({ offset: 44 })
        .on('click', function(event) {

          var $this = $(this),
            href = $this.attr('href');

          // Not an internal link? Bail.
            if (href.charAt(0) != '#')
              return;

          // Prevent default behavior.
            event.preventDefault();

          // Remove active class from all links and mark them as locked (so scrollzer leaves them alone).
            $nav_a
              .removeClass('active')
              .addClass('scrollzer-locked');

          // Set active class on this link.
            $this.addClass('active');

        })
        .each(function() {

          var $this = $(this),
            href = $this.attr('href'),
            id;

          // Not an internal link? Bail.
            if (href.charAt(0) != '#')
              return;

          // Add to scrollzer ID list.
            id = href.substring(1);
            $this.attr('id', id + '-link');
            ids.push(id);

        });

        // Initialize scrollzer.
          $.scrollzer(ids, { pad: 300, lastHack: true });

        $nav_top_a
          .scrolly({ offset: 44 })
          .on('click', function(event) {

            var $this = $(this),
              href = $this.attr('href');

            // Not an internal link? Bail.
              if (href.charAt(0) != '#')
                return;

            // Prevent default behavior.
              event.preventDefault();

          })
          .each(function() {

            var $this = $(this),
              href = $this.attr('href'),
              id;

            // Not an internal link? Bail.
              if (href.charAt(0) != '#')
                return;
          });

      // Parallax background.

        // Disable parallax on IE (smooth scrolling is jerky), and on mobile platforms (= better performance).
          if (skel.vars.browser == 'ie'
          ||	skel.vars.mobile)
            settings.parallax = false;

        if (settings.parallax) {

          skel.on('change', function() {

            if (skel.breakpoint('medium').active) {

              $window.off('scroll.strata_parallax');
              $header.css('background-position', 'top left, center center');

            }
            else {

              $header.css('background-position', 'left 0px');

              $window.on('scroll.strata_parallax', function() {
                $header.css('background-position', 'left ' + (-1 * (parseInt($window.scrollTop()) / settings.parallaxFactor)) + 'px');
              });

            }

          });

        }


    // Main Sections: Two.

      // Lightbox gallery.
        $window.on('load', function() {

          $('#two').poptrox({
            caption: function($a) { return $a.next('h3').text(); },
            overlayColor: '#2c2c2c',
            overlayOpacity: 0.85,
            popupCloserText: '',
            popupLoaderText: '',
            selector: '.work-item a.image',
            usePopupCaption: true,
            usePopupDefaultStyling: false,
            usePopupEasyClose: false,
            usePopupNav: true,
            windowMargin: (skel.breakpoint('small').active ? 0 : 50)
          });

        });

  });

})(jQuery);
