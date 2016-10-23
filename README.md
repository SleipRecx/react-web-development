# README #
##Setup and run application##
This application requires Node.js and NPM installed on your computer.
In order to set up and run our application follow these steps:

 1. Download the complete project.

 2. Install all node dependencies by running NPM install

 3. Compile the stylesheet by running NPM run sass

 4. Run NPM Start the server is now listening on port 3000

 If you want to run the application in development mode the run NPM run dev This will compile the  stylesheet and run the server



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
For more information on react components check out: :  [https://facebook.github.io/react/]( https://facebook.github.io/react/)
For more information about our components see the comments in each file.


###Sass###
Node package node-sass
The Style.css is compiled from several Sass scripts. this allows us to modify the style on individual components as needed and include this in our main Sass file.
When we run the "NPM run sass" the stylesheet style.css is recompiled an updated. We also have a watcher attached when running "Npm run watchsass" or "npm run dev" so we can view real time changes as we update the code.
For more info on Sass checkout: [http://sass-lang.com/]( http://sass-lang.com/)

###Express server###
We are using the express module to always return the main index.html, so react-router render the route in the client

###React Router###
We use the react-router module to handle our routing. A route configuration is basically a set of instructions that tell a router how to try to match the URL and what code to run when it does. Here is an example from our routes.js.

```jsx
const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Layout}>
            <IndexRoute component={ResultTable}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);

```