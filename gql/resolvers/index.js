const postResolvers = require("./postResolver.js");
const userResolvers = require("./userResolver.js");

module.exports = [userResolvers, postResolvers];