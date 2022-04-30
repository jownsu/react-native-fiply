const DashboardReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DASHBOARD':
            return {
                ...state,
                ...action.payload,
            }

        case 'ADD_HIRING_MANAGER':
            return {
                ...state,
                total_hiring_manager: state.total_hiring_manager + 1,
            }

        case 'ADD_JOB':
            return {
                ...state,
                total_job_posts: state.total_job_posts + 1,
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

export default DashboardReducer
