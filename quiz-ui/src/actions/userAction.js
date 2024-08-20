export const handleSignup = (data) => {
    return async(dispatch) => {
        await fetch('/signup', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json'
              }
        })
        .then(response => response.json())
        .then((response) => {
            dispatch({
                type: 'DATA_FETCHED_SUCCESSFULLY',
                payload: response
            });
        })
        .catch((e) => {
            dispatch({
                type: 'HANDLE_ERROR',
                payload: {error: 'Network issue!'}
            });
        })
    }
}

export const handleLogin = async (data) => {
    return async (dispatch) => {
        await fetch('/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
              }
        })
        .then(response => response.json())
        .then((response) => {
            dispatch({
                type: 'DATA_FETCHED_SUCCESSFULLY',
                payload: response
            });
        })
        .catch((error) => {
            dispatch({
                type: 'HANDLE_ERROR',
                payload: error
            });
        })
    }
}