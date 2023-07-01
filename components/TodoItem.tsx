'use client'

import { useTransition } from 'react'
import { Todo } from "@prisma/client"
import { deleteTodoAction, updateTodoAction } from '@/actions/_todoActions'
import { Switch } from './ui/switch'
import { Input } from './ui/input'
import { Label } from './ui/label'

type TodoItemProps = {
  todo: Todo
}

const TodoItem = ({ todo }: TodoItemProps) => {
  const [isPending, startTransition] = useTransition()

  // const date: Date = new Date();
  // const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  // const dateString: string = date.toLocaleDateString('en-US', options); // "August 17, 2021"

  const date: Date = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    hour12: true,
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hourCycle: 'h12',
    numberingSystem: 'latin',
  };
  const createdAt: string = todo.createdAt.toLocaleString('en', options);
  const updatedAt: string = todo.updatedAt.toLocaleString('en', options);

  return (
    <li className='flex items-center justify-between gap-3'>
        <Input
          id={todo.id}
          type='checkbox'
          defaultChecked={todo.isCompleted}
          onChange={e =>
            startTransition(() => updateTodoAction(todo.id, e.target.checked))
          }
          className='peer h-4 w-4 cursor-pointer rounded border-gray-300 text-slate-600 focus:ring-slate-600'
        />

        <Label
          htmlFor={todo.id}
          className='cursor-pointer peer-checked:text-slate-500 peer-checked:line-through'
        >
          {todo.title}
        </Label>
        <div className='mr-auto flex items-center gap-3 peer-checked:line-through'>
        <span className='text-sm text-slate-500 flex flex-col'>
          <span className='text-[12px]'>أضيفت في</span>
          <span>{createdAt}</span>
        </span>

        <span className='text-sm text-slate-500 flex flex-col'>
          <span className='text-[12px]'>آخر تحديث</span>
          <span>{updatedAt}</span>
        </span>

        <button className='mr-4 rounded w-8 h-8 bg-slate-200 hover:bg-slate-300 flex items-center justify-center text-[10px] text-slate-700' onClick={() => startTransition(() => deleteTodoAction(todo.id))}>
        <svg viewBox="0 0 1024 1024" width={18} height={18} xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#000000" d="M160 256H96a32 32 0 0 1 0-64h256V95.936a32 32 0 0 1 32-32h256a32 32 0 0 1 32 32V192h256a32 32 0 1 1 0 64h-64v672a32 32 0 0 1-32 32H192a32 32 0 0 1-32-32V256zm448-64v-64H416v64h192zM224 896h576V256H224v640zm192-128a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32zm192 0a32 32 0 0 1-32-32V416a32 32 0 0 1 64 0v320a32 32 0 0 1-32 32z"></path></g></svg>
        </button>
      </div>

      

    </li>
  )
}

export default TodoItem