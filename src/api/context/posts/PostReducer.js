const PostReducer = (state, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                posts: action.payload.data,
                nextPath: action.payload.links.next,
                loading: false,
            }
        case 'MORE_POSTS':
            return {
                ...state,
                posts: [...state.posts, ...action.payload.data],
                nextPath: action.payload.links.next,
                loading: false,
            }

        case 'ADD_POST':
            return {
                ...state,
                posts: [action.payload, ...state.posts],
                loading: false,
            }
        case 'UPDATE_POST':
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item.id == res.data.data.id) {
                        return { ...item, ...action.payload }
                    }
                    return item
                }),
                loading: false,
            }

        case 'DELETE_POST':
            return {
                ...state,
                posts: state.posts.filter((item) => item.id != action.payload),
                loading: false,
            }

        case 'TOGGLE_UPVOTE':
            return {
                ...state,
                posts: state.posts.map((item) => {
                    if (item.id == action.payload.id) {
                        return {
                            ...item,
                            is_upVoted: action.payload.data,
                            upVotes_count: action.payload.data
                                ? item.upVotes_count + 1
                                : item.upVotes_count - 1,
                        }
                    }
                    return item
                }),
                loading: false,
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }
        default:
            return state
    }
}

export default PostReducer
