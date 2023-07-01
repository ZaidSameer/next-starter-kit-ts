import { getTodos } from '@/lib/todos'
import NewTodoForm from '@/components/NewTodoForm'
import TodoItem from '@/components/TodoItem'
import { Todo } from '@prisma/client'
import { DataTable } from './dataTable'
import { columns } from './columns'

export const dynamic = 'force-dynamic'

const Page = async () => {
  const { todos } = await getTodos()

  return (
    <section className='py-20'>
      <div className='container'>
        <div className='flex items-center justify-between'>
        <h1 className='mb-10 w-fit px-2 text-4xl font-bold text-slate-800'>
          المهمات
        </h1>

        <NewTodoForm />
        </div>

        <h2 className='mt-10 border-b pb-2 text-xl font-semibold'>
          المهمات السابقة
        </h2>
        <div className='mt-10' />
        {todos && (
          <DataTable columns={columns} data={todos} />
        )}
        <ul className='mt-4 flex flex-col gap-1'>
          {todos?.length !== 0 ? todos?.map((todo : Todo) => (
            <TodoItem key={todo.id} todo={todo} />
          )) : (
            <p className='text-slate-500'>لايوجد مهمات حاليا... قم بإضافة مهمة.</p>
          )}
        </ul>
      </div>
    </section>
  )
}

export default Page