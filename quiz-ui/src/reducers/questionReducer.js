const initialState = {
    questionDetails: [],
    error: '',
};

export const questionReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_QUESTIONS':
            return {
                ...state,
                questionDetails: action.payload,
                error: action.payload.error,
            };
        case 'FETCH_QUESTIONS_FAILED':
            return {
                error: action.payload.error
            };
        default: return state;
    }
}

