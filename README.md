# Grean Cloud - Register login

This project was generated with 

- [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

- Using express

- Data base mongo DB (local):
  - mongoDB Community server [Community Server](https://www.mongodb.com/try/download/community)  
  - MongoDB Compass Download (GUI) version 1.44.3  [Mongo Compass](https://www.mongodb.com/try/download/compass)  


## Development server

***recommendation***, run visual studio in administrator before using `ng serve` To start the development server, run:

```
npm install
npm update
ng serve
ng serve --open //abre directamente en el explorador
```

Navigate to http://localhost:4200/. The application will automatically reload if you change any of the source files.

## Backend server

To start the backend server, run:

```
cd backend
node app.js
```
Navigate to http://localhost:5000/. to check if the backend server is running

###  Common error => *EBUSY: resource busy or locked*

If you encounter this error:

  1. open Visual Studio Code in administration mode.
  2. Or, try the following commands:

```
npm cache clean --force
npm install --cache
```
If these commands don’t work, try deleting the temporary data in %temp%. Press Windows + R, type %temp%, and delete the files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
