##What is it?

##Getting Started
This application requires Node.js and NPM installed on your computer.
In order to set up and run our application follow these steps:

 1. Clone or fork this repo.
 2. Install dependencies by running ```npm install```
 3. Compile the stylesheet by running ```npm run sass```
 4. Run ```npm run dev``` The application is now running.

##Documentation

##Folder Structure##
![structure.png](https://bitbucket.org/repo/6bKr4j/images/3606287871-structure.png)
##Folder Structure Explanation##

####/public
* ```favicon.ico``` is just our favicon image.
* ```index.html``` is a html template, when our react app fires up it loads all it's content inside the root div in this file.

####/src/components
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

####/src/data
* ```books.js``` -> This file generates book mockup data using the faker module. This data is included in the ResultTable component.
* ```label_converter.js``` -> Simple file that maps book status to appropriate class names.
* ```nav_options.js``` -> Data file that contains all navigation options we use on the web app. This file is included by the Navigation component.

####src/sass
This folder contains all our sass files.
The ```style.scss``` includes all sass files in this folder and get's generated into ```style.css```. This gives us easy access to the style files for each individual component.

For more info on how sass works checkout: [http://sass-lang.com/]( http://sass-lang.com/)

####src/routes.js
We use the react-router module to handle our routing. A route configuration is basically a set of instructions that tell a router how to try to match the URL and what code to run when it does. Here is an example from our routes.js.

```
 <Router {...props}>
        <Route path="/" component={Layout}>
            <IndexRoute component={HomePage}/>
            <Route path="/profile" component={Profile} onEnter={login_needed} />
            <Route path="/mybooks" component={MyBooks} onEnter={login_needed} />
            <Route path="/messages" component={Messages} onEnter={login_needed} />
            <Route path="/noaccess" component={NoAccess}/>
            <Route path="/seller/:id" component={Seller} onEnter={login_needed}/>
            <Route path="/logout" component={Logout}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
);
```
This configuration tells us to always render the Layout component and if the route is "/" render HomePage component, otherwise render NotFound component.

####src/index.js
This file includes all routes from ```routes.js``` and loads our app content into ```public/index.html```


####package.json
File containing project description and all our dependencies.
More information on how this file works: [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)

##NPM Dependencies:
* react-dom
* react-router
* react-scripts
* react-facebook-login
* react-infinite-scroller
* react-search-input
* bootstrap
* flux 
* morgan 
* classnames 
* halogen 
* node-sass 
* express 
* jquery 
* query-string 
* faker
* json-web-token 
* sweetalert2
Documentation for all dependencies can be found at [https://www.npmjs.com/](https://www.npmjs.com/)