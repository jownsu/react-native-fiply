const PostReducer = (state, action) => {
    switch (action.type) {
        case 'GET_POSTS':
            return {
                ...state,
                posts: action.payload,
            }

        case 'MORE_POSTS':
            return {
                ...state,
                posts: {
                    ...state.posts,
                    data: [...state.posts.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'ADD_POST':
            return {
                ...state,
                posts: {
                    ...state.posts,
                    data: [
                        { ...action.payload, upVotes_count: 0, comments_count: 0 },
                        ...state.posts.data,
                    ],
                },
            }

        case 'UPDATE_POST':
            return {
                ...state,
                posts: {
                    ...state.posts,
                    data: [
                        ...state.posts.data.map((item) => {
                            if (item.id == action.payload.id) {
                                return { ...item, ...action.payload }
                            }
                            return item
                        }),
                    ],
                },
            }

        case 'DELETE_POST':
            return {
                ...state,
                posts: {
                    ...state.posts,
                    data: [...state.posts.data.filter((item) => item.id != action.payload)],
                },
            }

        case 'TOGGLE_UPVOTE':
            return {
                ...state,
                posts: {
                    ...state.posts,
                    data: [
                        ...state.posts.data.map((item) => {
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
                    ],
                },
            }

        case 'GET_UPVOTES':
            return {
                ...state,
                upVotes: action.payload,
            }

        case 'MORE_UPVOTES':
            return {
                ...state,
                upVotes: {
                    ...state.upVotes,
                    data: [...state.upVotes.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'RESET_POSTS':
            return {
                ...state,
                posts: {
                    ...state.posts,
                    data: [],
                },
                loading: false,
            }

        case 'RESET_UPVOTES':
            return {
                ...state,
                upVotes: {
                    ...state.upVotes,
                    data: [],
                },
                loading: false,
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }

        case 'STOP_LOADING':
            return {
                ...state,
                loading: false,
            }

        default:
            return state
    }
}

export default PostReducer
