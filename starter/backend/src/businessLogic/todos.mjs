// Business logic for TODOs
import { getAllTodos, createTodoItem, updateTodoItem, deleteTodoItem, updateTodoAttachmentUrl } from '../dataLayer/todosAccess.mjs'
import { getUploadUrl } from '../fileStorage/attachmentUtils.mjs'

export async function getTodosForUser(userId) {
  return getAllTodos(userId)
}

export async function createTodo(userId, newTodo) {
  return createTodoItem(userId, newTodo)
}

export async function updateTodo(userId, todoId, updatedTodo) {
  return updateTodoItem(userId, todoId, updatedTodo)
}

export async function deleteTodo(userId, todoId) {
  return deleteTodoItem(userId, todoId)
}

export async function createAttachmentPresignedUrl(todoId) {
  return getUploadUrl(todoId)
}

export async function updateAttachmentUrl(userId, todoId, attachmentUrl) {
    return updateTodoAttachmentUrl(userId, todoId, attachmentUrl)
}