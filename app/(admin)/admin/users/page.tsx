"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { DataTable, DataTableColumn } from "@/components/ui/data-table"
import useUsers from "./_hooks/useUsers"
import { formatDate } from "@/lib/utils"

interface User {
    id: string
    name: string
    email: string
    phone: string | null
    avatar?: string
    role_id: string
    address: string | null
    created_at: string
    updated_at: string
    role: {
        id: string
        name: string
        score: number
        description: string
    }
}

export default function AdminUsersPage() {
    const {
        listData,
        listLoading,
        listError,
        search,
        setSearch,
        limit,
        setPage,
        setLimit,
        statusFilter,
        setStatusFilter,
        handlePageChange,
    } = useUsers("users")

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value)
    }

    const users = listData?.users || []
    const pagination = listData?.pagination

    const columns: DataTableColumn<User>[] = [
        {
            key: "avatar",
            header: "Avatar",
            cell: (u) => (
                <img
                    src={u.avatar || "/placeholder.png"}
                    alt={u.name}
                    className="h-10 w-10 rounded-full object-cover"
                />
            ),
        },
        {
            key: "name",
            header: "Name",
            sortable: true,
            cell: (u) => u.name,
        },
        {
            key: "email",
            header: "Email",
            sortable: true,
            cell: (u) => u.email,
        },
        {
            key: "phone",
            header: "Phone",
            cell: (u) => u.phone || "N/A",
        },
        {
            key: "role",
            header: "Role",
            sortable: true,
            cell: (u) => (
                <span
                    className={`px-2 py-1 text-xs rounded-lg font-medium ${u.role.name === "ADMIN"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                        }`}
                >
                    {u.role.name}
                </span>
            ),
        },
        {
            key: "created_at",
            header: "Created",
            sortable: true,
            cell: (u) => formatDate(new Date(u.created_at)),
        },
        {
            key: "updated_at",
            header: "Updated",
            sortable: true,
            cell: (u) => formatDate(new Date(u.updated_at)),
        },
    ]

    return (
        <div className="container mx-auto py-4">
            <Card>
                <div className="p-4">
                    <div className="flex justify-between mb-6">
                        <h1 className="text-xl font-semibold">User Management</h1>

                        {/* Right Controls */}
                        <div className="flex gap-3">
                            {/* SEARCH */}
                            <div className="relative w-72">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Search users..."
                                    className="pl-9 w-full"
                                    value={search}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>

                    <CardContent className="p-0">
                        <DataTable
                            data={users}
                            columns={columns}
                            isLoading={listLoading}
                            error={listError ? "Failed to load users. Please try again." : undefined}
                            keyExtractor={(u) => u.id}
                            searchQuery={search}
                            pagination={{
                                pageSize: limit,
                                total: pagination?.total,
                                pageSizeOptions: [10, 20, 50, 100],
                                serverSide: true,
                                position: "bottom",
                                showSizeChanger: true,
                                onPageChange: handlePageChange,
                                onPageSizeChange: setLimit,
                            }}
                            selectable={false}
                            searchable={false}
                            showColumnFilters={false}
                        />
                    </CardContent>
                </div>
            </Card>
        </div>
    )
}