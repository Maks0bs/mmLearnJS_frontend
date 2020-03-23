import { REACT_APP_API_URL } from '../../../constants'

export let getData = () => {
    return fetch(REACT_APP_API_URL)
    .then(res => res.json())
}

// !!! deprecated !!!
// to be replaced with redux action
// !!! deprecated !!!