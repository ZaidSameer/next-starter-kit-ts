"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, ExternalLink, ArrowDown, ChevronDownIcon, Loader2, Delete, Copy } from "lucide-react"
import { Button } from "@/ui/button"
import { Todo } from "@prisma/client"
import { deleteTodoAction, updateTodoAction } from '@/actions/_todoActions'
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import Link from "next/link"
import { Switch } from "@/ui/switch"
import { Badge } from "@/components/ui/badge"
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import React, { startTransition, useTransition } from "react"
import { todo } from "node:test"
type Checked = DropdownMenuCheckboxItemProps["checked"]

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

export const columns: ColumnDef<Todo>[] = [

  {
    accessorKey: "id",
    header: () => <div className="text-center">#</div>,
    cell: ({ row }) => {
      const index = row.index + 1
      return <div className="text-center text-[10px]">{index}</div>
    },
  },

  {
    accessorKey: "title",
    header: () => <div className="text-right">الاسم</div>,
    cell: ({ row }) => {
      return <div className="text-right text-sm">{row.getValue('title')}</div>
    },
  },


  {
    accessorKey: "isCompleted",
    header: () => <div className="text-center">الحالة</div>,
    cell: ({ row }) => {
      const [isChecked, setIsChecked] = React.useState<Checked>(false)
      const [isPending, startTransition] = useTransition()
      const isCompleted: boolean = row.getValue('isCompleted')
      const todoID: string = row.getValue('id')
      let status: String;
      let statusCss;

      switch (isCompleted) {
        case true:
          status = "مكتملة";
          statusCss = "text-green-500 bg-green-100 border-green-300";
          break;
        case false:
          status = "غير مكتملة";
          statusCss = "text-red-500 bg-red-100 border-red-300";
          break;
        default:
          status = "";
          break;
      }
      return (
        <div className="flex items-center justify-center">
          <div className="text-center">
            <DropdownMenu dir="rtl">
              <DropdownMenuTrigger asChild>
                <Button variant={null} size={"sm"} className={`font-normal rounded-xl text-[10px] focus-visible:ring-0 ${statusCss}`}>
                  {
                    isPending ?
                      (<Loader2 className="h-3 w-3 animate-spin" />)
                      : (status)
                  }
                  {isPending ? "" : <ChevronDownIcon className="mr-1 h-3 w-3" />}

                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                <DropdownMenuLabel className="text-[10px]">تغيير الحالة</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  className="text-[10px]"
                  disabled={isCompleted === false ? false : true}
                  checked={isCompleted === false ? false : true}
                  onCheckedChange={e =>
                    startTransition(() => updateTodoAction(todoID, !isCompleted))
                  }
                >
                  <span className="pr-4">مكتملة</span>
                </DropdownMenuCheckboxItem>

                <DropdownMenuCheckboxItem
                  className="text-[10px]"
                  disabled={isCompleted === false ? true : false}
                  checked={isCompleted === false ? true : false}
                  onCheckedChange={e =>
                    startTransition(() => updateTodoAction(todoID, !isCompleted))
                  }
                >
                  <span className="pr-4">غير مكتملة</span>
                </DropdownMenuCheckboxItem>

              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      )
    },
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">أُضيفت في</div>,
    cell: ({ row }) => {

      const rawData: string = row.getValue('createdAt');
      const createdAt = new Date(rawData).toLocaleString(undefined, options);
      // Expected 0 arguments, but got 2.
      console.log(createdAt);
      return <div className="text-center text-[10px]">{createdAt}</div>
    }
  },
  {
    accessorKey: "updatedAt",
    header: () => <div className="text-center">آخر تحديث</div>,
    cell: ({ row }) => {

      const rawData: string = row.getValue('updatedAt');
      const updatedAt = new Date(rawData).toLocaleString(undefined, options);
      // Expected 0 arguments, but got 2.
      console.log(updatedAt);
      return <div className="text-center text-[10px]">{updatedAt}</div>
    }
  },

  {
    id: "tools",
    header: () => <div className="text-center">أدوات</div>,
    cell: ({ row }) => {
      const rows = row.original
      return (
        <div className="text-center">
          <DropdownMenu dir="rtl">
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0 text-center">
                <span className="sr-only">إفتح القائمة</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" >
              <DropdownMenuLabel className="text-[10px]">أدوات</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-[10px]" onClick={() => navigator.clipboard.writeText(rows.title)} >
                <Copy className="ml-2 h-3 w-3" />
                <span>نسخ</span>
              </DropdownMenuItem>

              <DropdownMenuItem className="text-[10px]"
                onClick={() => deleteTodoAction(rows.id)} >
                <Delete className="ml-2 h-3 w-3" />
                <span>حذف</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]




