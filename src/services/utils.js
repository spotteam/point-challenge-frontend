const fetchGraphQLJSONResponse = (query, variables) => {
  const graphqlUrl = "http://localhost:8080/graphql";
  return fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables,
    })
  }).then(r => r.json());
}

export const fetchPosts = (userId, setTweets) => {
  const query = `
    query Posts($userId: Int) {
      posts(userId: $userId) {
        id
        createdAt
        content
      }
    }
  `;

  fetchGraphQLJSONResponse(query, { userId: userId })
    .then(data => {
      if (data !== undefined && data.data !== undefined && data.data.posts !== undefined) {
        setTweets(data.data.posts.reverse());
      }
    });
}

export const createPost = (userId, content, addTweetToList) => {
  const query = `mutation CreatePost($userId: Int, $content: String) {
    createPost(userId: $userId, content: $content) {
      id
      createdAt
      content
    }
  }`;

  fetchGraphQLJSONResponse(query, {
    userId: userId,
    content: content,
  })
    .then(data => {
      if (data !== undefined && data.data !== undefined && data.data.createPost !== undefined) {
        addTweetToList(data.data.createPost);
      }
    });
}

export const editPost = (userId, postId, content, updateTweet) => {
  const query = `mutation EditPost($userId: Int, $postId: Int, $content: String) {
    editPost(userId: $userId, postId: $postId, content: $content) {
      id
      createdAt
      content
    }
  }`;

  fetchGraphQLJSONResponse(query, {
    userId: userId,
    postId: postId,
    content: content,
  })
    .then(data => {
      if (data !== undefined && data.data !== undefined && data.data.editPost !== undefined) {
        updateTweet(postId, data.data.editPost.content);
      }
    });
}

export const deletePost = (userId, postId, deleteTweet) => {
  const query = `mutation DeletePost($userId: Int, $postId: Int) {
    deletePost(userId: $userId, postId: $postId)
  }`;

  fetchGraphQLJSONResponse(query, {
    userId: userId,
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
      if (r.status !== 200) {
        // error handle
      } else {
        login(email, password, setJwt)
      }
    })
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
      if (r.status != 200) {
        // error handle
      }
      return r.json()
    })
    .then(data => {
      setJwt(data['token'])
    })
}