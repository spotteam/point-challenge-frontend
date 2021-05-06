const fetchGraphQLJSONResponse = (token, query, variables) => {
  const graphqlUrl = process.env.REACT_APP_BACKEND_URI + '/secure/graphql';
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
      if (data !== undefined && data.data !== undefined && data.data.createPost !== undefined) {
        addTweetToList(data.data.createPost);
      }
    });
}

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
      if (data !== undefined && data.data !== undefined && data.data.editPost !== undefined) {
        updateTweet(postId, data.data.editPost.content);
      }
    });
}

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

export const signUp = (email, password, setJwt) => {
  const signupUrl = process.env.REACT_APP_BACKEND_URI + "/signup"
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
        // error handle
      } else {
        login(email, password, setJwt)
      }
    });
}

export const login = (email, password, setJwt) => {
  const loginUrl = process.env.REACT_APP_BACKEND_URI + "/login"
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
        // password/email wrong, set error message
      }
      return r.json()
    })
    .then(data => {
      if (data !== undefined && data.token !== undefined) {
        setJwt(data['token']);
      }
    })
}