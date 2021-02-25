const { Friend, Thought } = require('../models');
const { db } = require('../models/Friend');

const userController = {
    // /api/users
    // GET all users
    getAllUser(req, res) {
        Friend.find({})
            // .populate({
            //     path: 'friends',
            //     select: '-__v'
            // })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },
    // GET a single user by its _id and populated thought and friend data
    getUserById({ params }, res) {
        Friend.findOne({ _id: params.id })
            .populate({
                path: 'thought',
                select: '-__v'
            })
            .populate({
                path: 'friend',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Nope! I can't find that user." });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },
    // POST a new user:
    createUser({ body }, res) {
        console.log(body)
        Friend.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            });
    },
    //add Friend to User
    addFriend({ params, body }, res) {
        console.log(body, params);
        Friend.findOneAndUpdate({ _id: params.UserId }, { $addToSet: { friends: params.FriendId } }, { new: true })
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    { _id: params.UserId },
                    { $push: { friends: _id } },
                    { new: true }
                );
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No User found with this id!' });
                    return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // PUT to update a user by its _id
    updateUser({ params, body }, res) {
        Friend.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({
                        message: "sorry! No User found"
                    });
                    return
                }
                res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },

    // DELETE to remove user by its _id
    deleteUser({ params }, res) {
        Friend.findByIdAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Can't delete No User found." });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },
    //remove friend
    removeFriend({ params }, res) {
        Friend.findOneAndUpdate({ _id: params.UserId }, { $pull: { friends: params.FriendId } }, { new: true })
            .then(deletedFriend => {
                if (!deletedFriend) {
                    return res.status(404).json({ message: 'Sorry cant find that friend!' });
                }
                res.json(deletedFriend)
            })
            .catch(err => res.json(err));
    },

    // BONUS: Remove a user's associated thoughts when deleted.
}
module.exports = userController;