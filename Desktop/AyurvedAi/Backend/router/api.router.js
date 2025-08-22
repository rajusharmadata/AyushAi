import {Router} from "express"
import { EmailVerification,Verifyotp,Singin } from '../controller/user.controller.js';
import { chatController } from '../controller/ai.controller.js';
const router = Router();


router.post('/user', EmailVerification);

// route for the verified user
router.post('/verify', Verifyotp);

// route for the Singin
router.post('/signin', Singin);
router.post('/chat',chatController)

export {router}
