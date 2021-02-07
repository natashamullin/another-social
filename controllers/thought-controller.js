const { Thought, Reaction } = require('../models');
const { db } = require('../models/Thought');

const thoughtController = {
    //get all thoughts
    getAllThought(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .sort({ _id: -1 })
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
            });
    },

    //get one thought by id
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            }).select('-__v')
            .then(dbThoughtData => {
                //if no thought found send 404
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'We got nothing to show you' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err)
            });
    },

    //create thought
    createThought({ body }, res) {
        console.log(body)
        Thought.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            });
    },
    //add Reaction to Thought
    addReaction({ params, body }, res) {
        console.log(body);
        Reaction.create(body)
            .then(({ _id }) => {
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $push: { reactions: _id } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },

    //update thought by id
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({
                        message: "sorry! No thought found"
                    });
                    return
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },
    // delete thought
    deleteThought({ params }, res) {
        Thought.findByIdAndDelete({ _id: params.id })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: "No thought found." });
                    return;
                }
                res.json(dbThoughtData)
            })
            .catch(err => res.status(400).json(err));
    },
    //remove Reaction
    removeReaction({ params }, res) {
        Reaction.findOneAndDelete({ _id: params.reactionId })
            .then(deletedReaction => {
                if (!deletedReaction) {
                    return res.status(404).json({ message: 'No Reaction with this id!' });
                }
                return Thought.findOneAndUpdate(
                    { _id: params.thoughtId },
                    { $pull: { reactions: params.reactionId } },
                    { new: true }
                );
            })
            .then(dbThoughtData => {
                if (!dbThoughtData) {
                    res.status(404).json({ message: 'No Thought found with this id!' });
                    return;
                }
                res.json(dbThoughtData);
            })
            .catch(err => res.json(err));
    },
};


module.exports = thoughtController;
