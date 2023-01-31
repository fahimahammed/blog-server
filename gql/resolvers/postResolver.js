const { userCollection, postCollection } = require('../../dbConfig/index');
const { ObjectId } = require('mongodb');
const postResolvers = {
    Query: {
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
    Post: {
        user: async(parant, args, context) =>{
            //console.log(parant);
            const result = await userCollection.findOne({id: parant.userId});
            return result;
        }
    }
};

module.exports = postResolvers;