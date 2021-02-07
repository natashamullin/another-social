const router = require('express').Router();
const { } = require('../../controllers/friend-controller');
const { getAllUser, getUserById, createUser, updateUser, deleteUser, addFriend, removeFriend, } = require('../../controllers/friend-controller');

//Set up GET all and POST at / api/users
router.route('/')
    .get(getAllUser)
    .post(createUser)

//Set up GET one, and delete at /api/user/:id
router.route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

// /api/friends/<userId>
router.route('/:UserId').post(addFriend);

// /api/friends/<userId/<friendId>
router
    .route('/:UserId/FriendId')
    .put(addFriend)
    .delete(removeFriend);

router.route('/:UserId/:FriendId')
    .delete(removeFriend);


module.exports = router;

