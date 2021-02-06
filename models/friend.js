// User
const { Schema, model } = require('mongoose');

const FriendSchema = new Schema({
    // username
    // String
    // Unique
    // Required
    // Trimmed
    userName: {
        type: String,
        unique: true,
        require: true,
        trimmed: true,
    },

    //email
    // String
    // Required
    // Unique
    // Must match a valid email address (look into Mongoose's matching validation)
    email: {
        type: String,
        require: true,
        unique: true,
        match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
    },
    // thoughts
    // Array of _id values referencing the Thought model
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    // friends
    // Array of _id values referencing the User model (self-reference)
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Friend'
        }
    ]
},
    {
        toJson: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);



//Create a virtual called friendCount that retrieves the length of the user's friends array field on query.
//get total count of friends and replies on retrieval

FriendSchema.virtual('friendCount').get(function () {
    return this.friends.reduce((total, Friend) => total + friends.replies.length + 1, 0);
});

// create the pizza model using the PizzaSchema
const Friend = model('Friend', FriendSchema);

//export the Friend model
module.exports = Friend;