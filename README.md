#What is it?
This project is a web application that allows people to resell books, basically the same concept as ibok.no.

It allows users to register and login using the facebook, once inside it's possible to search for books, add books, remove books, and visit a book seller's page. 

##Table of Contents
* [Getting Started](https://bitbucket.org/trondaal/it2810-07-oppgave-3/overview#markdown-header-getting-started)
* [Folder Structure](https://bitbucket.org/trondaal/it2810-07-oppgave-3/overview#markdown-header-folder-structure)
* [Folder Structure Explanation](https://bitbucket.org/trondaal/it2810-07-oppgave-3/overview#markdown-header-folder-structure-explanation)
* [Dependencies List](https://bitbucket.org/trondaal/it2810-07-oppgave-3/overview#markdown-header-list-of-all-dependencies)
* [Task Requirements](https://bitbucket.org/trondaal/it2810-07-oppgave-3/overview#markdown-header-how-we-fulfilled-the-task-requirements)

##Getting Started
This application requires Node.js and NPM installed on your computer.
In order to set up and run our application follow these steps:

 1. Download the complete project.
 2. Install all node dependencies for the client by running ```npm install``` in the root folder.
 3. Set up the server by navigating to ```/rest_api``` and run ```npm install```
 4. Compile the stylesheet by running ```npm run sass```
 5. Run ```npm run dev``` . This will run the client at :3000 and the restAPI at :9001


##Folder Structure##
![structure2.png](https://bitbucket.org/repo/6bKr4j/images/462258600-structure2.png)

##Folder Structure Explanation##

####/public
* ```favicon.ico``` is just our favicon image.
* ```index.html``` is a html template, when our react app fires up it loads all it's content inside the root div in this file.
* ```styles/style.css``` the compiled css from sass.

####/server
* ```index.js``` bootstrapping for the application.

####/src/components
All the pages on our website will be split into several react components.
When performing alterations or maintenance to the application we only need to work on the relevant components.
In our project we got the following components.

* ```Button.js``` A button component that let's you switch between results to search for
* ```CheckboxFilter.js``` A search filter component for the home page, this lets you limit your search.
* ```FooterContent.js``` This is a footer component which contain the footer content.
* ```HomePage.js``` The home page component takes in the other components making up the home page.
* ```Layout.js``` A component that renders a layout that is always a part of the page users see.
* ```Login.js``` The component for the Facebook login.
* ```Logout.js``` The component for logging out and redirecting to the root path.
* ```MyBooks.js``` The component used to display the content of the “My Books” page. This is where the user can view its books for sale, as well as add and delete books.
* ```Navigation.js``` A Navigation component, it takes the paths from nav_options.js and renders links.
* ```NoAccess.js``` The component is used to inform the user that he/she does not have the current access required to view the selected page.
* ```NotFound.js``` A component that gets rendered whenever a non existing path get's accessed.
* ```Profile.js``` The profile component displays logged in user info
* ```ProfileImage.js``` A component for displaying bif profile images.
* ```ResultObject.js``` The component used to display the books that are listed on the main page.
* ```ResultObjectDetails.js``` The component used to display the more detailed information about books that is shown when expanding a ResultObject.
* ```ResultObjectMyBook.js``` The component used to display the books listed at the “My Books” page.
* ```ResultObjectSeller.js``` The component used to display the books listed under the “Seller” page.
* ```ResultTable.js``` A component rendering all the results filtered by the Search component
* ```SearchFilter.js``` The component holding the CheckboxFilter components and the filter functions used with the filter components.
* ```SellerPage.js``` The component used to display the content of the “Seller” page.

For more information on react components check out: [https://facebook.github.io/react/]( https://facebook.github.io/react/)

For more information about our components see the comments in each file.


####/src/data
* ```label_converter.js``` -> Simple file that maps book status to appropriate class names.
* ```nav_options.js``` -> Data file that contains all navigation options we use on the web app. This file is included by the Navigation component.

####src/sass
This folder contains all our sass files.
The ```style.scss``` includes all sass files in this folder and get's generated into ```style.css```. This gives us easy access to the style files for each individual component.

For more info on how sass works checkout: [http://sass-lang.com/]( http://sass-lang.com/)

####src/routes.js
We use the react-router module to handle our routing. A route configuration is basically a set of instructions that tell a router how to try to match the URL and what code to run when it does. Here is an example from our routes.js.

```
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
```
This configuration tells us to always render the Layout component and if the route is "/" render HomePage component, otherwise render NotFound component.

####index.js
This file includes all routes from ```routes.js``` and loads our app content into ```public/index.html```


####package.json
File containing project description and all our dependencies.
More information on how this file works: [https://docs.npmjs.com/files/package.json](https://docs.npmjs.com/files/package.json)

####/rest_api  This folder is a node project in it's self.
* ```index.js``` File containing the routing and api logic.
* ```generate.js``` Node script that populates our database with mockup data.
* ```package.json``` Contains all dependencies used by the api.
* ```api_doc.json``` Full documentation on how to use the api and what it supports.

This documentation is accessible at [http://it2810-07.idi.ntnu.no:9001/api](http://it2810-07.idi.ntnu.no:9001/api)


##List of all dependencies
####project:

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

####api:

* body-parser
* form-data
* node-fetch
* query-string
* express-rest-response
* mysql
* nodemon

For more information about our dependencies look them up at  [https://www.npmjs.com/](https://www.npmjs.com/)
