const NotificationReducer = (state, action) => {
    switch (action.type) {
        case 'GET_NOTIFICATIONS':
            return {
                ...state,
                notifications: action.payload,
            }

        case 'DELETE_NOTIFICATION':
            return {
                ...state,
                notifications: [...state.notifications.filter((item) => item.id != action.payload)],
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

export default NotificationReducer
