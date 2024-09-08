# Grean Cloud - Register login

This project was generated with 

- [Angular CLI](https://github.com/angular/angular-cli) version 17.3.9.

- Base de datos mongo DB (local):
  - mongoDB Community server [Community Server](https://www.mongodb.com/try/download/community)  
  - MongoDB Compass Download (GUI) version 1.44.3  [Mongo Compass](https://www.mongodb.com/try/download/compass)  


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.
using express

```
npm install
npm update
ng serve
ng serve --open //abre directamente en el explorador
```

## Backend run

Run `backend` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

```
cd backend
node app.js
```

## Common error

EBUSY: resource busy or locked, you can try "ng serve" in admi mode vsc or fix whit the following comands: 

```
npm cache clean --force?
npm install --cache
```
if dosent work you can try deleting the temporal data of %temp% `windows + R` put `%temp%` and delete.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.
