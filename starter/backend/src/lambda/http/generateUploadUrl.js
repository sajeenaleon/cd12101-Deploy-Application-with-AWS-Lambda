

import { createAttachmentPresignedUrl, updateAttachmentUrl } from '../../businessLogic/todos.mjs'
import { parseUserId } from '../../auth/utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('generateUploadUrl')
const bucket = process.env.TODOS_S3_BUCKET

export async function handler(event) {
  try {
    logger.info('Processing generateUploadUrl event', { event })
    const todoId = event.pathParameters.todoId
    const authHeader = event.headers.Authorization || event.headers.authorization
    const userId = parseUserId(authHeader) // Ensures user is authenticated
    const uploadUrl = await createAttachmentPresignedUrl(todoId)

    await updateAttachmentUrl(userId, todoId, `https://${bucket}.s3.amazonaws.com/${todoId}`)

    logger.info('Generated upload URL', { todoId, userId, uploadUrl })

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ uploadUrl })
    }
  } catch (e) {
    logger.error('Error generating upload URL', { error: e.message })
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ error: e.message })
    }
  }
}

