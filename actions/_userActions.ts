'use server'

import { createUser, deleteUser } from '@/lib/users'
import { revalidatePath } from 'next/cache'

export async function createUserAction(name: string, email: string, role: string, bio: string) {
  await createUser(name, email, role, bio)
  revalidatePath('/')
}



// export async function updateTodoAction(id: string, isCompleted: boolean) {
//   await updateTodo(id, isCompleted)
//   revalidatePath('/')
// }

// export async function updateTodoTitleAction(id: string, title: string) {
//     await updateTodoTitle(id, title)
//     revalidatePath('/')
//   }

export async function deleteUserAction(id: string) {
    await deleteUser(id)
    revalidatePath('/')
  }
