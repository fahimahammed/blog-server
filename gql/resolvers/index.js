const { userCollection, postCollection } = require('../../dbConfig/index');
const { ObjectId } = require('mongodb');
const resolvers = {
    Query: {
        hello: () => 'world',
        users: async () => {
            const result = await userCollection.find({}).toArray();
            return result;
        },
        user: async (parent, args, context) => {
            //console.log(args)
            const result = await userCollection.findOne({id: parseInt(args.id)});
            return result;
        },
        posts: async () => {
            const result = await postCollection.find({}).toArray();
            return result;
        },
        post: async (parent, args, context) => {
            console.log(args)
            const result = await postCollection.findOne({_id: ObjectId(args.id)});
            return result;
        }
    },
    User: {
        posts: async(parant, args, context) =>{
            const allPost = await postCollection.find({}).toArray();
            const postsByUser = await allPost.filter(post => post.userId === parant.id);
            return postsByUser;
        }
    },
    Post: {
        user: async(parant, args, context) =>{
            //console.log(parant);
            const result = await userCollection.findOne({id: parant.userId});
            return result;
        }
    }
};

module.exports = resolvers;