const { Friend, User } = require('../models');
const { db } = require('../models/Friend');

const UserController = {
    // /api/users
    // GET all users
    getAllUser(req, res) {
        User.find({})
            .populate({
                path: 'friends',
                select: '-__v'
            })
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
        User.findOne({ _id: params.id })
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

    // PUT to update a user by its _id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
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
        User.findByIdAndDelete({ _id: params.id })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: "Can't delete No User found." });
                    return;
                }
                res.json(dbUserData)
            })
            .catch(err => res.status(400).json(err));
    },

    // BONUS: Remove a user's associated thoughts when deleted.
},