const cloudinary = require('cloudinary').v2;
const fs = require('fs');

const uploadCloudinary = async (filePath) => {
    let result;
    try {
        result = await cloudinary.uploader.upload(filePath, {
            use_filename: true
        });
        fs.unlinkSync(filePath);

        return result.url;
    } catch (err) {
        fs.unlinkSync(filePath);

        return null
    }
}

module.exports = uploadCloudinary