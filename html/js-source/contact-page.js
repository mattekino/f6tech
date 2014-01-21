
require(['module/module.boilerplate', 'constructor/constructor.boilerplate', '_jquery.boilerplate'], function( module, constructor ) {
    console.log(module);

    var myConstructor = new constructor();

    console.log(myConstructor);


});