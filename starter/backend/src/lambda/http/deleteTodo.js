


import { deleteTodo } from '../../businessLogic/todos.mjs'
import { parseUserId } from '../../auth/utils.mjs'
import { createLogger } from '../../utils/logger.mjs'
  
const logger = createLogger('deleteTodo')

export async function handler(event) {
  try {
    logger.info('Processing deleteTodo event', { event })

    const todoId = event.pathParameters.todoId
    const authHeader = event.headers.Authorization || event.headers.authorization
    const userId = parseUserId(authHeader)
    await deleteTodo(userId, todoId)
    logger.info('Deleted todo item', { todoId, userId })

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Todo deleted' })
    }
  } catch (e) {
    logger.error('Error deleting todo item', { error: e.message })
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

