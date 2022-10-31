import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'

const XAWS = AWSXRay.captureAWS(AWS)

// TODO: Implement the fileStogare logic

const attachmentBucket = process.env.ATTACHMENT_S3_BUCKET
const signedUrlExpiration = 300

const S3 = new XAWS.S3({
  signatureVersion: 'v4'
})

export const createAttachmentPresignedUrl = (todoItemId: string) => {
  return S3.getSignedUrl('putObject', {
    Bucket: attachmentBucket,
    Key: todoItemId,
    Expires: signedUrlExpiration
  })
}
