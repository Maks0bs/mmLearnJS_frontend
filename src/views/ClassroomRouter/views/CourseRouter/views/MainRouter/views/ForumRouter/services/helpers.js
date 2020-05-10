export let getTopicFromForum = (forumData, topicId) => {
	if (!forumData || !forumData.topics){
		return 'not accessible'
	}
	for (let topic of forumData.topics){
		if (topic._id === topicId){
			return topic;
		}
	}
}

let dfs = (post, posts, res, d) => {
	posts[post._id] = undefined;
	res.push({
		data: post,
		depth: d
	})

	for (let i of post.answers) {
		if (posts[i]){
			dfs(posts[i], posts, res, d + 1);
		}
	}
}

export let formatTopicPosts = (posts) => {
	let result = [], postsOrdered = {};
	for (let i of posts){
		postsOrdered[i._id] = i;
	}
	dfs(posts[0], postsOrdered, result, 0);
	console.log(result);
	return result;
}