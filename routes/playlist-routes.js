const pRouter = require('express').Router();
const pController = require('../controllers/playlist-controller');

// pRouter.get('/', pController.index);
pRouter.get('/new', pController.new);
pRouter.get('/:id', pController.show);
pRouter.get('/:id/edit', pController.edit);
pRouter.put('/:id', pController.update);
pRouter.post('/', pController.create);
pRouter.delete('/:id', pController.destroy);

module.exports = pRouter;
