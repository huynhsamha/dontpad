# dontpad

Advanced Dontpad - Editor online without identity

Deploy on Heroku App: [https://dontpad.herokuapp.com/](https://dontpad.herokuapp.com/)

Examples:

- [https://dontpad.herokuapp.com/github.com](https://dontpad.herokuapp.com/github.com)
- [https://dontpad.herokuapp.com/python](https://dontpad.herokuapp.com/python)

## Features

- Don't login, just use a URL
- Don't save, any changes is auto-saved
- Format font-style, font-family, font-size, color
- Format paragraph, headings, code, align, list
- Insert link, image, table, video, file, symbol
- Support familiar and utility shortcut
- Support render to HTML code, Preview and Print
- Realtime, don't refresh page when your friends change
- Private, Security and No Advertising

## Introduciton

### Frontend Platforms

Using ReactJS, Socket.IO (realtime), Froala Editor

### Backend Platforms

Using NodeJS, Socket.IO (realtime)

### Database and Deployment

Using Heroku (Host, Domain), MongoDB (mongoose), Mongo Atlas (Cloud)

## Quickstart

- Clone source code to your local

```bash
git clone https://github.com/huynhsamha/dontpad.git
```

- Install npm packages

```bash
npm i
# or
yarn
```

### Development

#### Start server NodeJS

At root of project

```bash
npm start
# or
yarn start
```

Now server is running on http://localhost:4200

#### Start client ReactJS

At root of project

```bash
cd client/

npm start
# or
yarn start
```

Now we can open browser at http://localhost:3000.

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

At root of project, run server NodeJS at port 4200:

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

On your browser, open http://localhost:4200 to view the dontpad application

## Deploy on Heroku

### Configure on Heroku

- Login or sign up new account on heroku
- Add new application
- At local, create new directory for heroku
- Copy directory server to the above directory
- Remove `.git` in new directory
- At new directory, initialize new git by `git init`
- At heroku, create new git for app
- Install heroku at local machine (if you haven't done yet)
- Login heroku account at local machine: `heroku login` (if you haven't done yet)
- Remote local to heroku by `git remote add heroku [your git url]`

### Configure database MongoDB on Mongo Atlas

- Login or sign up new account on Mongo Atlas
- Create new cluster and new database
- In the options (collections, users, ...) in tabs at new database, choose option users
- Create a new user with difficult password
- Get uri mongo on Atlas and change `<dbuser>` and `<dbpassword>` with new user created.
- Copy the uri to file `.env` at local directory
- Now you can commit and deploy to heroku

### Commit and Deploy

- Commit all changes and deploy to heroku:

```bash
git status
git add -A
git commit -m "first deploy"
git push heroku master
```

- Now, you can open the herokuapp to view your achievement.

## Donate

<a href="https://www.paypal.me/harisk305/5" target="_blank"><img src="https://i.imgur.com/4bN8fdy.jpg" alt="Donate to my paypal" width=180></a>
