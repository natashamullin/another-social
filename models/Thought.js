const { Schema, model, Types } = require('mongoose');
const dateFormat = require('moment');
const ReactionSchema = require('./Reaction')

const ThoughtSchema = new Schema({
    // String
    // Required
    // Must be between 1 and 280 characters
    thoughtText: {
        type: String,
        require: "Please tell us how you really feel.",
        minLength: 1,
        maxLength: 280
    },

    // createdAt
    // Date
    // Set default value to the current timestamp
    // Use moment in a getter method to format the timestamp on query
    createdAt: {
        type: Date,
        default: Date.now,
        get: createdAtVal => dateFormat(createdAtVal)
    },

    // username (The user that created this thought)
    // String
    // Required

    userNameId: {
        type: String,
        require: true
    },
    // reactions (These are like replies)
    // Array of nested documents created with the reactionSchema
    reaction: [ReactionSchema]
},
    // Schema Settings
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
// ThoughtSchema.virtual('reactionCount').get(function () {
//     return this.reactions.length;
// });

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; 