"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { useQueryClient, useMutation } from "@tanstack/react-query"
import {
    createJsonMutationConfig,
    deleteMutationConfig,
    type MutationParameters,
    updateJsonMutationConfig,
    useGet,
} from "@/api/api"
import { AxiosError } from "axios"
import { useUploadFiles } from "@/api/file"
import useCustomToast from "@/hooks/use-custom-toast"

export default function useCategories(pageName?: string, id?: string) {
    const toast = useCustomToast()
    const queryClient = useQueryClient()
    const [page, setPage] = useState(1)
    const [limit, setLimit] = useState(10)
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [uploadingIcon, setUploadingIcon] = useState(false)

    // File upload mutation
    const uploadMutation = useUploadFiles()

    // Initial form state
    const initialFormState = {
        name: "",
        description: "",
        icon: "",
    }

    const [formState, setFormState] = useState(initialFormState)

    const handleInputChange = (e: any) => {
        const { name, value } = e.target
        setFormState((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    // --- LIST CATEGORIES ---
    const {
        data: listData,
        isPending: listLoading,
        refetch: refetchList,
        isError: listError
    } = useGet(
        `/categories/?page=${page}&limit=${encodeURIComponent(limit)}&search=${encodeURIComponent(search || "")}`,
        "categories_list",
        pageName === "categories",
    )

    // --- GET SINGLE CATEGORY ---
    const {
        data: details,
        isPending: detailLoading,
        refetch: refetchDetail,
    } = useGet(
        id ? `/categories/${id}` : "",
        `category_detail_${id}`,
        pageName === "update" && !!id,
    )

    // Reset form state when ID changes or mode changes
    useEffect(() => {
        if (pageName === "update" && id) {
            setFormState(initialFormState)
        } else if (pageName !== "update") {
            setFormState(initialFormState)
        }
    }, [id, pageName])

    // Populate form state with details data
    useEffect(() => {
        if (details?.data && pageName === "update") {
            setFormState({
                name: details.data.name || "",
                description: details.data.description || "",
                icon: details.data.icon || "",
            })
        }
    }, [details?.data, pageName])

    // --- MUTATIONS ---
    const createMutation = useMutation<any, Error, MutationParameters>(
        createJsonMutationConfig(queryClient, "categories_list"),
    )

    const updateMutation = useMutation<any, Error, MutationParameters>(
        updateJsonMutationConfig(queryClient, "categories_list"),
    )

    const deleteMutation = useMutation(deleteMutationConfig(queryClient, "categories_list"))

    // --- UPLOAD ICON (SINGLE FILE) ---
    const onUploadIcon = async (file: File) => {
        if (!file) {
            toast.error("No file selected for upload.")
            return
        }

        setUploadingIcon(true)
        try {
            const formData = new FormData()
            formData.append("file", file)

            const response = await uploadMutation.mutateAsync(formData)

            if (response?.success && response?.data) {
                // For single file upload, data is a string URL
                setFormState((prev) => ({
                    ...prev,
                    icon: response.data,
                }))
                toast.success("Icon uploaded successfully")
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Upload failed")
            } else {
                toast.error("Upload failed")
            }
        } finally {
            setUploadingIcon(false)
        }
    }

    // Remove icon
    const removeIcon = () => {
        setFormState((prev) => ({
            ...prev,
            icon: "",
        }))
    }

    // --- CREATE CATEGORY ---
    const createCategory = async (): Promise<void> => {
        setIsLoading(true)
        try {
            const payload = {
                name: formState.name,
                description: formState.description,
                icon: formState.icon,
            }

            const response = await createMutation.mutateAsync({
                url: '/categories',
                data: payload,
            })

            if (response?.success) {
                toast.success(response.message)
                refetchList()
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Failed to create category")
            }
        } finally {
            setIsLoading(false)
        }
    }

    // --- UPDATE CATEGORY ---
    const updateCategory = async (): Promise<void> => {
        if (!id) return
        setIsLoading(true)
        try {
            const payload = {
                name: formState.name,
                description: formState.description,
                icon: formState.icon,
            }

            const response = await updateMutation.mutateAsync({
                url: `/categories/${id}`,
                data: payload,
            })

            if (response?.success) {
                toast.success(response.message)
                queryClient.invalidateQueries({ queryKey: [`category_detail_${id}`] })
                queryClient.invalidateQueries({ queryKey: ["categories_list"] })
            }
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.message || "Failed to update category")
            }
        } finally {
            setIsLoading(false)
        }
    }

    // --- DELETE CATEGORY ---
    const onDeleteCategory = async (id: string) => {
        try {
            const response = await deleteMutation.mutateAsync(`/categories/${id}`)
            if (response) {
                toast.success("Category deleted successfully")
                queryClient.invalidateQueries({ queryKey: [`category_detail_${id}`] })
                queryClient.invalidateQueries({ queryKey: ["categories_list"] })
            }
        } catch (error) {
            if (error instanceof AxiosError) {
                toast.error(error?.response?.data?.message || "Failed to delete category")
            } else {
                console.error("An error occurred:", error)
            }
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
        if (pageName === "categories") {
            memoizedFetchData()
            const timeout = setTimeout(() => {
                memoizedFetchData()
            }, 500)
            return () => clearTimeout(timeout)
        }
    }, [memoizedFetchData, page, limit, search, pageName])

    // Clear form state when component unmounts
    useEffect(() => {
        return () => {
            if (pageName === "update") {
                setFormState(initialFormState)
            }
        }
    }, [])

    return {
        page,
        setPage,
        limit,
        setLimit,
        search,
        setSearch,
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
        // Form
        formState,
        handleInputChange,
        setFormState,
        // Actions
        createCategory,
        updateCategory,
        isLoading,
        // Delete
        onDeleteCategory,
        // Icon upload
        uploadingIcon,
        onUploadIcon,
        removeIcon,
    }
}