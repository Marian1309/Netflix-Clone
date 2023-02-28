import { hash } from 'bcrypt'
import type { NextApiRequest, NextApiResponse } from 'next'

import prisma from '@prisma'

import { HttpMethod } from '@types'

type RegisterResponse = { message: string } | any

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<RegisterResponse>
) {
  if ((req.method as HttpMethod) === 'POST') {
    try {
      console.log(req.body)
      const { email, name, password } = req.body

      const existedUser = await prisma.user.findUnique({
        where: {
          email
        }
      })

      if (existedUser) {
        return res.status(422).json({ message: 'Email taken' })
      }

      const hashedPassword = await hash(password, 12)

      const user = await prisma.user.create({
        data: {
          email,
          name,
          hashedPassword,
          image: '',
          emailVerified: new Date()
        }
      })

      return res.status(200).json(user)
    } catch (err: any) {
      console.log(err.message)
    }
  }
}
