const FollowReducer = (state, action) => {
    switch (action.type) {
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

        case 'SET_TO_PENDING_FROM_FOLLOWING_ITEM':
            return {
                ...state,
                following: {
                    ...state.following,
                    data: [
                        ...state.following.data.map((item) => {
                            if (item.id == action.payload) {
                                return {
                                    ...item,
                                    is_following_pending: true,
                                }
                            }
                            return item
                        }),
                    ],
                },
            }

        case 'SET_TO_PENDING_FROM_FOLLOWER_ITEM':
            return {
                ...state,
                followers: {
                    ...state.followers,
                    data: [
                        ...state.followers.data.map((item) => {
                            if (item.id == action.payload) {
                                return {
                                    ...item,
                                    is_following_pending: true,
                                }
                            }
                            return item
                        }),
                    ],
                },
            }

        case 'SET_TO_FOLLOW_FROM_FOLLOWING_ITEM':
            return {
                ...state,
                following: {
                    ...state.following,
                    data: [
                        ...state.following.data.map((item) => {
                            if (item.id == action.payload) {
                                return {
                                    ...item,
                                    is_following_pending: false,
                                    is_following: false,
                                }
                            }
                            return item
                        }),
                    ],
                },
            }

        case 'SET_TO_FOLLOW_FROM_FOLLOWER_ITEM':
            return {
                ...state,
                followers: {
                    ...state.followers,
                    data: [
                        ...state.followers.data.map((item) => {
                            if (item.id == action.payload) {
                                return {
                                    ...item,
                                    is_following_pending: false,
                                    is_following: false,
                                }
                            }
                            return item
                        }),
                    ],
                },
            }

        case 'REMOVE_FOLLOWING':
            return {
                ...state,
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

export default FollowReducer
