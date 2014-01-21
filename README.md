## [Template f6Tech](https://gitlab.fullsix.com/matthieu.marseille/f6tech_template)

Ce repo propose une architecture préétablie pour commencer un projet à base d’inuit.css, en embarquant les outils front-end utilisés au sein de l’équipe.
L’idée tourne autour d’une structure globale de fichiers, accompagnée d’une base de fichiers .scss en surcouche du framework inuit.css, ainsi qu’une base de libs / plugins / polyfills utilisés régulièrement sur les projets. La surcouche scss propose une architecture calquée sur celle d’inuit.css et s’inspire du concept d’Atomic Design.

Le package embarque :

 * Modernizr            : polyfill et feature detect de base pour le html5
 * inuit.css            : framework scss responsive
 * jQuery               : lib de développement javascript
 * requirejs            : loader js
 * srcset polyfill      : design pattern d’images responsive

Le repo propose une architecture de répertoires comme suit :

 * bower_components    : contiens les dépendances du projet
 * html                : les fichiers front
 * node_modules        : modules grunt
 * scss                : sources inuit.css et custom scss

On travaille les scss dans un répertoire à part de ‘html/css’, dans lequel est exportée la css compilée et minifiée (plus les css vendor si nécessaire). 

Les dépendances sont gérés via **Bower**, qui créé un registre des dépendances du projet (répertoire ‘bower_components’), dans lequel sont téléchargées les dernières versions des bibliothèques nécessaires au projet, ce qui facilite la maintenance des dépendances du projet.

**Grunt** est utilisé pour automatiser les tâches de gestion des fichiers : copier les fichiers nécessaires dans les répertoires correspondant (depuis ‘bower_components’ dans ‘html/*’), compiler les scss coté serveur ou dev (‘watch’), vérifier la syntaxe des fichiers, concaténer, minifier (..).

Le repo d’origine est herbergé sur **gitlab** : [Template f6Tech](https://gitlab.fullsix.com/matthieu.marseille/f6tech_template)
Ce repo ne contiens que les fichiers de surcouche inuit.css, une architecture de base de répertoire html/* et les .json de référence des dépendances Bower et modules Grunt.


## Installation & outils

**Pour être utilisé correctement, ce package nécessite l’installation préalable de plusieurs outils.**
NB : Modifier les variables système windows est nécessaire pour l’installation de certains outils, et permet ensuite de lancer les commandes depuis n’importe quel terminal (windows / node / ruby / bash ..).

**Ruby / Sass** :

 * [télécharger et installer](https://www.ruby-lang.org/fr/downloads/)
 * lancer un prompt Ruby, et installer sass : gem install sass
 * ajouter aux variables systèmes, dans les paramètres avancés du système, ouvrir les variables d’environnement, éditer PATH et y ajouter : `;C:\Ruby200-x64\bin`

**Git** :

 * [télécharger et installer](http://git-scm.com/downloads)
 * ajouter aux variables systèmes : `;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\Git\cmd`
 * [télécharger et installer MsGit](https://code.google.com/p/msysgit/)

**Node.js** :

 * [télécharger et installer Node.js](http://nodejs.org/)
 * ajouter aux variables systèmes : `;%NODEJS%;C:\Program Files\nodejs`

**phantomJs** :

 * [télécharger phantomJS](http://phantomjs.org/download.html)
 * dézipper et copier le fichiers (par exemple dans C:\Program Files\phantomJs)
 * ajouter aux variables systèmes : `;C:\Program Files\phantomJS`

**Grunt-cli** :

 * lancer terminal et taper : `npm install -g grunt-cli`
 * vérifier la version installée : `grunt --version`

**Bower** :

 * lancer terminal et taper : `npm install -g bower`
 * vérifier la version installée : `bower --version`

Installation du template : 

 1. cloner le repo sur son poste, copier les fichiers dans un nouveau répertoire de travail.
 2. ouvrir une console à la racine du répertoire de travail, lancer la commande `npm install` pour installer les modules Grunt.
 3. lancer ensuite la commande `bower install` pour installer les dépendances Bower.
 4. lancer enfin la commande `grunt init` pour copier les dépendances depuis le registre Bower dans ‘html/*’, et compiler le fichier style.min.css une première fois.
 5. faire un commit initial.

Pour commencer à travailler, il faut un lancer watch sur le fichier style.scss, soit via Ruby, soit via Grunt.
NB : Grunt et Bower s’installent localement, ce qui signifie une instance de Grunt et de Bower pour chaque projet, ainsi qu’une instance de chaque module / dépendance.


## inuit.css custom

Le template repose sur une architecture préétablie de fichiers custom pour surcharger le framework, à utiliser en plus des classes de base inuit, calquée sur le principe de l’[Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/).
L’ensemble de ces fichiers est déjà importé dans style.scss, on dispose d’un fichier de variables et d’un fichier de mixins custom déjà utilisés dans les scss : il suffit de commencer à coder.
Le fichier index.html sert de page allblocks et de modèle sur l’utilisation des classes inuit et des classes de surcharge custom pour la construction des pages.

Hors utilisation de [prepros](http://alphapixels.com/prepros/) / compass, compiler les scss peut se faire de deux manières :

 * en lançant le watch de Grunt : taper grunt watch
 * en ligne de commande, avec la commande présente dans style.scss 
`sass --watch scss/style.scss:html/css/style.min.css --style compressed`

On distingue trois catégories de fichiers :
**objects** : les éléments html de base (a, img, input..)
**elements** : des groupes d’éléments de base (un ensemble label, input, submit par exemple)
**page** : les classe de plus “haut niveau” qui s’appliquent à des pages, ou au site dans son ensemble (les mediaqueries, les ajustements IE par exemple)

Par exemple, si on considère un module d’inscription à une newsletter, en premier lieu on va styler chaque élément indépendamment : un label, un input “text” et un submit qui sont des objects, un form qui regroupe les trois au niveau elements, et éventuellement le comportement de ce groupe d’éléments au niveau d’une page.

Dans chaque catégorie, les styles sont regroupés par types d’éléments stylés (un fichier pour les éléments de formulaire au niveau object, un fichier pour les formulaires au niveau elements..).

On utilise le mixin media-query d'inuit.css pour inclure directement les mediaqueries dans les propritétés css des éléments, en utilisant les variables de breakpoints d'inuit.css qui sont les même utilisées dans les classes de grille. Il est possible d'overrider ces variables dans le fichier _utils.scss.

`@include media-query(desk){ [styles here] }`

Les breakpoints sont :

 * (desk) pour 1024px et plus
 * (lap) de 1023px à 481px
 * (palm) en dessous de 480px


## Require.js

Require.js blablabla


## Grunt & Bower

Bower est un gestionnaire de dépendances : on va créer un registre de dépendances (frameworks, bibliothèques, plugins..) par projet, qu’il sera facile de télécharger et maintenir à jour via Bower.
Bower télécharge directement les repos des dépendances concernées, ainsi on va souvent avoir à la fois les sources et les fichiers de prod des dépendances utilisées : on utilise Grunt pour copier uniquement les fichiers nécessaires depuis le registre Bower dans les répertoires correspondants (‘html/js’, ‘html/css’..).

Grunt d’une manière générale est utilisé pour gérer l’ensemble des fichiers du projet. On va, à besoin, télécharger ou mettre à jour des dépendances, copier des fichiers, les compiler, vérifier leur syntaxe, les concaténer ou les minifier..
On peut ainsi définir plusieurs type de tâches via Grunt : initialisation (copie des fichiers de dépendances, compilation des scss..), dev avec un ‘watch’ (tourne en arrière-plan et compile les fichiers cibles dès qu’ils sont modifiés), prod avec une tâche de concaténation / minification des fichiers, etc. 

Chaque commande Grunt correspond à l’utilisation d’un ou plusieurs modules, et il est possible de configurer les modules pour obtenir des résultats différents en fonction de la commande utilisée, ce qui permet par exemple de différencier les tâches à exécuter en dev (watch, compilation scss..) des tâches à exécuter avant un déploiement ou une mise en prod (concaténation, minification..).

Grunt et Bower tournent sur Node.js et npm, et s’utilisent via un terminal; ils utilisent un fichier .json pour enregistrer les modules / dépendances utilisés (bower.json et package.json); de plus, Grunt utilise le fichier Gruntfile.js pour la configuration des modules instalés.
NB : se référer au [guide Grunt sur le wiki f6Tech](http://wiki.fullsix.com/display/f6tech/Grunt).


## Modules

Le Gruntfile est pré-configuré pour faire tourner un certain nombre de tasks :

 * options globales relatives au projet (path: <%= f6template.html %>)
`f6template: {
  // configurable paths
  html: 'html'
}`
 * compilation sass déclinée en `sass:prod` pour compiler et minifier, et `sass:dev` pour compiler en gardant les informations relatives aux scss pour chaque ligne de css compilée
 * watch : 'listener' de fichiers qui permet d'exécuter des tasks sur modification d'un ou plusieurs fichiers
 * copy : module utilisé par la commande `grunt init` qui sert à la gestion de fichiers
 * concat : utilisé pour concatener les fichiers
 * uglify : utilisé pour minifier les fichiers
 * validation : utilisé pour la validation W3C des fichiers html, configuré pour valider tous les fichiers .html présent dans html/* et générer un fichier de report .json contenant les erreurs
 * requirejs : utilisé pour la configuration js
 * jshint : utilisé pour valider la syntaxe des fichiers js


## Ressources 

Listing des ressources utilisées ou associées :

 * [Ruby](https://www.ruby-lang.org/fr/downloads/)
 * [Git](http://git-scm.com/downloads)
 * [Nodejs](http://nodejs.org/)
 * [Grunt](http://gruntjs.com/)
 * [Npm registry](https://npmjs.org/) (un moteur de recherche de modules Grunt)
 * [Bower](http://bower.io/)
 * [Bower components](http://sindresorhus.com/bower-components/) (un moteur de recherche de composants Bower)
 * [phantomJS](http://phantomjs.org/download.html) (headless browser qui permet de lancer des tests)
 * [Sass](http://sass-lang.com/)
 * [inuit.css](https://github.com/csswizardry/inuit.css)
 * [inuit.css Kitchen Sink](http://terabytenz.github.io/inuit.css-kitchensink/)
 * [jQuery](http://jquery.com/)
 * [Require.js](http://requirejs.org/)
 * [Modernizr](http://modernizr.com/)
 * [Atomic Design](http://bradfrostweb.com/blog/post/atomic-web-design/)

Modules Grunt utilisés :

 * [bower-verify](https://npmjs.org/package/grunt-bower-verify)
 * [grunt-contrib-concat](https://npmjs.org/package/grunt-contrib-concat)
 * [grunt-contrib-copy](https://npmjs.org/package/grunt-contrib-copy)
 * [grunt-contrib-csslint](https://npmjs.org/package/grunt-contrib-csslint)
 * [grunt-contrib-jshint](https://npmjs.org/package/grunt-contrib-jshint)
 * [grunt-contrib-sass](https://npmjs.org/package/grunt-contrib-sass)
 * [grunt-contrib-uglify](https://npmjs.org/package/grunt-contrib-uglify)
 * [grunt-newer](https://npmjs.org/package/grunt-newer)
 * [livereload](http://livereload.com/) / [watch](https://npmjs.org/package/grunt-contrib-watch)
 * [html validation](https://npmjs.org/package/grunt-html-validation)
 * [jscs checker](https://github.com/gustavohenke/grunt-jscs-checker)
 * [sprite generator](https://npmjs.org/package/grunt-sprite-generator)
 * [time-grunt](https://npmjs.org/package/time-grunt)
 * [jshint-stylish](https://npmjs.org/package/jshint-stylish)
 