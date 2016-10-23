# README #
##Setup and run application##
This application requires Node.js and NPM installed on your computer.
In order to set up and run our application follow these steps:

 1. Download the complete project.
 2. Install all node dependencies by running ```npm install```
 3. Compile the stylesheet by running '''npm run sass'''
 4. Run NPM Start the server is now listening on port 3000.
 If you want to run the application in development mode then run NPM run dev. This will compile the  stylesheet and run the server.



### public ###
+ styles
    * style.css
* index.html

### server ###
* index.js

### src ###
+ components
    * Button.js
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
    * _about.scss
    * _result_table.scss
    * _footer_content.scss
    * _layout.scss
    * _navigation.scss
    * _not_found.scss
    * _search.scss
    * style.scss
* index.js
* routes.js

###React Components###
All the pages on our website will be split into several react components.
When performing alterations or maintenance to the application we only need to work on the relevant components.
In our project we got the following components.

 * Layout.js -> A component that renders a layout that is always a part of the page users see.
 * Navigation.js -> A Navigation component, it takes the paths from nav_options.js and renders links.
 * NotFound.js -> A component that gets rendered whenever a non existing path get's accessed.
 * ResultTable.js -> A component rendering all the results filtered by the Search component
 * Button.js ->  A button component that let's you switch between results to search for
 * Search.js -> A search input component, this is a part of the ResultTable component.
 * FooterContent.js ->  This is just a footer component


For more information on react components check out: [https://facebook.github.io/react/]( https://facebook.github.io/react/)
For more information about our components see the comments in each file.


###Sass###
Node package node-sass
The Style.css is compiled from several Sass scripts. this allows us to modify the style on individual components as needed and include this in our main Sass file.
When we run the "NPM run sass" the stylesheet style.css is recompiled an updated. We also have a watcher attached when running "Npm run watchsass" or "npm run dev" so we can view real time changes as we update the code. In our project all sass files starting with a underscore are partial sass files that are included in the style.scss file.

For more info on Sass checkout: [http://sass-lang.com/]( http://sass-lang.com/)

###Express server###
We are using the express module to always return the main index.html, so react-router render the route in the client


###React Router###
We use the react-router module to handle our routing. A route configuration is basically a set of instructions that tell a router how to try to match the URL and what code to run when it does. Here is an example from our routes.js.

```
const Routes = (props) => (
    <Router {...props}>
        <Route path="/" component={Layout}>
            <IndexRoute component={ResultTable}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);

```
This configuration tells us to always render the Layout component and if the route is "/" render ResultTable component, otherwise render NotFound component.