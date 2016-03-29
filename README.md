# Instructions related to the Expressjs based Node web app

## Prerequisites :

* Nodejs : Install the latest version of nodejs from https://nodejs.org/
* Mongodb : Install the latest version of mongodb from https://www.mongodb.org/
* npm

## To add all the dependencies in the app:

```
$ npm install
```


## Steps to load the mongodb and related data

(I recommend installing mongodb from Homebrew on Mac as that is really hassle free.)

https://docs.mongodb.org/manual/tutorial/install-mongodb-on-os-x/

https://docs.mongodb.org/manual/tutorial/install-mongodb-on-windows/

To start mongodb, open cmd.exe and navigate to bin directory under mongodb installation directory and type mongod.exe (mongod on Mac) . This will start mongodb database daemon, databases will be stored in the data directory you have chosen as part of mongodb installation.

If you want to store databases in a different folder, type the following command. (I recommend this)
type  :

````
mongod.exe --dbpath <path to the data folder>
````

Additional info to debug mongo :

* To see what is on mongo db for the app:

1) Open a new cmd window after starting mongo server in the above step,  On Mac type

````
$ mongo
````

In Windows, go to the folder having mongo.exe and run mongo.exe as an administrator which should open a command prompt.

2) To see database being used
````
>show dbs
````

3) To go to database for the app
````
>use sanjana_db
````

4) To see tables aka collections in the db
````
> show collections
````

5) To show all records in a particular table or collection in the db
````
>db.[collection name].find().pretty()
````


## Steps to run the app on Node JS

* Go to the root directory
* Type the following to run the app at http://localhost:54321
````

$ node app.js
````
* Type the following to run the app at http://localhost:[PORT_NUMBER]
NOTE: You have to enter a 5 digit number in place of [PORT_NUMBER]
````

$ node app.js [PORT_NUMBER]
````

More about the app :

Our deliverable is a prototype web application, built on top of Node.js. Node is an event-driven framework for server-side JavaScript, based on Google’s V8 engine. It is open-source and under active development; in addition, it has enjoyed great popularity recently and there is thus no short- age of libraries and learning resources. More information can be found at http://nodejs.org/.

We make use of MongoDB, a document database, to store persistent data, such as the attribute vectors for images and destinations. MongoDB is not related to SQL; it stores untyped ‘documents’ in ‘collections’ (compare SQL: typed ‘rows’ in ‘tables’). Despite being untyped, MongoDB is very high-performance, and because the document syntax is JSON, it’s easy to store and retrieve JavaScript objects. More information about MongoDB can be found at https://www.mongodb.org/.

The client-side is implemented in jQuery. JQuery is a JavaScript library that embeds a functional domain-specific language for document traversal, manipulation, event-handling, AJAX, and more. More information here: http://jquery.com/.


In addition to Node.js and MongoDB, the following Node.js libraries are required for operation. See the Installation section for instructions on how to install them.

* Express(http://expressjs.com/):lightweightwebapplicationframe-
work
* Express Handlebars (https://github.com/ericf/express-handlebars): A specialised Handlebars view engine for Express
* HBS (https://www.npmjs.com/package/hbs):Default view engine to be used in Express
* Mongodb (https://www.npmjs.com/package/mongodb): The official MongoDB driver for Node.js. Provides a high-level API on top of mongodb-core that is meant for end users.
* Mongoose(http://mongoosejs.com/):MongoDB interface with schema-based object modeling
* Body-Parser
* Express-Session
