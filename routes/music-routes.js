const router = require('express').Router();
const controller = require('../controllers/music-controller');

router.get('/', controller.playlist);
router.post('/artist', controller.artist);
router.post('/artist/album', controller.album);
router.post('/artist/album/new', controller.new);
router.get('/artist/album/new', controller.new);
router.get('/:id', controller.show);
router.get('/:id/edit', controller.edit);
router.put('/:id', controller.update);
router.post('/', controller.create);
router.delete('/:id', controller.destroy);

module.exports = router;
