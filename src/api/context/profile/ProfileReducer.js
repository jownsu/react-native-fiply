const ProfileReducer = (state, action) => {
    switch (action.type) {
        case 'GET_USER_INFO':
            return {
                ...state,
                userInfo: action.payload,
                loading: false,
            }

        case 'GET_EXPERIENCES':
            return {
                ...state,
                experiences: action.payload,
                loading: false,
            }

        case 'GET_EDUCATIONAL_BACKGROUNDS':
            return {
                ...state,
                educationalBackgrounds: action.payload,
                loading: false,
            }

        case 'UPDATE_AVATAR':
            return {
                ...state,
                userInfo: { ...state.userInfo, avatar: action.payload },
                loading: false,
            }

        case 'UPDATE_COVER':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    cover: action.payload,
                },
                loading: false,
            }

        case 'GET_FOLLOWERS':
            return {
                ...state,
                followers: action.payload,
                loading: false,
            }

        case 'MORE_FOLLOWERS':
            return {
                ...state,
                followers: {
                    ...state.followers,
                    data: [...state.followers.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
                loading: false,
            }

        case 'REMOVE_FOLLOWER':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    followers_count: state.userInfo.followers_count - 1,
                },
                followers: {
                    ...state.followers,
                    data: [...state.followers.data.filter((item) => item.id != action.payload)],
                    meta: {
                        ...state.followers.meta,
                        total: state.followers.meta.total - 1,
                    },
                },
                loading: false,
            }

        case 'GET_FOLLOWING':
            return {
                ...state,
                following: action.payload,
                loading: false,
            }

        case 'MORE_FOLLOWING':
            return {
                ...state,
                following: {
                    ...state.following,
                    data: [...state.following.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
                loading: false,
            }

        case 'REMOVE_FOLLOWING':
            return {
                ...state,
                userInfo: {
                    ...state.userInfo,
                    following_count: state.userInfo.following_count - 1,
                },
                following: {
                    ...state.following,
                    data: [...state.following.data.filter((item) => item.id != action.payload)],
                    meta: {
                        ...state.following.meta,
                        total: state.following.meta.total - 1,
                    },
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

export default ProfileReducer
