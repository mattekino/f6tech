define(['module'], function (module) {

    (function (global) {
        var Module = (function () {

            var config = global.config(),
                data = "secret";

            return {
                //Ceci est une proprété booléenne (boolean)
                bool: true,
                //  Une chaîne de caractère (string)
                string: "a string",
                // Une propriété tableau (array)
                array: [ 1, 2, 3, 4 ],
                // Une propriété objet (object)
                object: {
                    lang: "en-Us"
                },
                getData: function () {
                    // obtenir la valeur courante de `data`
                    return data;
                },
                setData: function (value) {
                    // affecter une valeur `value` à `data` et le renvoyer
                    return ( data = value );
                }
            };
        })();

        // D'autres choses peuvent être implémentées ici

        // Exposition de notre module via l'objet global
        global.exports = Module;

    })(module);


});