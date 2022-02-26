const JobReducer = (state, action) => {
    switch (action.type) {
        case 'GET_JOBS':
            return {
                ...state,
                jobs: action.payload.data,
                nextPath: action.payload.links.next,
                loading: false,
            }

        case 'GET_JOB':
            return {
                ...state,
                job: action.payload,
                loading: false,
            }

        case 'MORE_JOBS':
            return {
                ...state,
                jobs: [...state.jobs, ...action.payload.data],
                nextPath: action.payload.links.next,
                loading: false,
            }

        case 'SET_LOADING':
            return {
                ...state,
                loading: true,
            }

        case 'TOGGLE_SAVED_JOB':
            return {
                ...state,
                jobs: state.jobs.map((item) => {
                    if (item.id == action.payload.id) {
                        return {
                            ...item,
                            is_saved: action.payload.data,
                        }
                    }
                    return item
                }),
            }

        case 'TOGGLE_APPLIED_JOB':
            return {
                ...state,
                jobs: state.jobs.map((item) => {
                    if (item.id == action.payload.id) {
                        return {
                            ...item,
                            is_applied: action.payload.data,
                        }
                    }
                    return item
                }),
            }

        case 'REMOVE_SAVED_APPLIED_JOB':
            return {
                ...state,
                jobs: state.jobs.filter((item) => item.id != action.payload.id),
            }

        default:
            return state
    }
}

export default JobReducer
