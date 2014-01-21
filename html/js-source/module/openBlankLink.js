define(['module'], function (module) {

    (function (global, window, document) {
        (function () {
            var config = global.config(), classes, matcher, elements, element, np = 0;

            if (!config.hasOwnProperty('target')) return;

            matcher = new RegExp(config.target);
            elements = Array.prototype.slice.call(document.getElementsByTagName('a'));

            element = elements.pop();
            while (typeof element !== 'undefined') {
                if (matcher.test(element.className)) {
                    classes = element.className.split(' ');
                    for (idx in classes) {
                        if (classes[idx].length === config.target.length) {

                            // add listener to open new window
                            element.addEventListener('click', function (event) {
                                event.preventDefault();
                                window.open(this.getAttribute('href'), '_blank');
                            }, false);

                            // add class for blank window icon
                            if (config.hasOwnProperty('addClassIcon') && typeof config.addClassIcon === 'string') {
                                element.className += ' ' + config.addClassIcon;
                            }
                            // prepend string to title attribute
                            if (config.hasOwnProperty('prependTitle') && typeof config.prependTitle === 'object') {
                                var attrTitle = element.getAttribute('title'),
                                    mySeparator = config.prependTitle.separator;
                                if (attrTitle === null) {
                                    attrTitle = '';
                                    mySeparator = '';
                                }
                                element.title = config.prependTitle.prepend + mySeparator + attrTitle;
                            }
                        }
                    }
                }
                element = elements.pop();
            }
        })();
    })(module, window, document);
});