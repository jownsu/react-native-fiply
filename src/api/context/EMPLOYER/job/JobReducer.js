const DashboardReducer = (state, action) => {
    switch (action.type) {
        case 'SET_JOBS':
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

        case 'SET_JOB_INTERVIEWS':
            return {
                ...state,
                jobInterviews: action.payload,
            }

        case 'MORE_JOB_INTERVIEWS':
            return {
                ...state,
                jobInterviews: {
                    ...state.jobInterviews,
                    data: [...state.jobInterviews.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'SET_JOB_DETAILS':
            return {
                ...state,
                job: action.payload,
            }

        case 'SET_APPLICANTS':
            return {
                ...state,
                applicants: action.payload,
            }

        case 'MORE_APPLICANTS':
            return {
                ...state,
                applicants: {
                    ...state.applicants,
                    data: [...state.applicants.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'SET_APPLICANT_INTERVIEWS':
            return {
                ...state,
                applicantInterviews: action.payload,
            }

        case 'MORE_APPLICANT_INTERVIEWS':
            return {
                ...state,
                applicantInterviews: {
                    ...state.applicantInterviews,
                    data: [...state.applicantInterviews.data, ...action.payload.data],
                    links: { ...action.payload.links },
                },
            }

        case 'SET_APPLICANT_RESPONSE':
            return {
                ...state,
                response: action.payload,
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
