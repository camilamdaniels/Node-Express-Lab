const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
let id = 0;

server.get('/posts', (req, res) => {
	// const term = req.params.term;
	// const newPosts = posts.filter(post => {
	// 	return (post.postTitle.split('').includes(term)
	// 				|| post.postContents.split('').includes(term));
	// });
	// if (term === null) res.json(posts);
	// res.json(newPosts);
	res.json(posts);
});

server.post('/posts', (req, res) => {
	const { title, contents } = req.body;
	if (!{ title, contents }) {
		res.status(STATUS_USER_ERROR);
		res.json({error: 'Please submit both a title and content for your post.'});
	}
	const postTitle = req.body.title;
	const postContents = req.body.contents;
	const post = { id, postTitle, postContents };
	posts.push(post);
	res.json(post);
	id++;
});

server.put('/posts', (req, res) => {
	const { id, title, contents } = req.body;
	if (!{ id, title, contents}) {
		res.status(STATUS_USER_ERROR);
		res.json({error: 'Please submit a valid id along with the title and contents you\'d like to update.'});
	}
	let newPost = {};
	posts.forEach(post => {
		if (post.id == req.body.id) {
			post.postTitle = req.body.title;
			post.postContents = req.body.contents;
			newPost = post;
		}
	});
	res.json(newPost);
})

server.delete('/posts', (req, res) => {
	const key = req.body.id;
	if (!key || key > id || key < 0) {
		res.status(STATUS_USER_ERROR);
		res.json({error: 'Please enter a valid user id.'});
	}
	const newPosts = posts.filter(post => {
		return req.body.id != post.id;
	});
	posts = newPosts;
	res.json({sucess: true});
})

module.exports = { posts, server };
