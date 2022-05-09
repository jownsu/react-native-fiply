const DashboardReducer = (state, action) => {
    switch (action.type) {
        case 'SET_DASHBOARD':
            return {
                ...state,
                ...action.payload,
            }

        case 'SET_HIRING_MANAGERS':
            return {
                ...state,
                hiringManagers: action.payload,
            }

        case 'SET_HIRING_MANAGER':
            return {
                ...state,
                hiringManager: action.payload,
            }

        case 'ADD_HIRING_MANAGER':
            return {
                ...state,
                hiringManagers: [...state.hiringManagers, action.payload],
                total_hiring_manager: state.total_hiring_manager + 1,
            }

        case 'UPDATE_HIRING_MANAGER':
            return {
                ...state,
                hiringManagers: [
                    ...state.hiringManagers.map((item) => {
                        if (item.id == action.payload.id) {
                            return { ...item, ...action.payload }
                        }
                        return item
                    }),
                ],
                hiringManager: {},
            }

        case 'DELETE_HIRING_MANAGER':
            return {
                ...state,
                hiringManagers: state.hiringManagers.filter((item) => item.id != action.payload),
                hiringManager: {},
            }

        case 'ADD_JOB':
            return {
                ...state,
                total_job_posts: state.total_job_posts + 1,
            }

        case 'ADD_QUESTION':
            return {
                ...state,
                questionList: [...state.questionList, action.payload],
            }

        case 'REMOVE_QUESTION':
            return {
                ...state,
                questionList: [...state.questionList.filter((item, i) => i + 1 != action.payload)],
            }

        case 'CLEAR_QUESTION':
            return {
                ...state,
                questionList: [],
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
