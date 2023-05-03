# Virtual denominational meetings manager for Roblox.
> This app was created for the purpose of completing the software engineering course.

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com)

<img src="Assets/APP_screenshot.png" alt="Game screeshot" width="100%">

## Technologies

- [Node](https://www.python.org/) (v16.15.1) - JavaScript runetime environment
- [Express](https://expressjs.com/) (v4.18.1) -  framework for building RESTful APIs with Node.js
- [Passport](https://www.passportjs.org/) (v0.6.0) - authentication middleware for Node.js
- [Angular](https://angular.io/) (v14.2.7) - framework for building single-page client applications using HTML and TypeScript

# Instruction
> General idea is to create local database with MongoDB, upload initial database structure, set up database related configs, install mandatory dependencies and run backend and frontend part of an app.

## Local database
> Prerequisites: install MongoDB and MongoDB Compass, and make sure that MongoDB Service is running on your machine.
1. Clone/pull repository
2. Open MongoDB Compass and create new connection: *mongodb://localhost:27017/fv*
3. Establish a connection
4. Create new database named: **roblox**
5. Inside fv database create two collections: **organizations** and **users**
6. For **organizations** collection import file *'database-initial/organizations.json'*
7. For **users** collection import file *'database-initial/users.json'*
8. You can close MongoDB Compass but be sure that MongoDB Service is running

## Database config

1. In *./backend/settings/common.json* file you can update variables if you want to deploy this app, or if you named database differently than it is said above
2. If you did everything like in instruction above you do not need to update anything

## Backend
> Prerequisites: install NodeJS version 16.15.1
1. Open *./backend/panel* folder
2. Run
```sh
$ npm install
```

## Frontend
> Prerequisites: as above
1. Open *./frontend* folder 
2. Run
```sh
$ npm install
```

# Usage

## Backend
1. Open *./backend/panel* folder
2. Run
```sh
$ npm run devStart
```
3. App will be listening at port *localhost:8080*

## Frontend
1. Open *./frontend* folder 
2. Run (in separate cmd)
```sh
$ ng serve
```
3. Frontend will be available under *http://localhost:4200/*

## Initial accounts
> Initially you can use two administrator accounts assigned for the same organization.
```sh
login: admin1
password: admin1
```
```sh
login: admin2
password: admin2
```

## License

All code is released under the [MIT](./LICENSE) License.

