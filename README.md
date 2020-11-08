# RM-PhoneBook
This is a phone book application created for RentMojo assignment

## Technologies used
This application uses Node.js with Express Framework in the backend, Angular 9 as frontend client, Mongoose ODM and MongoDb for the
database

##  Prerequisites 
1. Angular CLI for building the app
2. Node.js for server runtime

## Setting up 
1. run `npm install` in `phoneBook` as well as `phoneBookServer` to install the dependencies
2. the mongodb URL in `configuration.js` in phoneBookServer folder
3. Set the `baseURL` in `services/httpClient` in `phoneBook` to the location where the node.js server is hosted.
If the appplication is hosted on the same location as the server, set `baseURL = ""`

## Deployment
1. Set up the Application as stated above
2. Generate the Angular production build by running commad `ng build --prod` in the phoneBook Directory
3. After the build is complete, copy the `dist` folder contents from phoneBook to the `dist` folder of phoneBookServer 
after deleting all the contents present in that directory .
4. Run the server

## Working Sample
The application is deployed at
https://rentmojo.uc.r.appspot.com/

## Known Issues
The search interface has issues with the search box visibility. 


