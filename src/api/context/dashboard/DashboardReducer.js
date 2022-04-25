const DashboardReducer = (state, action) => {
    switch (action.type) {
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

export default DashboardReducer
