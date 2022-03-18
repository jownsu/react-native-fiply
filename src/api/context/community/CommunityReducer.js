const CommunityReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload.data,
                nextPath: action.payload.links.next,
                loading: false,
            }
        case 'MORE_USERS':
            return {
                ...state,
                users: [...state.users, ...action.payload.data],
                nextPath: action.payload.links.next,
                loading: false,
            }
        case 'GET_FOLLOWED_USERS':
            return {
                ...state,
                users: action.payload.data,
                nextPath: action.payload.links.next,
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

export default CommunityReducer
