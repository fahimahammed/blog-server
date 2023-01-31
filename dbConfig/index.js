const { MongoClient } = require('mongodb');
// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'inhouse-session';

client.connect();
console.log('Connected successfully to server');
const db = client.db(dbName);
const userCollection = db.collection('users');
const postCollection = db.collection('posts');


module.exports = {userCollection, postCollection, db};