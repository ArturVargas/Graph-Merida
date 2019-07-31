
require('dotenv').config();
const { GraphQLServer } = require('graphql-yoga');
const { importSchema } = require('graphql-import');
const { makeExecutableSchema } = require('graphql-tools');
const typeDefs = importSchema('./src/schema.graphql');
const { AuthDirective } = require('./resolvers/directive');
 const verifyToken = require('./utils/verifyToken');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_Url, {useNewUrlParser: true}, (err) => {
    if(!err){
        console.log('Conectado a Mongo');
    }
})

const { getAllPosts, getPost, getUsers } = require('./resolvers/Querys');
const { createPost, createUser, login } = require('./resolvers/Mutations');

const resolvers = {
    Query: {
     getAllPosts,
     getPost,
     getUsers 
    }, 
    Mutation: {
        createPost,
        createUser,
        login 
    }
  }

  const schema = makeExecutableSchema({
      typeDefs,
      resolvers,
      schemaDirectives: {
          auth: AuthDirective
      }
  })
  
  const server = new GraphQLServer({ 
      schema,
      context: async({request}) => verifyToken(request)
   })
  server.start(() => console.log('Server is running on localhost:4000'))