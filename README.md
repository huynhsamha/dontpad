# dontpad
Advanced Dontpad - Editor online without identity


Deploy on Heroku App: [https://dontpad.herokuapp.com/](https://dontpad.herokuapp.com/)

Some pages demo:
+ [https://dontpad.herokuapp.com/github.com](https://dontpad.herokuapp.com/github.com)
+ [https://dontpad.herokuapp.com/python](https://dontpad.herokuapp.com/python)


## Features
+ Don't login, just use a URL
+ Don't save, any changes is auto-saved
+ Format font-style, font-family, font-size, color
+ Format paragraph, headings, code, align, list
+ Insert link, image, table, video, file, symbol
+ Support familiar and utility shortcut
+ Support render to HTML code, Preview and Print
+ Realtime, don't refresh page when your friends change
+ Private, Security and No Advertising


## Front-End Platforms
Using ReactJS, Socket.IO (realtime), Froala Editor

## Back-end Platforms
Using NodeJS, Socket.IO (realtime)

## Database and Deployment
Using Heroku (Host, Domain), MongoDB (mongoose), Mlab (Cloud)

## Quickstart
+ Clone source code to your local

### Development

#### Start Server NodeJS
At root of project
```bash
npm start
# or
yarn start
```
That will run on localhost:4200

#### Start Client ReactJS
At root of project
```bash
cd client/

npm start
# or
yarn start
```
That will run on localhost:3000. On your browser, should run on port 4200


#### Database MongoDB
At root of project
```bash
touch .env
```
Create file `.env` with the following line:
```bash
URI_MONGO=mongodb://localhost/dontpad
```
Change the URI Mongo for your production


### Testing and Deployment
At root of project, run server nodeJS at port 4200 by
```bash
cd client/

### build frontend reactjs
npm run build
# or
yarn build

### start server nodejs
# return to root of project
cd ..

npm start
# or 
yarn start
```
On your browser, open localhost:4200 to view the dotnpad


## Deploy on Heroku
### Configure on Heroku
+ Login or sign up new account on heroku
+ Add new application
+ At local, create new directory for heroku
+ Copy directory server to the above directory
+ Remove `.git` in new directory
+ At new directory, initialize new git by `git init`
+ At heroku, create new git for app
+ Install heroku at local machine (if you haven't done yet)
+ Login heroku account at local machine: `heroku login` (if you haven't done yet)
+ Remote local to heroku by `git remote add heroku [your git url]`

### Configure database MongoDB on Mlab
+ Login or sign up new account on Mlab
+ Create new database
+ In the options (collections, users, ...) in tabs at new database, choose option users 
+ Create a new user with difficult password
+ Get uri mongo on mlab and change `<dbuser>` and `<dbpassword>` with new user created.
+ Copy the uri to file `.env` at local directory
+ Now you can commit and deploy to heroku

### Commit and Deploy
+ Commit all changes and deploy to heroku:
```bash
git status
git add -A
git commit -m "first deploy"
git push heroku master
```
+ Now, you can open the herokuapp to view your achievement.

## Donate

<a href="https://www.buymeacoffee.com/harisk" target="_blank"><img src="https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png" alt="Buy Me A Coffee" style="height: auto !important;width: auto !important;" ></a>
