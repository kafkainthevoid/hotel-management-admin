import { NextResponse } from 'next/server'

import { db } from '@/lib/db'
import { getAuthSession } from '@/lib/auth'

export async function GET(
  _: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId)
      return new NextResponse('User ID is missing', { status: 400 })

    const user = await db.user.findUnique({
      where: { id: params.userId },
      include: { address: true },
    })

    if (!user) return NextResponse.json({ message: 'No user found' })

    return NextResponse.json(user)
  } catch (err) {
    console.log('[USER_ID_GET]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

// TODO: change to patch later
export async function POST(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    if (!params.userId)
      return new NextResponse('User ID is missing', { status: 400 })
    const user = await db.user.findUnique({
      where: { id: params.userId },
      include: { address: true },
    })
    if (!user) return NextResponse.json({ message: 'No user found' })

    const body = await req.json()

    const { email, firstName, lastName, gender, phoneNumber, dateOfBirth } =
      body

    if (!email) return new NextResponse('Email is required', { status: 400 })

    console.log({ gender, dateOfBirth })

    await db.user.update({
      where: { id: params.userId },
      data: {
        email,
        firstName,
        lastName,
        sex: gender,
        birthday: dateOfBirth,
        address: {
          update: { data: { phone: phoneNumber } },
        },
      },
    })

    console.log(body)

    return NextResponse.json({ message: 'Updated successfully' })
  } catch (err) {
    console.log('[USER_ID_POST]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const userAuth = await getAuthSession()
    if (userAuth?.user.role !== 'ADMIN')
      return NextResponse.json({
        message: 'User do not have permission to perform this action',
      })

    const body = await req.json()

    const user = await db.user.findUnique({ where: { id: params.userId } })

    if (!user || user.id === userAuth.user.id)
      return NextResponse.json({ message: 'Invalid user' })

    await db.user.update({
      where: { id: params.userId },
      data: { role: body.role },
    })

    return NextResponse.json({ message: 'Updated successfully' })
  } catch (err) {
    console.log('[USER_ID_PATCH]', err)
    return new NextResponse('Internal error', { status: 500 })
  }
}
