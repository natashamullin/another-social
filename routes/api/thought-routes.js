const router = require('express').Router();
const { } = require('../../controllers/thought-controller');
const { getAllThought, getThoughtById, createThought, updateThought, deleteThought, addReaction, removeReaction, } = require('../../controllers/thought-controller');

//Set up GET all and POST at / api/Thoughts
router.route('/')
    .get(getAllThought)
    .post(createThought);

//Set up GET one, and delete at /api/Thought/:id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/Reactions/<ThoughtId>
router.route('/:ThoughtId').post(addReaction);

// /api/Reactions/<ThoughtId/<ReactionId>
router
    .route('/:ThoughtId/ReactionId')
    .put(addReaction)
    .delete(removeReaction);

router.route('/:ThoughtId/:ReactionId')
    .delete(removeReaction);


module.exports = router;
