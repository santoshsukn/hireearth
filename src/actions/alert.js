import uuid from 'uuid';
import {SET_ALERT, REMOVE_ALERT} from './types'

export const setAlert = (msg,alertType) => dispatch => {
    const id = uuid.v4();
    console.log('inside acttion alert');
    dispatch({
        type:SET_ALERT,
        payload: {msg, alertType, id}
    })
    setTimeout(() => 

        dispatch({
            type:REMOVE_ALERT,
            payload:  id
        }),1000
    )
}