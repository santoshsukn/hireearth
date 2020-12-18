import {SET_USER, REMOVE_USER} from '../actions/types'

const initialState = [];

export default function(state = initialState,action){
    const {type, payload} = action;
    switch(type){
        case  SET_USER :
        alert('jio');
            return[...state,payload]
        case REMOVE_USER :
            return state.filter(user => user.id !== payload)
        default:
            return state
    }
}