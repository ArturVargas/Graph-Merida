
const Post = require('../models/Post');

const getAllPosts = async (root, args) => {
    let posts = await Post.find();
    return posts;
 }



 module.exports = {
     getAllPosts
 }