import express from "express";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { deleteImage, uploadImage } from "../controllers/uploads";
import cloudinary from "../config/cloudinary";
const router = express.Router();

interface CloudinaryParams {
    folder: string;
    format: string;
}
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "ECMA",
        format: "jpg",
    } as CloudinaryParams
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, 
  });

router.post("/images/upload", upload.array("images", 10), uploadImage);
router.delete("/images/:publicId", deleteImage);

export default router;