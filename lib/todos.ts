import prisma from './prisma'

/**
 * Retrieves all todos from the database.
 *
 * @return {Promise<{todos: Todo[]}>} A promise containing an object with an array of todos.
 * If there is an error, the promise will contain an object with the error.
 */

export async function getTodos() {
  try {
    const todos = await prisma.todo.findMany({
      orderBy: {
        updatedAt: 'asc',
      }
    })
    return { todos }
  } catch (error) {
    return { error }
  }
}

/**
 * Asynchronously creates a new todo with the specified title using Prisma.
 *
 * @param {string} title - The title of the todo.
 * @return {Promise<{ todo: Todo } | { error: Prisma.PrismaClientKnownRequestError }>} A Promise that resolves to an object
 * containing the newly created todo or an error if the operation fails.
 */

export async function createTodo(title: string) {
  try {
    const todo = await prisma.todo.create({
      data: {
        title
      }
    })

    return { todo }
  } catch (error) {
    return { error }
  }
}

export async function getTodoById(id: string) {
  try {
    const todo = await prisma.todo.findUnique({ where: { id } })
    return { todo }
  } catch (error) {
    return { error }
  }
}

export async function deleteTodo(id: string) {
  try {
    const todo = await prisma.todo.delete({ where: { id } })
    return { todo }
  } catch (error) {
    return { error }
  }
}

export async function updateTodoTitle(id: string, title: string) {
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: { title }
    })
    return { todo }
  } catch (error) {
    return { error }
  }
}

export async function updateTodo(id: string, isCompleted: boolean) {
  try {
    const todo = await prisma.todo.update({
      where: { id },
      data: { isCompleted }
    })
    return { todo }
  } catch (error) {
    return { error }
  }
}
