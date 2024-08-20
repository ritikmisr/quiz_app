const initialState = {
    user: {},
    token: '',
    error: ''
};

export function userReducer(state=initialState, action) {
    switch(action.type) {
        case 'DATA_FETCHED_SUCCESSFULLY': 
            return {
                ...state,
                user: action.payload.user,
                token: action.payload.token,
                error: action.payload.error
            }
        case 'HANDLE_ERROR':
            return {
                ...state,
                error: action.payload.error,
            }
        default: return state;
    }
}