import uuid from 'uuid';
import {SET_USER,REMOVE_USER} from './types'

export const setUser = (user) => dispatch => {
    const id = uuid.v4();
    console.log('inside action user ' + JSON.stringify(user));
    dispatch({
        type:SET_USER,
        payload: {user, id}
    })
}