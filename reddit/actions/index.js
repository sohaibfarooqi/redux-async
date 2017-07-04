import fetch from 'isomorphic-fetch'

/**
Action Constants. Following actions are permissiable 
user actions.
**/
export const REQUEST_POST = 'REQUEST_POST'
export const RECEIVE_POST = 'RECEIVE_POST'
export const SELECT_SUBREDDIT = 'SELECT_SUBREDDIT'
export const INVALIDATE_SUBREDDIT = 'INVALIDATE_SUBREDDIT'

/**
This action is invoked when user select
a specific subreddit for the list.
**/
export cosnt selectSubreddit = subreddit => {
	return {
		type: SELECT_SUBREDDIT,
		subreddit
	}
}

/**
This action is performed when user refresh the
subreddit list.
**/
export const invalidateSubreddit = subreddit => {
	return {
		type: INVALIDATE_SUBREDDIT,
		subreddit
	}
}

const receivePosts = ({subreddit, json}) => {
	return {
		type: RECEIVE_POST,
		subreddit,
		post: json.data.children.map(child => child.data),
		receivedAt: Date.now()
	}
}

const requestPosts = subreddit => {
	return {
		type: REQUEST_POST,
		subreddit
	}
}

/**
Invoke Reddit's API to fetch list of posts
against a subreddit.
**/
const fetchPosts = subreddit => {
	return dispatch => {
		dispatch(requestPosts(subreddit))
		return fetch(`https://www.reddit.com/r/${subreddit}.json`)
		.then(response => response.json())
		.then(json => dispatch(receivePosts(subreddit, json)))
	}
}

const shouldFetchPosts = ({state, subreddit}) => {
	const posts = state.postsBySubreddit[subreddit]
	if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export const fetchPostsIfNeeded = subreddit => {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
