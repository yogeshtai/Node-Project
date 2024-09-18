import express from "express";
import { tokenVerification } from "../middleware/auth.js";
import { catchErrors } from "../middleware/errorHandler.js";
import controller from "../src/auth/controller.js";
import { checkExistence, signInValidator, signUpValidator, updatePassValidator } from "../validations/authValidation.js";

const router = express.Router();

router.post('/check-existence', checkExistence, catchErrors(controller.checkExistence));
router.post('/verify-otp', tokenVerification, catchErrors(controller.verifyOtp));
router.post('/sign-up', signUpValidator, catchErrors(controller.signUp));
router.post('/sign-in', signInValidator, catchErrors(controller.signIn));
router.post('/forgot-password', catchErrors(controller.forgotPassword));
router.post('/reset-password', updatePassValidator, tokenVerification, catchErrors(controller.updatePassword));
router.get('/me', tokenVerification, catchErrors(controller.me));
router.post('/change-password', tokenVerification, catchErrors(controller.changePassword));
router.post('/logout', tokenVerification, catchErrors(controller.logout));

export default router;