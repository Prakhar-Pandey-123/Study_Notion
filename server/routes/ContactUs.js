const express = require("express")
//Router lets you group common routes together and export them as a module 
// Contact form submits data and triggers side effects (send email / create record).
// It's not just reading data and is not an idempotent replace of an existing resource → POST is the semantic match.
const router = express.Router()
const {contactUs}=require("../controllers/ContactUs");

router.post("/contactUs", contactUs);

module.exports = router;