const express=require("express");
const { watchFile, addFile } = require("../controller/uploadController");
const router=express.Router();

router.route("/watchFile").get(watchFile)
router.route("/addFile").post(addFile)
module.exports=router;

/* here we can use our roles of diffrent Routes */
//watchFile will be access by roleB
//addFile will be access by roleA

/*
  .post(isAuthenticatedUser,authorizeRoles("roleA),addFile)
  .get(isAuthenticatedUser,authorizeRoles("roleB"),watchFile)
  */