const router = require('express').Router();
// const userModel = require('../model/User');
const authValidation = require('../validation/AuthValidation');
const authController = require('../controller/AuthController');
router.post('/register', async (req, res) => {
    try {
        // Validate the request body
        const validate = authValidation.registerValidate(req.body);
        const saveUser = await authController.registeration(req.body);
        res.send({ _id: saveUser._id, name: saveUser.name, email: saveUser.email });
    }
    catch (err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        // Validate the request body
        const validate = authValidation.loginValidate(req.body);
        const response = await authController.login(req.body);
        const { accesstoken } = response;
        if (accesstoken) res.header('accesstoken', accesstoken);
        res.send(response);
    }
    catch (err) {
        res.status(400).send(err);
    }
});
module.exports = router;