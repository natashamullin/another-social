const { Schema, model, Types } = require('mongoose');
const dateFormat = require('moment');

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const ReactionSchema = new Schema(
    {
        // reactionId
        // Use Mongoose's ObjectId data type
        // Default value is set to a new ObjectId
        replyId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },

        // reactionBody
        // String
        // Required
        // 280 character maximum
        reactionBody: {
            type: String,
            require: true,
            maxLength: 280
        },
        // username
        // String
        // Required
        writtenBy: {
            type: String,
            require: true,
        },
        // createdAt
        // Date
        // Set default value to the current timestamp
        createdAt: {
            type: Date,
            default: Date.now,
            get: createdAtVal => dateFormat(createdAtVal)
        }
    },
    // Use moment in a getter method to format the timestamp on query
    // Schema Settings
    {
        toJSON: {
            getters: true
        }
    }
);

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
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);


// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
ThoughtSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought; 