const fetchGraphQLJSONResponse = (token, query, variables) => {
  const graphqlUrl = "http://localhost:8080/secure/graphql";
  console.log('AUTH TOKEN', token)
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

export const fetchPosts = (token, setTweets) => {
  const query = `
    query Posts {
      posts {
        id
        createdAt
        content
      }
    }
  `;

  fetchGraphQLJSONResponse(token, query, {})
    .then(data => {
      console.log('fetch posts response', data)
      if (data !== undefined && data.data !== undefined && data.data.posts !== undefined) {
        setTweets(data.data.posts.reverse());
      }
    })
    .catch(e => {
      console.log('fetch post errored out', e)
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
      console.log(r)
      if (r.status !== 400) {
        // email already exists. set error message
      } else {
        login(email, password, setJwt)
      }
    });
}

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
        // password/email wrong, set error message
      }
      return r.json()
    })
    .then(data => {
      console.log('data from login', data)
      setJwt(data['token'])
    })
}