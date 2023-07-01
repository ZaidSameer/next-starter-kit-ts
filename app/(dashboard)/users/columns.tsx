"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal, ArrowUpDown, ExternalLink } from "lucide-react"
import { Button } from "@/ui/button"
import { User } from "@prisma/client"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/ui/dropdown-menu"
import Link from "next/link"
import { timeAgo } from "@/lib/utils"

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

export const columns: ColumnDef<User>[] = [

  {
    accessorKey: "id",
    header: () => <div className="text-center">#</div>,
    cell: ({ row }) => {
      const index = row.index + 1
      return <div className="text-center text-[10px]">{index}</div>
    },
  },

  {
    accessorKey: "name",
    header: () => <div className="text-center">الاسم</div>,
    cell: ({ row }) => {
      console.log(row.original);
      return <div className="text-center text-[10px]">{row.getValue('name')}</div>
    },
  },

  {
    accessorKey: "email",
    header: () => <div className="text-center">البريد الألكتروني</div>,

    cell: ({ row }) => {
      const email: string = row.getValue('email');
      const rows = row.original;

      return (
        <div className="flex justify-center items-center">
          <Link href={`mailto:${email}`} onClick={() => navigator.clipboard.writeText(email)} className={`text-emerald-600 text-center flex items-center text-sm`} target="_blank">
          {email}
        </Link>
        </div>
      )
    },
  },
  {
    accessorKey: "bio",
    header: () => <div className="text-right">نبذة</div>,
    cell: ({row}) => {
      const userBio: string =  row.getValue('bio');
      // const userBio = getUserBio(userId);
      return <div className="text-right text-[10px]">{userBio}</div>
    }
  },
  {
    accessorKey: "role",
    header: () => <div className="text-right">الرتبة</div>,
    // header: ({ column }) => {
    //   return (
    //     <Button
    //     className="flex text-right"
    //       variant="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //     >
    //       الرتبة
    //       <ArrowUpDown className="mr-2 h-4 w-4" />
    //     </Button>
    //   )
    // },
    cell: ({ row }) => {

      const role: string = row.getValue('role')
      let userRole: String;
      switch (role) {
        case "admin":
          userRole = "مدير";
          break;
        case "user":
          userRole = "مستخدم";
          break;
          case "OWNER":
          userRole = "مالك";
          break;
        default:
          userRole = "مستخدم";
          break;
      }
      return <div className="text-right text-[10px]">{userRole}</div>
    },
  },

  {
    accessorKey: "isActive",
    header: () => <div className="text-center">الحالة</div>,
    cell: ({ row }) => {
      const role: string = row.getValue('isActive')
      let status: String;
      switch (role) {
        case "true":
          status = "نشط";
          break;
        case "false":
          status = "غير نشط";
          break;
        default:
          status = "غير نشط";
          break;
      }
      return <div className="text-center text-[10px]">{status}</div>
    },
  },

  {
    accessorKey: "createdAt",
    header: () => <div className="text-center">تاريخ الإنضمام</div>,
    cell: ({ row }) => {
      
      const rawData: Date = row.getValue('createdAt');
      // const createdAt: Date = new Date(rawData).toLocaleString(undefined, options);
      // Expected 0 arguments, but got 2.
      console.log(timeAgo(rawData));
      return <div className="text-center text-[10px]">{timeAgo(rawData)}</div>
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0 text-center">
                <span className="sr-only">إفتح القائمة</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="text-right">
              <DropdownMenuLabel className="text-right">أدوات</DropdownMenuLabel>
              <DropdownMenuItem className="text-right" onClick={() => navigator.clipboard.writeText(rows.email)} >
                نسخ البريد الألكتروني
              </DropdownMenuItem>
              <DropdownMenuItem className="text-right">مشاهدة المستخدم</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  },
]




