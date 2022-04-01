const JobReducer = (state, action) => {
    switch (action.type) {
        case 'GET_JOB':
            return {
                ...state,
                job: action.payload,
            }

        case 'GET_JOBS':
            return {
                ...state,
                jobs: action.payload,
            }

        case 'MORE_JOBS':
            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    data: [...state.jobs.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'GET_SAVED_JOBS':
            return {
                ...state,
                savedJobs: action.payload,
            }

        case 'MORE_SAVED_JOBS':
            return {
                ...state,
                savedJobs: {
                    ...state.followers,
                    data: [...state.savedJobs.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'GET_APPLIED_JOBS':
            return {
                ...state,
                appliedJobs: action.payload,
            }

        case 'MORE_APPLIED_JOBS':
            return {
                ...state,
                appliedJobs: {
                    ...state.appliedJobs,
                    data: [...state.appliedJobs.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'TOGGLE_SAVED_JOB':
            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    data: [
                        ...state.jobs.data.map((item) => {
                            if (item.id == action.payload.id) {
                                return {
                                    ...item,
                                    is_saved: action.payload.data,
                                }
                            }
                            return item
                        }),
                    ],
                },
                job: { ...state.job, is_saved: action.payload.data },
            }

        case 'TOGGLE_APPLIED_JOB':
            return {
                ...state,
                jobs: {
                    ...state.jobs,
                    data: [
                        ...state.jobs.data.map((item) => {
                            if (item.id == action.payload.id) {
                                return {
                                    ...item,
                                    is_applied: action.payload.data,
                                }
                            }
                            return item
                        }),
                    ],
                },
                job: { ...state.job, is_applied: action.payload.data },
            }

        case 'REMOVE_SAVED_JOB':
            return {
                ...state,
                savedJobs: {
                    ...state.savedJobs,
                    data: [...state.savedJobs.data.filter((item) => item.id != action.payload.id)],
                },
            }

        case 'REMOVE_APPLIED_JOB':
            return {
                ...state,
                appliedJobs: {
                    ...state.appliedJobs,
                    data: [
                        ...state.appliedJobs.data.filter((item) => item.id != action.payload.id),
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

export default JobReducer
