
require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const typeDefs = importSchema('./src/schema.graphql');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_Url, {useNewUrlParser: true}, (err) => {
    if(!err){
        console.log('Conectado a Mongo');
    }
})

const { getAllPosts } = require('./resolvers/Querys');
const { createPost, createUser } = require('./resolvers/Mutations');

const resolvers = {
    Query: {
     getAllPosts 
    }, 
    Mutation: {
        createPost,
        createUser 
    }
  }
  
  const server = new GraphQLServer({ typeDefs, resolvers })
  server.start(() => console.log('Server is running on localhost:4000'))