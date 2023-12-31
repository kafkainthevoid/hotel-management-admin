import { redirect } from 'next/navigation'
import Link from 'next/link'

import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'
import { getAuthSession } from '@/lib/auth'
import { db } from '@/lib/db'

const MainLayout = async ({ children }: { children: React.ReactNode }) => {
  const userAuth = await getAuthSession()

  if (!userAuth) redirect('/sign-in')

  const user = await db.user.findUnique({ where: { id: userAuth.user.id } })

  if (user?.role !== 'ADMIN' && user?.role !== 'STAFF')
    return (
      <div className='h-full flex items-center justify-center flex-col gap-5'>
        <h1 className='font-bold text-3xl'>
          You do not have permission to access this site
        </h1>
        <Link className='text-blue-600 underline' href='http://localhost:4000'>
          Go to Homepage
        </Link>
      </div>
    )

  return (
    <div className='h-full flex'>
      <Sidebar />
      <main className='flex-1'>
        <TopBar user={user!} />
        {children}
      </main>
    </div>
  )
}

export default MainLayout
