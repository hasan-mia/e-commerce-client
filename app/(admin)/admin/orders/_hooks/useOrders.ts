"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import {
    updateJsonMutationConfig,
    type MutationParameters,
    useGet,
} from "@/api/api"
import { AxiosError } from "axios"
import useCustomToast from "@/hooks/use-custom-toast"

type OrderStatus = "PENDING" | "PROCESSING" | "SHIPPED" | "DELIVERED" | "CANCELLED" | "REFUNDED"

export default function useOrders(pageName?: string, id?: string) {
    const toast = useCustomToast()
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [search, setSearch] = useState("")
    const [statusFilter, setStatusFilter] = useState<string>("ALL")

    // --- LIST ORDERS ---
    const {
        data: listData,
        isPending: listLoading,
        refetch: refetchList,
        isError: listError
    } = useGet(
        `/orders?page=${page}&limit=${encodeURIComponent(limit)}&search=${encodeURIComponent(search || "")}&status=${statusFilter !== "ALL" ? statusFilter : ""}`,
        "orders_list",
        pageName === "orders",
    )

    // --- GET SINGLE ORDER ---
    const {
        data: details,
        isPending: detailLoading,
        refetch: refetchDetail,
    } = useGet(
        id ? `/orders/${id}` : "",
        `order_detail_${id}`,
        pageName === "detail" && !!id,
    )

    // --- MUTATIONS ---
    const updateMutation = useMutation<any, Error, MutationParameters>(
        updateJsonMutationConfig(queryClient, "orders_list"),
    )

    // --- UPDATE ORDER STATUS ---
    const updateOrderStatus = async (orderId: string, status: OrderStatus, tracking_number?: string) => {
        try {
            const payload: any = { status }

            // Add tracking number if provided and status is SHIPPED
            if (tracking_number && status === "SHIPPED") {
                payload.tracking_number = tracking_number
            }

            const response = await updateMutation.mutateAsync({
                url: `/orders/${orderId}/status`,
                data: payload,
            })

            if (response?.success) {
                toast.success(response.message || "Order status updated successfully")
                queryClient.invalidateQueries({ queryKey: ["orders_list"] })
                queryClient.invalidateQueries({ queryKey: [`order_detail_${orderId}`] })
            }

            return response
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message || "Failed to update order status")
            } else {
                console.error("An error occurred:", error)
            }
            throw error
        }
    }

    // Handle Pagination
    const handlePageChange = (page: number) => {
        setPage(page)
    }

    const fetchData = useCallback(async () => {
        await refetchList()
    }, [refetchList])

    const memoizedFetchData = useMemo(() => fetchData, [fetchData])

    useEffect(() => {
        if (pageName === "orders") {
            memoizedFetchData()
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
        // Single detail
        details,
        detailLoading,
        refetchDetail,
        // Actions
        updateOrderStatus,
    }
}