import { getUsers } from '@/lib/users'
import { Metadata } from 'next/types'
import { DataTable } from './dataTable'
import { columns } from './columns'
import { Button } from '@/ui/button'
import Link from 'next/link'
import { PlusIcon } from 'lucide-react'

export const metadata: Metadata = {
  title: `المستخدمين`,
  description: 'Hosting accounts listing page',
}


export const dynamic = 'force-dynamic'
const Page = async () => {
  const { users } = await getUsers()

  return (
    <section className='py-20'>
      <div className='container'>
        <div className="flex items-center justify-between">
          <h1 className='mb-10 w-fit px-2 text-4xl font-bold text-slate-800'>
            المستخدمين
          </h1>

          <Button asChild size={'sm'}>
            <Link href='/users/add'><PlusIcon className='ml-2 h-4 w-4' /> <span>إضافة مستخدم</span> </Link>
          </Button>
        </div>


        <div className='mt-10' />
        {users && (
          <DataTable columns={columns} data={users} />
        )}
      </div>
    </section>
  )
}

export default Page



// The error is: Type 'User[] | undefined' is not assignable to type 'User[]'.
// Type 'undefined' is not assignable to type 'User[]'.ts(2322)
// dataTable.tsx(30, 3): The expected type comes from property 'data' which is declared here on type 'IntrinsicAttributes & DataTableProps<User, unknown>'
// (property) DataTableProps<User, unknown>.data: User[]