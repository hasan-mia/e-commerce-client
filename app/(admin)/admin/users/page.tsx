"use client"

import type React from "react"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Eye, Trash2, Edit, Search, Filter, Plug2Icon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { DataTable, DataTableColumn } from "@/components/ui/data-table"

// Define your data type
interface User {
    id: string
    name: string
    email: string
    role: string
    status: "active" | "inactive" | "pending"
    lastActive: string
}

// Sample data
const users: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john@example.com",
        role: "Admin",
        status: "active",
        lastActive: "2023-04-23T18:25:43.511Z",
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane@example.com",
        role: "User",
        status: "active",
        lastActive: "2023-04-22T14:15:23.123Z",
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob@example.com",
        role: "Editor",
        status: "inactive",
        lastActive: "2023-03-15T09:25:13.675Z",
    },
    {
        id: "4",
        name: "Alice Williams",
        email: "alice@example.com",
        role: "User",
        status: "pending",
        lastActive: "2023-04-24T11:02:34.249Z",
    },
    {
        id: "5",
        name: "Charlie Brown",
        email: "charlie@example.com",
        role: "User",
        status: "active",
        lastActive: "2023-04-21T16:45:58.111Z",
    },
    {
        id: "6",
        name: "Diana Prince",
        email: "diana@example.com",
        role: "Admin",
        status: "active",
        lastActive: "2023-04-23T20:15:33.817Z",
    },
    {
        id: "7",
        name: "Ethan Hunt",
        email: "ethan@example.com",
        role: "Editor",
        status: "inactive",
        lastActive: "2023-02-10T08:10:25.344Z",
    },
    {
        id: "8",
        name: "Fiona Gallagher",
        email: "fiona@example.com",
        role: "User",
        status: "pending",
        lastActive: "2023-04-24T09:45:12.583Z",
    },
    {
        id: "9",
        name: "George Miller",
        email: "george@example.com",
        role: "User",
        status: "active",
        lastActive: "2023-04-22T12:35:48.735Z",
    },
    {
        id: "10",
        name: "Hannah Baker",
        email: "hannah@example.com",
        role: "User",
        status: "active",
        lastActive: "2023-04-21T14:22:36.421Z",
    },
    {
        id: "11",
        name: "Ian Gallagher",
        email: "ian@example.com",
        role: "Editor",
        status: "active",
        lastActive: "2023-04-23T15:15:27.863Z",
    },
    {
        id: "12",
        name: "Julia Roberts",
        email: "julia@example.com",
        role: "User",
        status: "inactive",
        lastActive: "2023-03-25T10:05:32.975Z",
    },
    {
        id: "13",
        name: "Julia Roberts",
        email: "julia@example.com",
        role: "User",
        status: "inactive",
        lastActive: "2023-03-25T10:05:33.975Z",
    },
    {
        id: "14",
        name: "Julia Roberts",
        email: "julia@example.com",
        role: "User",
        status: "inactive",
        lastActive: "2023-03-25T10:05:34.975Z",
    },
    {
        id: "15",
        name: "Julia Roberts",
        email: "julia@example.com",
        role: "User",
        status: "inactive",
        lastActive: "2023-03-25T10:05:35.975Z",
    },
    {
        id: "16",
        name: "Julia Roberts",
        email: "julia@example.com",
        role: "User",
        status: "inactive",
        lastActive: "2023-03-25T10:05:36.975Z",
    },
    {
        id: "17",
        name: "Julia Roberts",
        email: "julia@example.com",
        role: "User",
        status: "inactive",
        lastActive: "2023-03-25T10:05:37.975Z",
    },
]

// Format date helper
const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
    }).format(date)
}

export default function UserPage() {
    const [searchQuery, setSearchQuery] = useState("")
    const [showFilters, setShowFilters] = useState(false)


    // Handle search
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value)
    }

    // Define columns
    const columns: DataTableColumn<User>[] = [
        {
            key: "name",
            header: "Name",
            cell: (user) => user.name,
            sortable: true,
        },
        {
            key: "email",
            header: "Email",
            cell: (user) => user.email,
            sortable: true,
        },
        {
            key: "role",
            header: "Role",
            cell: (user) => user.role,
            sortable: true,
            filterable: true,
            filterOptions: [
                { key: "Admin", value: "Admin" },
                { key: "Editor", value: "Editor" },
                { key: "User", value: "User" },
            ],
        },
        {
            key: "status",
            header: "Status",
            cell: (user) => (
                <Badge
                    className={
                        user.status === "active"
                            ? "bg-green-100 text-green-800 hover:bg-green-100"
                            : user.status === "inactive"
                                ? "bg-red-100 text-red-800 hover:bg-red-100"
                                : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                    }
                >
                    {user.status}
                </Badge>
            ),
            sortable: true,
            filterable: true,
            filterOptions: [
                { key: "active", value: "active" },
                { key: "inactive", value: "inactive" },
                { key: "pending", value: "pending" },
            ],
        },
        {
            key: "lastActive",
            header: "Last Active",
            cell: (user) => formatDate(user.lastActive),
            sortable: true,
        },
        {
            key: "actions",
            header: "Actions",
            cell: (user) => (
                <div className="flex space-x-2">
                    <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4" />
                    </Button>
                </div>
            ),
        },
    ]

    const renderExpandedRow = (item: User) => (
        <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-4 py-3">
                            Field
                        </th>
                        <th scope="col" className="px-4 py-3">
                            Value
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Name
                        </td>
                        <td className="px-4 py-3">{item.name}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Email
                        </td>
                        <td className="px-4 py-3">{item.email}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Role
                        </td>
                        <td className="px-4 py-3">{item.role}</td>
                    </tr>
                    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Status
                        </td>
                        <td className="px-4 py-3">
                            <Badge
                                className={
                                    item.status === "active"
                                        ? "bg-green-100 text-green-800 hover:bg-green-100"
                                        : item.status === "inactive"
                                            ? "bg-red-100 text-red-800 hover:bg-red-100"
                                            : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                }
                            >
                                {item.status}
                            </Badge>
                        </td>
                    </tr>
                    <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                        <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                            Last Active
                        </td>
                        <td className="px-4 py-3">{formatDate(item.lastActive)}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className="container mx-auto py-2 overflow-hidden">
            <Card>
                <div className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-6">
                        <div className="capitalize">
                            User management
                        </div>
                        <div className="flex justify-between gap-2">
                            <div className="relative max-w-4/12">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input placeholder="Search Users" className="pl-9 w-full" value={searchQuery} onChange={handleSearch} />
                            </div>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 sm:w-auto"
                                onClick={() => setShowFilters(!showFilters)}
                            >
                                <Filter className="h-4 w-4" />
                                Filter
                            </Button>
                            <Button
                                variant="outline"
                                className="flex items-center gap-2 sm:w-auto bg-green-600 text-white"
                            // onClick={() => openModal()}
                            >
                                <Plug2Icon />
                                Create
                            </Button>
                        </div>
                    </div>

                    <CardContent className="p-0 pb-2 overflow-y-auto overflow-hidden">
                        <DataTable
                            data={users}
                            columns={columns}
                            isLoading={!users}
                            keyExtractor={(user) => user.id}
                            pagination={{
                                pageSize: 2,
                                pageSizeOptions: [2, 5, 10, 20, 50, 100],
                                showSizeChanger: true,
                                serverSide: false,
                                position: 'bottom'
                            }}
                            searchable={false} // if handling search manually
                            searchQuery={searchQuery}
                            selectable={false}
                            // onSelectionChange={setSelectedUsers}
                            expandable
                            renderExpandedRow={renderExpandedRow}
                            showColumnFilters={showFilters}
                            className="shadow-sm"
                        />
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}
