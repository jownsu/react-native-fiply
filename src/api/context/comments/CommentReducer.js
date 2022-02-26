const CommentReducer = (state, action) => {
    switch (action.type) {
        case 'GET_COMMENTS':
            return {
                ...state,
                comments: action.payload.data,
                details: action.payload.details,
                loading: false,
            }

        case 'ADD_COMMENT':
            return {
                ...state,
                comments: [
                    ...state.comments,
                    {
                        ...action.payload.data,
                        commented_by: action.payload.user.fullname,
                        avatar: action.payload.user.avatar,
                    },
                ],
                loading: false,
            }

        case 'RESET_COMMENT':
            return {
                comments: [],
                details: {},
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
