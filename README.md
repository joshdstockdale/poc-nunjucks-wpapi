# Proof of Concept
A simple and light-weight application using nunjucks to create a super fast frontend to use with Wordpress API. Wordpress would no longer need to render pages but simply respond with JSON thus reducing server side resources significantly. Also, if local json files were created on "publish post" Wordpress would not need to be exposed for direct public access and would reduce any processing done by Wordpress even more.

## Get Started
1. **Install [Node Latest](https://nodejs.org)**
3. **Install Node Packages.** - `npm install`
4. **Install Node Packages.** - update src/config.*.json files
5. **Run the app.** - `npm run local` || `npm run dev` ||`npm run build`
This will run the automated build process, start up a webserver, and open the application in your default browser. When doing development with this kit, this command will continue watching files all your files. Every time you hit save the code is rebuilt, linting runs, and tests run automatically. All production builds go into /dist folder.

