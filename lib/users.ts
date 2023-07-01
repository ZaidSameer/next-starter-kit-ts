import prisma from "./prisma"

import { Role } from "@prisma/client"

export async function getUsers() {
    try {
      const users = await prisma.user.findMany({
          include: {
            profile: true, // Include the Profile object for each User object
          },
        })
        const usersWithBio = users.map((user) => ({
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          isActive: user.isActive,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          bio: user.profile?.bio || '',
        }))
        // return usersWithBio
        return { users: usersWithBio }
    } catch (error) {
      return { error }
    }
  }

  function getRoleEnum(roleString: string) {
    switch (roleString) {
      case 'CLIENT':
        return Role.CLIENT
      case 'ADMIN':
        return Role.ADMIN
      case 'OWNER':
        return Role.OWNER
      case 'SUPERVISOR':
        return Role.SUPERVISOR
      default:
        return undefined
    }
  }

  export async function createUser(email:string, name: string, role: string, bio: string) {
    try {
      const newRole = getRoleEnum(role)
      const user = await prisma.user.create({
        data: {
          email,
          name,
          role: newRole,
          profile: {
            create: {
              bio: bio,
            },
          },
        }
      })
  
      return { user }
    } catch (error) {
      return { error }
    }
  }

  export async function deleteUser(id: string){
    try {
      const user = await prisma.todo.delete({ where: { id } })
      return { user }
    } catch (error) {
      return { error }
    }
  }

  export async function getUserBio(userId: string) {
    try {
      const userProfile = await prisma.user.findUnique({
        where: { id: userId },
        include: { profile: true },
      })
      return userProfile?.profile?.bio || ''
    } catch (error) {
      console.error(error)
      return ''
    }
  }


  export async function deleteAllUsers() {
    try {
      const users = await prisma.user.deleteMany()
      return { users }
    } catch (error) {
      return { error }
    }
  }