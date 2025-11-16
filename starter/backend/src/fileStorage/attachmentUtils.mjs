// File storage utility for S3 presigned URLs
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'

const s3 = new S3Client()
const BUCKET = process.env.TODOS_S3_BUCKET
const URL_EXPIRATION = 300 // seconds

export async function getUploadUrl(todoId) {
  const params = {
    Bucket: BUCKET,
    Key: todoId,
    ContentType: 'image/jpeg'
  }
  return getSignedUrl(
    s3,
    new PutObjectCommand(params),
    { expiresIn: URL_EXPIRATION }
  )
}
