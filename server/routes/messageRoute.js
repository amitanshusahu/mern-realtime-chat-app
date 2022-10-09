const { addMessage } = require("../controllers/messageController");

const router = require("express").Router();

router.post("/addmsg/" , addMessage);
router.get("/getmsg/" , addMessage);

module.exports = router;