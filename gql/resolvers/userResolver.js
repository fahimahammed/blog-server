const { userCollection, postCollection } = require('../../dbConfig/index');
const { ObjectId } = require('mongodb');
const userResolvers = {
    Query: {
        users: async () => {
            const result = await userCollection.find({}).toArray();
            return result;
        },
        user: async (parent, args, context) => {
            //console.log(args)
            const result = await userCollection.findOne({id: parseInt(args.id)});
            return result;
        }
    },
    User: {
        posts: async(parant, args, context) =>{
            const allPost = await postCollection.find({}).toArray();
            const postsByUser = await allPost.filter(post => post.userId === parant.id);
            return postsByUser;
        }
    }
};

module.exports = userResolvers;