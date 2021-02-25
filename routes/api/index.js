const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const friendRoutes = require('./friend-route');

router.use('/friend', friendRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;