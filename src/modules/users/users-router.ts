import express from 'express';
import { User } from '../../models';
import { tryCatchWrapper } from '../../middleware';

const router = express.Router();

router.post('/', async (req, res, next) => {
    try {
        return res.json({ test: 'user post' });
    } catch (error) {
        return next(error);
    }
});

router.get('/', async (req, res, next) => {
    try {
        const profile = await User.get();
        return res.json({ profile });
    } catch (error) {
        return next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        return res.json({ test: 'user get by id', id });
    } catch (error) {
        return next(error);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        return res.json({ test: 'user patch by id', id });
    } catch (error) {
        return next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        return res.json({ test: 'user delete by id', id });
    } catch (error) {
        return next(error);
    }
});

/** TRY CATCH WRAPPER EXAMPLE */
router.get(
    '/example',
    tryCatchWrapper(async (req, res, next) => {
        throw new Error('hello world');
        // return res.json({ example: 'this is an example' });
    })
);

export default router;
