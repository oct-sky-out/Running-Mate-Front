// import AWS from 'aws-sdk';
// import { v4 } from 'uuid';

// export const ImageUploader = async (
//   file: File,
//   folderName: string | null = null
// ) => {
//   try {
//     const s3Params = {
//       Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME || '',
//       Key: `${folderName}/${v4()}`,
//       Body: file,
//       ACL: 'public-read',
//       ContentType: 'image/jpeg',
//     };

//     const s3Config = {
//       region: process.env.REACT_APP_AWS_S3_REGION || '',
//       accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID || '',
//       secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY || '',
//     };
//     const { Location } = await new AWS.S3(s3Config).upload(s3Params).promise();
//     return Location;
//   } catch (error) {
//     console.error(error);
//     throw new Error('이미지 저장 실패');
//   }
// };

// export const ImageDelete = async (fileName: string) => {
//   try {
//     const s3Params = {
//       Bucket: process.env.REACT_APP_AWS_S3_BUCKET_NAME || '',
//       Key: fileName,
//     };

//     const s3Config = {
//       region: process.env.REACT_APP_AWS_S3_REGION || '',
//       accessKeyId: process.env.REACT_APP_AWS_S3_ACCESS_KEY_ID || '',
//       secretAccessKey: process.env.REACT_APP_AWS_S3_SECRET_ACCESS_KEY || '',
//     };

//     await new AWS.S3(s3Config).deleteObject(s3Params).promise();
//   } catch (error) {
//     console.error(error);
//     throw new Error('이미지 삭제 실패');
//   }
// };
