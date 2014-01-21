/**
 * Constructeur
 */
define(['module'], function (module) {

    (function (global) {

        function Ctor(foo) {

            this.foo = foo;
            return this;
        }

        Ctor.prototype.getFoo = function () {
            return this.foo;
        };

        Ctor.prototype.setFoo = function (val) {
            return ( this.foo = val );
        };

        // Appel du contructeur sans `new`, en utilisant cette syntaxe:
        var ctor = function (foo) {
            return new Ctor(foo);
        };

        // Exposition de notre constructeur via l'objet global
        global.exports = ctor;

    })(module);

});