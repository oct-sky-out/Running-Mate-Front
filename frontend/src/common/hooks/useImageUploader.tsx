import { useState } from 'react';
import S3 from 'aws-sdk/clients/s3';
import { v4 } from 'uuid';

const useImageUploader = () => {
  const imageUploader = async (
    file: File,
    folderName: string | null = null
  ) => {
    try {
      const s3Params = {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME || '',
        Key: `${folderName}/${v4()}`,
        Body: file,
        ACL: 'public-read',
        ContentType: 'image/jpeg',
      };

      const s3Config = {
        region: process.env.REACT_APP_AWS_S3_REGION,
        accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY,
      };
      const { Location } = await new S3(s3Config).upload(s3Params).promise();
      return Location;
    } catch (error) {
      console.error(error);
      throw new Error('이미지 저장 실패');
    }
  };

  return imageUploader;
};

export default useImageUploader;
