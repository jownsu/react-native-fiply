const CommunityReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return {
                ...state,
                users: action.payload,
            }

        case 'MORE_USERS':
            return {
                ...state,
                users: {
                    ...state.users,
                    data: [...state.users.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'REMOVE_USER':
            return {
                ...state,
                users: {
                    ...state.users,
                    data: [...state.users.data.filter((item) => item.id != action.payload)],
                },
            }

        case 'GET_FOLLOWED_USERS':
            return {
                ...state,
                followedUsers: action.payload,
            }

        case 'MORE_FOLLOWED_USERS':
            return {
                ...state,
                followedUsers: {
                    ...state.followedUsers,
                    data: [...state.followedUsers.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'GET_FOLLOWER_REQUESTS':
            return {
                ...state,
                followerRequests: action.payload,
            }

        case 'MORE_FOLLOWER_REQUESTS':
            return {
                ...state,
                followerRequests: {
                    ...state.followerRequests,
                    data: [...state.followerRequests.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'REMOVE_FOLLOWER_REQUEST':
            return {
                ...state,
                followerRequests: {
                    ...state.followerRequests,
                    data: [
                        ...state.followerRequests.data.filter((item) => item.id != action.payload),
                    ],
                },
            }

        case 'GET_PENDING_REQUESTS':
            return {
                ...state,
                pendingRequests: action.payload,
            }

        case 'MORE_PENDING_REQUESTS':
            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests,
                    data: [...state.pendingRequests.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'REMOVE_PENDING_REQUEST':
            return {
                ...state,
                pendingRequests: {
                    ...state.pendingRequests,
                    data: [
                        ...state.pendingRequests.data.filter((item) => item.id != action.payload),
                    ],
                },
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

export default CommunityReducer
