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
            const result = await userCollection.findOne({ id: parseInt(args.id) });
            return result;
        },
        posts: async () => {
            const result = await postCollection.find({}).toArray();
            return result;
        },
        post: async (parent, args, context) => {
            console.log(args)
            const result = await postCollection.findOne({ _id: ObjectId(args.id) });
            return result;
        }
    },
    User: {
        posts: async (parant, args, context) => {
            const allPost = await postCollection.find({}).toArray();
            const postsByUser = await allPost.filter(post => post.userId === parant.id);
            return postsByUser;
        }
    },
    Post: {
        user: async (parant, args, context) => {
            //console.log(parant);
            const result = await userCollection.findOne({ id: parant.userId });
            return result;
        }
    },
    Mutation: {
        addPost: async (parent, args, context) => {
            try {
                const result = await postCollection.insertOne(args.input);
                //console.log(result);
                return true;
            }
            catch(err){
                return false;
            }
        },
        deletePost: async(parent, args, context)=>{
            try{
                console.log(args);
                const delete_post = await postCollection.deleteOne({_id: ObjectId(args.id)});
                return delete_post.deletedCount > 0;
            }
            catch(err){
                return false;
            }
        },
        updatePost: async(parent, args, context)=>{
            try{
                //console.log(args);
                const filter = {_id: ObjectId(args.input._id)};
                const option = { upsert:  true};
                const data = {
                    $set: {
                        title: args.input.title,
                        body: args.input.body
                    }
                }
                const result = await postCollection.updateOne(filter, data, option);
                return result.modifiedCount > 0;
            }catch(err){
                return false;
            }
        }
    }
};

module.exports = resolvers;