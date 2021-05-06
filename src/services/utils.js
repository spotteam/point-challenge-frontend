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

export const fetchPosts = (userId, setTweets) => {
  const graphqlUrl = "http://localhost:8080/graphql"
  console.log(graphqlUrl)
  fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({query: "{ posts(userId: " + userId + ") { id createdAt content } }"})
  })
    .then(r => r.json())
    .then(data => {
      console.log('data returned:', data)
      console.log(data.data.posts)
      if (data !== undefined && data.data !== undefined && data.data.posts !== undefined) {
        console.log('populating posts')
        setTweets(data.data.posts.reverse())
      }
    });
}

export const createPost = (userId, content, addTweetToList) => {
  const graphqlUrl = "http://localhost:8080/graphql"
  console.log(graphqlUrl)

  var query = `mutation CreatePost($userId: Int, $content: String) {
    createPost(userId: $userId, content: $content) {
      id
      createdAt
      content
    }
  }`;
  fetch(graphqlUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({
      query,
      variables: {
        userId: userId,
        content: content,
      }
    })
  })
    .then(r => r.json())
    .then(data => {
      console.log('data returned:', data)
      console.log(data.data.createPost)
      if (data !== undefined && data.data !== undefined && data.data.createPost !== undefined) {
        console.log('adding post')
        addTweetToList(data.data.createPost)
      }
      // props.addTweetToList({
      //   id: Date.now(), // TODO change this to id from backend
      //   createdAt: Date.now(),
      //   user: "saadnsyed",
      //   content: tweet,
      // });
    });
}