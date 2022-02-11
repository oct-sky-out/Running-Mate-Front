import S3 from 'aws-sdk/clients/s3';

const useImageDelete = () => {
  const ImageDelete = (fileName: string) => {
    try {
      const s3Params = {
        Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME || '',
        Key: fileName,
      };

      const s3Config = {
        region: process.env.REACT_APP_AWS_S3_REGION,
        accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY,
      };

      new S3(s3Config).deleteObject(s3Params);
    } catch (error) {
      console.error(error);
      throw new Error('이미지 삭제 실패');
    }
  };

  return ImageDelete;
};

export default useImageDelete;
