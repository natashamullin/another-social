const router = require('express').Router();
const { } = require('../../controllers/friend-controller');
const { getAllUser, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend } = require('../../controllers/friend-controller');

//Set up GET all and POST at / api/friend
router.route('/')
    .get(getAllUser)
    .post(createUser)

//Set up GET one, and delete at /api/friend/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/friends/<userId>
// router.route('/:UserId').post(addFriend);

// /api/friend/<userId>/friend/<friendId>
router.route('/:UserId/friend/:FriendId')
    .post(addFriend) // no body
    .delete(removeFriend);

// router.route('/:UserId/:FriendId')
//     .delete(removeFriend);


module.exports = router;

