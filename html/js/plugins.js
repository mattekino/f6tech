// Avoid `console` errors in browsers that lack a console.
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());

// Place any jQuery/helper plugins in here.

/* jquery.cloop - plugin maison */ 
(function($){
    var my = { // variables persistantes
        oList : null,
        oClique : null,
        iKey : false,
        oContenu : null,
        oPrevClique : null,
        oPrevContenu : null
    }
    $.fn.cloop = function(options) {
        var defaults = { // options personnalisables
            classLibelle : 'clic-me',
            classContenu : 'hide-me',
            delaiOuvre : 'fast',
            delaiFerme : 'fast',
            okScroll : true,
            closePrev : false
        }
        options = $.extend(defaults, options);
        setup(this);
        return this.each(function() {
            my.oList.find('.'+options.classLibelle)
            .on('click', function(e) { console.log(e.type)
                e.preventDefault();
                my.oClique = $(this);
                openClose();
                return false;
            })/*
            .on('keydown', function(e) {
                e.preventDefault();
                my.iKey = e.which;
                my.oClique = $(this);
                openClose();
                /*if( e.which === 13 ) {
                    my.oClique = $(this); openClose();
                }*/
               /* return false;
            })*/;
        });
        /* ----------- private ----------- */
        function setup(elem) {
            my.oList = elem;
            my.oList.find('.'+options.classContenu).hide();
            my.oList.find('.'+options.classLibelle).removeClass('opened').addClass('closed').attr('aria-expanded', 'false');
        }
        function findContenu() {
            my.oContenu = my.oClique.find('~ .'+options.classContenu).first();
        }
        function openClose() {
            if(options.closePrev && my.oPrevClique != null) {               
                close(my.oPrevClique, my.oPrevContenu);
                resetPrev();
            }
                findContenu();
                if(my.oContenu.css('display') == 'none') { 
                    open(my.oClique, my.oContenu);
                    if(options.closePrev) { 
                        my.oPrevContenu = my.oContenu;
                        my.oPrevClique = my.oClique;
                    }
                    if(options.okScroll) scrollIt();

                } else {
                    if(!options.closePrev) close(my.oClique, my.oContenu);
                    if(options.closePrev) resetPrev();
                }
            my.iKey = false;
            return false;
        }
        function open(thatClicked, thatContenu) {
            thatContenu.slideDown(options.delaiOuvre);
            thatClicked.removeClass('closed').addClass('opened').attr('aria-expanded', 'true');
        }
        function close(thatClicked, thatContenu) {
            $.when(
                thatContenu.slideUp(options.delaiFerme)
            ).done(function() {
                thatClicked.removeClass('opened').addClass('closed').attr('aria-expanded', 'false');
            });
        }
        function scrollIt() {
            var offset = my.oClique.offset().top -90;
            $('html, body').animate({scrollTop: offset}, 'slow');
        }
        function resetPrev() {
            my.oPrevContenu = null;
            my.oPrevClique = null;
        }
    };
})(jQuery);

/**
 * Plugin jQuery galacticMenu maison
 * @optional outDuration:int ; delai de fermeture du panneau quand la souris n'est plus dessus
 * @optional fadeDuration:int ; delai d'ouverture/fermeture du menu pour le fadeOut/In
 */
(function($) {
    $.fn.galacticMenu = function(options) { 
        settings = $.extend({
            outDuration: 500,
            fadeDuration: 100
        }, options);
        this.each(function() {
            var that = $(this),
                ulTopLeft = that.find('.topnav-topleft'),
                ulBottomRight = that.find('.topnav-bottomright'),
                listNiv1 = '.link-list-regions, .link-mesgares, .link-mesitineraires',
                oIsOpen = {},
                iPrevPan = null,
                iNbrLiNiv1 = 3,
                myTimeout = null;
            // compte les liens niv1 et les instancies fermes
            for(i=0; i < iNbrLiNiv1; ++i) {
                oIsOpen[i] = false;
            }
            // action sur le clic du lien
            $(listNiv1).on('click', function(e) {
                e.preventDefault();
                if(myTimeout !== null) { clearTimeout(myTimeout); myTimeout = null; }
                var oClicked = $(this),
                    oPanel = oClicked.siblings('.layer'),
                    iIndex = oClicked.data('index');
                oClicked.css('outline', 0).parent('.layer-cont').removeClass('inactive').addClass('active').blur();
                if(!oIsOpen[iIndex]) {
                    // panneau ferme : on l'ouvre
                    if(iPrevPan !== null) {
                        // mais d'abord, comme il y a un autre panneau ouvert, on le ferme
                        var prevLink = that.find('a[data-index="'+iPrevPan+'"]');
                        //prevLink.siblings('.layer').hide();
                        prevLink.removeAttr('style').parent('.layer-cont').removeClass('active').addClass('inactive').blur();
                        oIsOpen[iPrevPan] = false;
                        oPanel.show();
                    } else { 
                        oPanel.fadeIn(settings.fadeDuration);
                    }
                    oIsOpen[iIndex] = true;
                    iPrevPan = iIndex;
                    // delai fermeture du panneau si la souris sort + init le timeout si elle revient
                    oPanel.mouseleave(function(e){
                        e.stopImmediatePropagation();
                        myTimeout = setTimeout(function() { 
                            oPanel.fadeOut(settings.fadeDuration*2);
                            oClicked.removeAttr('style').parent('.layer-cont').removeClass('active').addClass('inactive').blur();
                            oIsOpen[iIndex] = false;
                            iPrevPan = null;
                        }, settings.outDuration);
                    }).mouseenter(function(){
                        e.stopImmediatePropagation();
                        clearTimeout(myTimeout);
                    });
                } else { 
                    // panneau deja ouvert : on le ferme
                    oPanel.fadeOut(settings.fadeDuration);
                    oClicked.removeAttr('style').parent('.layer-cont').removeClass('active').addClass('inactive').blur();
                    oIsOpen[iIndex] = false;
                    iPrevPan = null;
                }           
            });
        });
        return this;
    };
})(jQuery);