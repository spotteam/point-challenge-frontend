/**
 *
 * @param string token
 * @param string query
 * @param object variables
 * @returns A promise resolving the graphql response to JSON
 */
const fetchGraphQLJSONResponse = (token, query, variables) => {
  const graphqlUrl = "http://localhost:8080/secure/graphql";
  return fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': "Bearer " + token,
    },
    body: JSON.stringify({
      query,
      variables,
    })
  }).then(r => r.json());
}

/**
 *
 * @param string token
 * @param func callback
 * Queries the backend for tweets over graphql.
 * Callback saves tweets and email in state at the top level component.
 */
export const fetchPosts = (token, callback) => {
  const query = `
    query {
      posts {
        id
        createdAt
        content
      }
      user {
        email
      }
    }
  `;

  fetchGraphQLJSONResponse(token, query, {})
    .then(data => {
      if (
        data !== undefined &&
        data.data !== undefined &&
        data.data.posts !== undefined &&
        data.data.user !== undefined &&
        data.data.user.email !== undefined
      ) {
        callback(true, data.data.posts.reverse(), data.data.user.email);
      } else {
        callback(false);
      }
    })
    .catch(e => {
      callback(false);
    });
}

/**
 *
 * @param string token
 * @param string content
 * @param func addTweetToList
 * Fires a mutation over graphql to create a tweet and adds the tweet to
 * state if successful.
 */
export const createPost = (token, content, addTweetToList) => {
  const query = `mutation CreatePost($content: String) {
    createPost(content: $content) {
      id
      createdAt
      content
    }
  }`;

  fetchGraphQLJSONResponse(token, query, {
    content: content,
  })
    .then(data => {
      if (
        data !== undefined &&
        data.data !== undefined &&
        data.data.createPost !== undefined
      ) {
        addTweetToList(data.data.createPost);
      }
    });
}

/**
 *
 * @param string token
 * @param int postId
 * @param string content
 * @param func updateTweet
 * Fires a mutation over graphql to modify a tweet's content and updates state
 * if successful.
 */
export const editPost = (token, postId, content, updateTweet) => {
  const query = `mutation EditPost($postId: Int, $content: String) {
    editPost(postId: $postId, content: $content) {
      id
      createdAt
      content
    }
  }`;

  fetchGraphQLJSONResponse(token, query, {
    postId: postId,
    content: content,
  })
    .then(data => {
      if (
        data !== undefined &&
        data.data !== undefined &&
        data.data.editPost !== undefined
      ) {
        updateTweet(postId, data.data.editPost.content);
      }
    });
}

/**
 *
 * @param string token
 * @param int postId
 * @param func deleteTweet
 * Fires a mutation over graphql to delete a tweet and updates state
 * if successful.
 */
export const deletePost = (token, postId, deleteTweet) => {
  const query = `mutation DeletePost($postId: Int) {
    deletePost(postId: $postId)
  }`;

  fetchGraphQLJSONResponse(token, query, {
    postId: postId,
  })
    .then(_data => {
      deleteTweet(postId);
    });
}

/**
 *
 * @param string email
 * @param string password
 * @param func setJwt
 * Posts to the backend signup endpoint and fires a callback to save the token
 * in state and fetch posts if successful.
 */
export const signUp = (email, password, setJwt) => {
  const signupUrl = "http://localhost:8080/signup"
  fetch(signupUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({email: email, password: password})
  })
    .then(r => {
      if (r.status !== 200) {
        // Log this error in the future.
      } else {
        login(email, password, setJwt);
      }
    });
}

/**
 *
 * @param string email
 * @param string password
 * @param func setJwt
 * Posts to the backend login endpoint and fires a callback to save the token
 * in state and fetch posts if successful.
 */
export const login = (email, password, setJwt) => {
  const loginUrl = "http://localhost:8080/login"
  fetch(loginUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({email: email, password: password})
  })
    .then(r => {
      if (r.status === 400) {
        // Log this error in the future.
        // Typically this fires when the email/password is wrong.
      }
      return r.json()
    })
    .then(data => {
      if (data !== undefined && data.token !== undefined) {
        setJwt(data['token']);
      }
    })
}