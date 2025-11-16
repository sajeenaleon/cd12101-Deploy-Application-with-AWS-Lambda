

import { getTodosForUser } from '../../businessLogic/todos.mjs'
import { parseUserId } from '../../auth/utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('utils')

export async function handler(event) {
  try {
    logger.info('Processing getTodos event', { event })
    const authHeader = event.headers.Authorization || event.headers.authorization
    const userId = parseUserId(authHeader)
    const items = await getTodosForUser(userId)

    logger.info('Retrieved todos', { userId, itemCount: items.length })
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ items })
    }
  } catch (e) {
    logger.error('Error getting todos', { error: e.message })
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
