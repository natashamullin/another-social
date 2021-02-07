const router = require('express').Router();
const thoughtRoutes = require('./thought-routes');
const friendRoutes = require('./friend-route');

// add prefix of `/pizzas` to routes created in `pizza-routes.js`
// router.use('/friend', friendRoutes);
router.use('/thought', thoughtRoutes);

module.exports = router;