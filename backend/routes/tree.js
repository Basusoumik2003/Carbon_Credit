const express = require('express');
const multer = require('multer');
const streamifier = require('streamifier');
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../config/cloudinary');
const TreeImage = require('../models/TreeImage');

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

module.exports = (pool) => {
  router.post('/', upload.array('photos', 5), async (req, res) => {
    try {
      const {
        U_ID,
        Tree_Name,
        Tree_Species,
        Planting_Date,
        DBH,
        Height,
        Location
      } = req.body;

      const TUID = `TREE-${uuidv4().slice(0, 8).toUpperCase()}`;

      // Save tree metadata to PostgreSQL
      await pool.query(
        `INSERT INTO Tree_Master_Data (TUID, U_ID, Tree_Name, Tree_Species, Planting_Date, DBH, Height, Location)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [TUID, U_ID, Tree_Name, Tree_Species, Planting_Date, DBH, Height, Location]
      );

      // Upload images to Cloudinary
      const imageUploadPromises = req.files.map(file => {
        return new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'tree_uploads' },
            (error, result) => {
              if (result) resolve(result.secure_url);
              else reject(error);
            }
          );
          streamifier.createReadStream(file.buffer).pipe(stream);
        });
      });

      const imageUrls = await Promise.all(imageUploadPromises);

      // Save image URLs to MongoDB
      await TreeImage.create({
        tuid: TUID,
        images: imageUrls.map(url => ({ url }))
      });

      res.status(200).json({ success: true, TUID });

    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, error: error.message });
    }
  });

  return router;
};