const { Schema, model, Types } = require('mongoose');
const dateFormat = require('moment');

// This will not be a model, but rather will be used as the reaction field's subdocument schema in the Thought model.
const ReactionSchema = new Schema(
    {
        // reactionId
        // Use Mongoose's ObjectId data type
        // Default value is set to a new ObjectId
        reactionId: {
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
        username: {
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
        },
        id: false
    }
);


module.exports = ReactionSchema; 