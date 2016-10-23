##Setup and starting the application##
This application requires Node.js and NPM installed on your computer.
In order to set up and run our application follow these steps:

 1. Download the complete project.
 2. Install all node dependencies by running ```npm install```
 3. Compile the stylesheet by running ```npm run sass```
 4. Run ```npm start```, the server is now listening on port 3000


##Project Structure##
##### public/ #####
* favicon.ico
* index.html

##### server/ #####
* index.js

##### src/ #####
+ components/
    * Button.js
    * FooterContent.js
    * Layout.js
    * Navigation.js
    * NotFound.js
    * ResultTable.js
    * Search.js
+ data/
    * books.js
    * label_converter.js
    * nav_options.js
+ sass/
    * about.scss
    * result_table.scss
    * footer_content.scss
    * layout.scss
    * navigation.scss
    * not_found.scss
    * search.scss
    * style.scss
* routes.js
* index.js

package.json

##Project Structure Documentation##

###/public###
* ```favicon.ico``` is just our favicon image.
* ```index.html``` is a html template, when our react app fires up it loads all it's content inside the root div in this file.


###/src/components###
All the pages on our website will be split into several react components.
When performing alterations or maintenance to the application we only need to work on the relevant components.
In our project we got the following components.

* ```Layout.js``` -> A component that renders a layout that is always a part of the page users see.
* ```Navigation.js``` -> A Navigation component, it takes the paths from nav_options.js and renders links.
* ```NotFound.js``` -> A component that gets rendered whenever a non existing path get's accessed.
* ```ResultTable.js``` -> A component rendering all the results filtered by the Search component
* ```Button.js``` ->  A button component that let's you switch between results to search for
* ```Search.js``` -> A search input component, this is a part of the ResultTable component.
* ```FooterContent.js``` ->  This is just a footer component


For more information on react components check out: [https://facebook.github.io/react/]( https://facebook.github.io/react/)

For more information about our components see the comments in each file.

###/src/data###
* ```books.js``` -> This file generates book mockup data using the faker module. This data is included in the ResultTable component.
* ```label_converter.js``` -> Simple file that maps book status to appropriate class names.
* ```nav_options.js``` -> Data file that contains all navigation options we use on the web app. This file is included by the Navigation component.



###src/sass###
This folder contains all our sass files.
The ```style.scss``` includes all sass files in this folder and get's generated into ```style.css```. This gives us easy access to the style files for each individual component.

For more info on how sass works checkout: [http://sass-lang.com/]( http://sass-lang.com/)

###src/routes.js###
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

###src/index.js###
This file includes all routes from ```routes.js``` and loads our app content into ```public/index.html```


###package.json###
File containing project description and all our dependencies.

More information on how this file works: [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)