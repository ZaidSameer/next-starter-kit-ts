'use client'

import { useRef } from "react"
// import { createUserAction } from "../_userActions"

const NewTodoForm = () => {
    const formRef = useRef<HTMLFormElement>(null)

    async function action(formData: FormData) {
        const name = formData.get('name') as string
        if (!name || typeof name !== 'string') return

        // Call server action to create a todo
        // await createUserAction(name)
        // reset the form
        formRef.current?.reset()
    }


    return (
        <form ref={formRef} action={action}>
            <h2 className='mb-2 font-medium'>أضف مستخدم جديد</h2>
            <input
                type='text'
                name='title'
                className='max-w-md w-full rounded border border-slate-400 px-2 py-0.5 focus:outline-none focus:border-slate-600'
            />
            <button
                type='submit'
                className='mr-2 rounded bg-slate-700 px-2 py-1 text-sm text-white disabled:bg-opacity-50'
            >
                حفظ
            </button>
        </form>
    )
}

export default NewTodoForm