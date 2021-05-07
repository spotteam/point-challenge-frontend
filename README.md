# Context

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

An explanation of the important components and tradeoffs in the src/ directory. The website is hosted publicly [here](https://spotteam.github.io/point-challenge-frontend/).

src/

* App.js
  * This is the top level component managing our UI.
  * On mount, it checks to see if a login token is cached in local storage (in order to persist login when the user closes the tab). If there is a token, it queries for posts on the backend. If this query fails, we assume the authentication failed and render the app in a logged out state. If it succeeds, we render the tweets and the TweetComposer.
    * The token being cached in local storage leaves the app open to XSS attacks if malicious actors inject code into the JS (or if a 3rd party library we are using, such as react-bootstrap, has a vulnerability). A more secure option is to use cookies. Cookies are still vulnerable to CSRF attacks (since the cookie is passed with every request) unless you do some extra legwork (adding anti CSRF tokens, using sameSite flags, etc). We went with local storage for now since this is a proof of concept, it was fast, and has good support from native JS APIs.
    * We don’t have any token refresh logic on the frontend.
  * components/
    * TweetComposer/
      * This includes the JS and CSS for the tweet composer. It gets the token from App.js and posts to the createPost endpoint.
    * TweetCard/
      * This includes the JS and CSS for rendering an individual tweet. Tweets can be edited or deleted. They render with the user’s email, a created timestamp, and the content of the tweet.
    * SignUp/
      * This controls the sign up and login view. Users can toggle between those 2 panes. On a successful sign up or login the user is navigated to the view with the TweetComposer and the tweet feed. On failure an error message renders.
    * services/
      * utils.js
      * This includes all the API calls to the backend

## How to Run

```
npm install
npm run build:prod
npm start
```

You can use `npm run build:dev` instead at the second step if you are also running the backend locally
