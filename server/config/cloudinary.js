const cloudinary = require('cloudinary').v2
//imports the cloudinary npm package(collection of files and codes eg. express,cloudinary) into this .js file.
exports.cloudinaryConnect= ()=>{
    try {
        cloudinary.config({
            cloud_name : process.env.CLOUD_NAME,
            api_key : process.env.API_KEY,
            api_secret : process.env.API_SECRET
        })
        console.log("CD connected");

        //cloud_name: your Cloudinary account name
//api_key: your public API key
//api_secret: your private API key
    } catch (error) {
        console.log("error connecting CD"+error)
    }
}