import { config } from "../../config";
const fs = require("fs");
import S3 from "aws-sdk/clients/s3";

const {
  AWS_IMAGES_BUCKET_REGION,
  AWS_IMAGES_ACCESS_KEY,
  AWS_IMAGES_SECRET_ACCESS_KEY,
  AWS_IMAGES_BUCKET_NAME,
} = config;

const s3 = new S3({
  region: AWS_IMAGES_BUCKET_REGION,
  credentials: {
    accessKeyId: AWS_IMAGES_ACCESS_KEY,
    secretAccessKey: AWS_IMAGES_SECRET_ACCESS_KEY,
  },
});

export const uploadFile = (file: any, userId:string) => {
  const fileStream = fs.createReadStream(file.path);

  const uploadParams: S3.Types.PutObjectRequest = {
    Bucket: AWS_IMAGES_BUCKET_NAME,
    Body: fileStream,
    Key: file.filename,
    Metadata: {
      userId,
    },
  };

  return s3.upload(uploadParams).promise();
};

// downloads a file from s3
export const getFileStream = (fileKey: any) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: AWS_IMAGES_BUCKET_NAME,
  };

  return s3.getObject(downloadParams).createReadStream();
};
