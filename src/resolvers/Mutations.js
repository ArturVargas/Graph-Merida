
const Post = require('../models/Post');
const User = require('../models/User');
const authenticated = require('../utils/authenticated');

const createPost = async (root, args) => {
    let newPost = new Post({
        title: args.data.title,
        body: args.data.body,
        createdAt: args.data.createdAt,
        user: args.data.user
    })
    const miPost = await newPost.save();
    const post = await Post.findOne({_id:miPost._id}).populate('user')
    return post;
};

const createUser = async(root, args) => {
    let newUser = new User({
        ...args.data
    })
    const user = await newUser.save();
    return user;
}

const login = async(root, args) => {
    const token = await authenticated(args)
        .catch((err) => new Error(err))
    return {
        token,
        message: 'Ok'
    }
}



module.exports = {
    createPost,
    createUser,
    login
}