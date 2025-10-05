import express from 'express'
import {
  allMessages,
  sendMessage,
} from "../controllers/messageControllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.route("/:chatId").get(protectRoute, allMessages);
router.route("/").post(protectRoute, sendMessage);

export default router;
