const { Thought } = require('../models');
const { db } = require('../models/Friend');

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
        Pizza.create(body)
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err)
                res.status(400).send(err)
            });
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
    }
};

module.exports = thoughtController;
