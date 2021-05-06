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

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `yarn build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
