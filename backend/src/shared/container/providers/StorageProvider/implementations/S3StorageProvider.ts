import { S3 } from 'aws-sdk'
import { ISaveInput, IStorageProvider } from '../../StorageProvider/IStorageProvider'
import { AppError } from '@shared/errors/AppError'

export class S3StorageProvider implements IStorageProvider {
  private bucket_name: string
  private s3: S3

  constructor() {
    this.bucket_name = process.env.AWS_S3_BUCKET!
    this.s3 = new S3({
      credentials: { secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!, accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID! },
      region: process.env.AWS_REGION!
    })
  }

  async save(input: ISaveInput): Promise<string> {
    if (!input?.filename || !input?.type || !input?.base64Data) {
      throw new AppError('You must enter the "type", "filename" and "base64Data" to save the media.')
    }

    const key = `${input.type}/${input.filename}`

    const base64Data = input.base64Data.replace(/^data:[^;]+;base64,/, '')
    const buffer = Buffer.from(base64Data, 'base64')

    try {
      const result = await this.s3
        .upload({
          ContentType: input.type === 'videos' ? 'video/mp4' : 'image/jpeg',
          Bucket: this.bucket_name,
          Body: buffer,
          Key: key
        })
        .promise()

      return result.Location
    } catch (error) {
      console.error('Error saving file to S3:', error)
      throw new Error('Failed to save file to S3')
    }
  }

  async delete(input: ISaveInput): Promise<void> {
    if (!input?.filename || !input?.type) throw new AppError('You must enter the "type" and "filename" to delete the media.')

    const key = `${input.type}/${input.filename}`

    try {
      await this.s3.deleteObject({ Bucket: this.bucket_name, Key: key }).promise()
    } catch (error) {
      console.error('Error deleting file from S3:', error)
      throw new Error('Failed to delete file from S3')
    }
  }

  async getUrl(input: ISaveInput): Promise<string> {
    if (!input?.filename || !input?.type) throw new AppError('You must enter the "type" and "filename" to get the media URL.')

    const key = `${input.type}/${input.filename}`

    try {
      return await this.s3.getSignedUrlPromise('getObject', {
        Bucket: this.bucket_name,
        Expires: 1800,
        Key: key
      })
    } catch (error) {
      console.error('Error generating signed URL from S3:', error)
      throw new Error('Failed to generate signed URL')
    }
  }
}
