// Data access layer for TODOs (DynamoDB)
import { DynamoDBClient, QueryCommand, PutItemCommand, UpdateItemCommand, DeleteItemCommand } from '@aws-sdk/client-dynamodb'
import { v4 as uuidv4 } from 'uuid'
import AWSXRay from 'aws-xray-sdk'

const client = AWSXRay.captureAWSv3Client(
  new DynamoDBClient({ region: "us-east-1" })
)
const TODOS_TABLE = "TodosTable"

export async function getAllTodos(userId) {
  const result = await client.send(new QueryCommand({
    TableName: TODOS_TABLE,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': { S: userId }
    }
  }))
  return (result.Items || []).map(item => ({
    userId: item.userId.S,
    todoId: item.todoId.S,
    createdAt: item.createdAt.S,
    name: item.name.S,
    dueDate: item.dueDate.S,
    done: item.done.BOOL,
    attachmentUrl: item.attachmentUrl ? item.attachmentUrl.S : undefined
  }))
}

export async function createTodoItem(userId, newTodo) {
  const todoId = uuidv4()
  const createdAt = new Date().toISOString()
  const item = {
    userId: { S: userId },
    todoId: { S: todoId },
    createdAt: { S: createdAt },
    name: { S: newTodo.name },
    dueDate: { S: newTodo.dueDate },
    done: { BOOL: false }
  }
  await client.send(new PutItemCommand({
    TableName: TODOS_TABLE,
    Item: item
  }))
  return {
    userId,
    todoId,
    createdAt,
    name: newTodo.name,
    dueDate: newTodo.dueDate,
    done: false
  }
}

export async function updateTodoItem(userId, todoId, updatedTodo) {
  await client.send(new UpdateItemCommand({
    TableName: TODOS_TABLE,
    Key: {
      userId: { S: userId },
      todoId: { S: todoId }
    },
    UpdateExpression: 'set #name = :name, dueDate = :dueDate, done = :done',
    ExpressionAttributeNames: {
      '#name': 'name'
    },
    ExpressionAttributeValues: {
      ':name': { S: updatedTodo.name },
      ':dueDate': { S: updatedTodo.dueDate },
      ':done': { BOOL: updatedTodo.done }
    }
  }))
}

export async function deleteTodoItem(userId, todoId) {
  await client.send(new DeleteItemCommand({
    TableName: TODOS_TABLE,
    Key: {
      userId: { S: userId },
      todoId: { S: todoId }
    }
  }))
}

export async function updateTodoAttachmentUrl(userId, todoId, attachmentUrl) {
    await client.send(new UpdateItemCommand({
        TableName: TODOS_TABLE,
        Key: {
            userId: { S: userId },
            todoId: { S: todoId }
        },
        UpdateExpression: 'set attachmentUrl = :attachmentUrl',
        ExpressionAttributeValues: {
            ':attachmentUrl': { S: attachmentUrl }
        }
    }))
}