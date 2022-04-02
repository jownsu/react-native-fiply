const CommentReducer = (state, action) => {
    switch (action.type) {
        case 'GET_COMMENTS':
            return {
                ...state,
                comments: action.payload,
                loading: false,
            }

        case 'MORE_COMMENTS':
            return {
                ...state,
                comments: {
                    ...state.comments,
                    data: [...state.comments.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
                loading: false,
            }

        case 'ADD_COMMENT':
            return {
                ...state,
                comments: {
                    ...state.comments,
                    data: [
                        ...state.comments.data,
                        {
                            ...action.payload.data,
                            commented_by: action.payload.user.fullname,
                            avatar: action.payload.user.avatar,
                        },
                    ],
                },
                loading: false,
            }

        case 'DELETE_COMMENT':
            return {
                ...state,
                comments: {
                    ...state.comments,
                    data: [...state.comments.data.filter((item) => item.id != action.payload)],
                },
                loading: false,
            }

        case 'RESET_COMMENT':
            return {
                comments: {},
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

export default CommentReducer
