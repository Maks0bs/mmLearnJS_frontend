import { REACT_APP_API_URL } from '../../../../../../../constants'

export let getStreamLink = (fileId, filename) => {
	return `${REACT_APP_API_URL}/files/stream/${fileId}/${filename}`
}