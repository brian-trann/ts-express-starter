import express from 'express';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        return res.json({ template: 'this is a template for a POST request' });
    } catch (error) {
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
      return res.json({ template: 'this is a template for a GET request' });
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        return res.json({ template: `this is a template for a GET by id request: ${id}` });
    } catch (error) {
        return next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        return res.json({ template: `this is a template for a PATCH by id request: ${id}` });
    } catch (error) {
        return next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        return res.json({ template: `this is a template for a DELETE by id request: ${id}` });
    } catch (error) {
        return next(error);
    }
});

export default router;
