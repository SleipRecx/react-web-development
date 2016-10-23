# README #

This README would normally document whatever steps are necessary to get your application up and running.

### public ###

+ styles
    * style.css
* index.html

### server ###

* index.js

### src ###

+ components
    * FooterContent.js
    * Layout.js
    * Navigation.js
    * NotFound.js
    * ResultTable.js
    * Search.js
+ data
    * books.js
    * label_converter.js
    * nav_options.js
+ sass
    * Masse sass-filer
* index.js
* routes.js

###React Components###
All the pages on our website will be split into several react components.
When performing alterations or maintenance to the application we only need to work on the relevant components.
For more information on react components check out: https://facebook.github.io/react/
For more information about our components see the comments in each file.




###Sass###
Node package node-sass
The Style.css is compiled from several Sass scripts. this allows us to modify the style on individual components as needed and include this in our main Sass file.
When we run the "NPM run sass" the stylesheet style.css is recompiled an updated. We also have a watcher attached when running "Npm run watchsass" or "npm run dev" so we can view real time changes as we update the code.
For more info on Sass checkout: http://sass-lang.com/