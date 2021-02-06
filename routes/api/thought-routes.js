const router = require('express').Router();
const {
    getAllThought,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought
} = require('../../controllers/thought-controller');

//Set up GET all and POST at / api/Thoughts
router.route('/')
    .get(getAllThought)
    .post(createThought);

//Set up GET one, and delete at /api/Thought/:id
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought);

// /api/comments/<pizzaId/<commentId>
router
    .route('/:thoughtId/reactionId')
    .put(addReply)
    .delete(removeComment);

module.exports = router;