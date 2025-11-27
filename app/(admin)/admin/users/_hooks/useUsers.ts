"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useGet } from "@/api/api"

export default function useUsers(pageName?: string, id?: string) {
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("ALL")

    // Build query params
    const queryParams = useMemo(() => {
        const params = new URLSearchParams()
        params.append('page', page.toString())
        params.append('limit', limit.toString())
        if (search) params.append('search', search)
        if (statusFilter && statusFilter !== 'ALL') params.append('role', statusFilter)
        return params.toString()
    }, [page, limit, search, statusFilter])

    // --- LIST USERS ---
    const {
        data: listData,
        isPending: listLoading,
        refetch: refetchList,
        isError: listError
    } = useGet(
        `/auth/users?${queryParams}`,
        "user_list",
        pageName === "users",
    )

    // Handle Pagination
    const handlePageChange = (newPage: number) => {
        setPage(newPage)
    }

    const fetchData = useCallback(async () => {
        await refetchList()
    }, [refetchList])

    const memoizedFetchData = useMemo(() => fetchData, [fetchData])

    useEffect(() => {
        if (pageName === "users") {
            const timeout = setTimeout(() => {
                memoizedFetchData()
            }, 500)
            return () => clearTimeout(timeout)
        }
    }, [memoizedFetchData, page, limit, search, statusFilter, pageName])

    return {
        page,
        setPage,
        limit,
        setLimit,
        search,
        setSearch,
        statusFilter,
        setStatusFilter,
        handlePageChange,
        // List
        listData,
        listLoading,
        refetchList,
        listError,
    }
}