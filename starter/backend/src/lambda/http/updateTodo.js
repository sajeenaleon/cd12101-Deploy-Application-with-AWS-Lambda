

import { updateTodo } from '../../businessLogic/todos.mjs'
import { parseUserId } from '../../auth/utils.mjs'
import { createLogger } from '../../utils/logger.mjs'

const logger = createLogger('updateTodo')

export async function handler(event) {
  try {
    logger.info('Processing updateTodo event', { event })
    const todoId = event.pathParameters.todoId
    const updatedTodo = JSON.parse(event.body)
    const authHeader = event.headers.Authorization || event.headers.authorization
    const userId = parseUserId(authHeader)
    await updateTodo(userId, todoId, updatedTodo)

    logger.info('Updated todo item', { todoId, userId })
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ message: 'Todo updated' })
    }
  } catch (e) {
    logger.error('Error updating todo item', { error: e.message })
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
