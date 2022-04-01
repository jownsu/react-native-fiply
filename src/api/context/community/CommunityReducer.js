const CommunityReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
                loading: false,
            }
        case 'MORE_USERS':
            return {
                ...state,
                users: {
                    ...state.users,
                    data: [...state.users.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
                loading: false,
            }
        case 'GET_FOLLOWED_USERS':
            return {
                ...state,
                followedUsers: action.payload,
                loading: false,
            }
        case 'MORE_FOLLOWED_USERS':
            return {
                ...state,
                followedUsers: {
                    ...state.followedUsers,
                    data: [...state.followedUsers.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
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
