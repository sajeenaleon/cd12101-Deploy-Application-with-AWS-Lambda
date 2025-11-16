import { createTodo } from '../../businessLogic/todos.mjs'
import { parseUserId } from '../../auth/utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('createTodo')

export async function handler(event) {
  try {
    logger.info('Processing createTodo event', { event })
    const newTodo = JSON.parse(event.body)
    const authHeader = event.headers.Authorization || event.headers.authorization
    const userId = parseUserId(authHeader)
    const item = await createTodo(userId, newTodo)

    logger.info('Created new todo item', { item })
    return {
      statusCode: 201,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ item })
    }
  } catch (e) {
    logger.error('Error creating todo item', { error: e.message })
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

