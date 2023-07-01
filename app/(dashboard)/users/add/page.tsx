'use client'

import { useRef } from "react"
import { createUserAction } from "@/actions/_userActions"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/ui/card"
import { Input } from "@/ui/input"
import { Label } from "@/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/ui/select"
import { Button } from "@/ui/button"
import { Textarea } from "@/ui/textarea"


const AddNewUserPage = async ({ }) => {

    const formRef = useRef<HTMLFormElement>(null)

    async function action(formData: FormData) {
        const name = formData.get('name')
        const email = formData.get('name')
        const role = formData.get('role')
        const bio = formData.get('bio')
        if (!name || typeof name !== 'string') return
        if (!email || typeof email !== 'string') return
        if (!role || typeof role !== 'string') return
        if (!bio || typeof bio !== 'string') return

        // Call server action to create a todo
        await createUserAction(name, email, role, bio)
        // reset the form
        formRef.current?.reset()
    }


    return (
        <section className='py-20'>
            <div className='container'>
                <div className="flex items-center justify-between">
                    <h1 className='mb-10 w-fit px-2 text-4xl font-bold text-slate-800'>
                        أضف مستخدم جديد
                    </h1>
                </div>
                <form ref={formRef} action={action}>
                    <Card className="w-[350px]">
                        <CardHeader>
                            <CardTitle>إدخال مستخدم جديد</CardTitle>
                            <CardDescription>أضف مستخدم جديد من خلال إدخال معلوماته   </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="grid w-full items-center gap-4">
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="name">الإسم</Label>
                                    <Input id="name" name="name" placeholder="اكتب اسمك" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="email">البريد الألكتروني</Label>
                                    <Input id="email" name="email" placeholder="اكتب البريد الإلكتروني" />
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="role">الرتبة</Label>
                                    <Select dir="rtl" name="role">
                                        <SelectTrigger>
                                            <SelectValue placeholder="إختر الرتبة" />
                                            <SelectContent position="popper">
                                                <SelectItem value="CLIENT">زبون/عميل</SelectItem>
                                                <SelectItem value="ADMIN">مدير</SelectItem>
                                                <SelectItem value="OWNER">مالك</SelectItem>
                                                <SelectItem value="SUPERVISOR">مشرف</SelectItem>
                                            </SelectContent>
                                        </SelectTrigger>
                                    </Select>
                                </div>
                                <div className="flex flex-col space-y-1.5">
                                    <Label htmlFor="bio">نبذة</Label>
                                    <Textarea placeholder="اكتب نبذه هنا" name="bio" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex justify-between">
                            <Button type="submit">حفظ</Button>
                            <Button variant="ghost" type="reset">إلغاء</Button>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </section>
    )
}

export default AddNewUserPage