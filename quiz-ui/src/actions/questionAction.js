export function fetchQuestions() {
    return async dispatch => {
        await fetch('/getQuestions', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then((response) => {
            dispatch({
                type: 'FETCH_QUESTIONS',
                payload: response
            });
        })
        .catch((e) => {
            dispatch({
                type: 'FETCH_QUESTIONS_FAILED',
                payload: {error: 'Error Found!'}
            });
        })
    }
}

export const markTestAsGiven = (id) => {
    console.log(`Bearer ${localStorage.getItem('token')}`);
    return async dispatch => {
        await fetch('/testCompleted', {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'content-type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then((response) => {
            dispatch({
                type: 'FETCH_QUESTIONS',
                payload: response
            });
        })
        .catch((e) => {
            dispatch({
                type: 'FETCH_QUESTIONS_FAILED',
                payload: {error: 'Error Found!'}
            });
        })
    }
}