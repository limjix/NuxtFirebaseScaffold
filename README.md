# NuxtFirebaseScaffold

> App to demonstrate how to integrate with firebase auth, firestore and functions. Also, generated with Vuetify properly setup as a responsive app with login page, signup page and home page with theme colours ready to go out of the box.
>
> Basically, all I did was to use create-nuxt-app, then deleted the stock pages and images, created a signup, login and home page. Created a user store + plugins + middleware for route guarding. Changed the default layout to a normal app layout with a sidebar, navbar and footer. Then added all the integrations in to get a basic app ready to go.
>
> Hope this helps! Contact me if you have an issue!

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate

# Deploy to firebase hosting
$ npm run deploy

# Deploy firebase hosting + cloud functions
$ npm run deployall

#More information can be found in the package.json file
```

# Things you need to do:

1. Go to /firebase/init.js and add your project information + api keys there
2. Edit package.json to change the app name and description to your own
3. In store/user.js and in the signup/index.vue page, specify what information the user keys in for signup for their account