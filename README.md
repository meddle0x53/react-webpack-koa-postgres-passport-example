# koa-react-full-example

Full example using Koa, React, Passport, Postgres, Webpack and Mocha

This example contains a MVC pattern that presents a simple counter to the client that increments and decrements a value in the Postgres Database. The UI is all handled with ReactJS. It uses the yield keyword from ES6.

This projects uses bleeding-edge technology.

### Prerequisite

* [NodeJS](http://nodejs.org/download/) > 0.11.16 || 0.12
* [npm](https://www.npmjs.org/)
* [Postgres](http://www.postgresql.org/download)

### Installation

0. Checkout in a directory
0. `npm install`
0. Try it and ensure tests pass with `npm run build && npm test`

### Running the project

To run the project, you need two terminals.

0. In the first terminal run `npm run hot-dev-server`
0. In the second terminal run `npm start`
0. Try access `localhost:3000` You should normally get the login page.
0. Create a user using the sign up page "#/signup". It should log you in automatically and you should be redirected to the counter

### Build commands

**Static Build**

`npm run build`

**Running Prod**

`npm run prod`

**Run Tests**

`npm run build && npm test`

### License

The plugin is under MIT license, please see the LICENSE file provided with the module.
