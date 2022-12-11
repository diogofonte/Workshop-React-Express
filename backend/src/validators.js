const { StatusCodes } = require('http-status-codes');
const { body, validationResult } = require('express-validator');

const createItem = async (req, res, next) => {
    await body('key')
        .exists().withMessage('key is required').bail()
        .isString().withMessage('key must be a string').bail()
        .isLength({ min: 1 }).withMessage('key must be at least 1 character long')
        .run(req);

    await body('text')
        .optional()
        .isString().withMessage('text must be a string').bail()
        .run(req);

    await body('state')
        .exists().withMessage('state is required').bail()
        .isString().withMessage('state must be a string').bail()
        .isIn(['TODO', 'DONE']).withMessage('state must be either TODO or DONE')
        .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
    return next();
}

module.exports = {
    createItem,
}
