'use client'

import { useRef } from "react"
import { createTodoAction } from "@/actions/_todoActions"
import { experimental_useFormStatus as useFormStatus } from "react-dom"
import { Button } from "@/ui/button"
import { Loader2, PlusCircleIcon } from "lucide-react"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/ui/card"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/ui/dialog"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import React from "react"

const NewTodoForm = () => {
    const formRef = useRef<HTMLFormElement>(null)
    const { pending } = useFormStatus()
    const [open, setOpen] = React.useState(false);

    async function action(formData: FormData) {
        const title = formData.get('title') as string
        if (!title || typeof title !== 'string') return

        await wait()
        // Call server action to create a todo
        await createTodoAction(title)
        // reset the form
        formRef.current?.reset()
    }
    
    const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

    return (
        <>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline">
                        <PlusCircleIcon className="h-3 w-3 ml-2" />
                        <span>إضافة مهمة</span>
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <form ref={formRef} action={action}>
                        <DialogHeader>
                            <DialogTitle>أضف مهمة جديدة</DialogTitle>
                            <DialogDescription>
                                أضف مهمات جديدة كل يوم لتتمكن من انجازها.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    إسم/عنوان المهمة
                                </Label>
                                <Input id="name" name="title" className="col-span-3" />
                            </div>
                        </div>
                        <DialogFooter >
                            <div className="w-full flex justify-between">
                            <Button type="submit" disabled={pending}>
                                {pending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'حفظ'}
                            </Button>
                            <Button type="reset" variant="ghost">إلغاء</Button>
                            </div>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default NewTodoForm