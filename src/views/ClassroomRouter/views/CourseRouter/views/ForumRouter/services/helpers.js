/**
 * extracts the topic with the given id from the forum
 * @param {ForumData} forumContent
 * @param {string} topicId
 * @return {?string|ForumTopic}
 */
export let getTopicFromForumContent = (forumContent, topicId) => {
	if (!forumContent || !Array.isArray(forumContent.topics)){
		return null;
	}
	let index = forumContent.topics.findIndex(t => t && (t._id === topicId));
	return (index >= 0) ? forumContent.topics[index] : null;
}

/**
 * extracts the topic with the given id from the forum
 * @function
 * @param {ForumTopicPost} post - latest post on the current depth
 * @param {Object.<string, ForumTopicPost>} postSet - the set of all available posts
 * by their ir
 * @param {?FormatTopicPostsReturnType[]} res - the ref to the array which contains the ordered
 * and cascaded representation of all posts in the given topic
 * @param {number} depth;
 * @return {FormatTopicPostsReturnType}
 */
let dfsTopicPosts = (
	post, postSet, res, depth) => {
	// set received post as visited, don't consider it in further recursion
	postSet[post._id] = undefined;
	res.push({ data: post, depth: depth})
	// post.answers in this case contains only string ids, not the whole objects
	for (let a of post.answers) {
		if (postSet[a]){
			dfsTopicPosts(postSet[a], postSet, res, depth + 1);
		}
	}
}

/**
 * @typedef FormatTopicPostsReturnType
 * @type Object
 * @property {ForumTopicPost} data
 * @property {number} depth
 */
/**
 * extracts the topic with the given id from the forum
 * @function
 * @param {ForumTopicPost[]} posts
 * @return {FormatTopicPostsReturnType[]}
 */
export let formatTopicPosts = (posts) => {
	if (!Array.isArray(posts)) return null;
	let result = [], postSet = {};
	for (let p of posts){
		postSet[p._id] = p;
	}
	// starting with the first post as it is the earliest one and
	// will definitely contain answers (if any)
	dfsTopicPosts(posts[0], postSet, result, 0);
	return result;
}