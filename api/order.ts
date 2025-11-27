import { mapCartItemsForBackend } from '@/lib/utils';
import { http } from '../config/http';
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface OrderItem {
  product_id: string
  quantity: number
}

interface CreateOrderPayload {
  items: OrderItem[]
  payment_method: "CASH_ON_DELIVERY" | "STRIPE"
  address_id: string
  notes?: string
}

/**
 * Create order by user
 */
export function useCreateOrder() {
  return useMutation({
    mutationFn: async (data: CreateOrderPayload) => {
      console.log("Creating order with payload:", data)

      const response = await http.post("/orders", data)

      if (!response?.data) {
        throw new Error("Failed to create order")
      }
      return response.data
    },
    onError: (error: any) => {
      console.error("Order creation error:", error)
      throw new Error(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to create order"
      )
    },
  })
}

/**
 * Fetch User order
 */
export function useMyOrder(enabled = true) {
  return useQuery({
    queryKey: ["user-orders"],
    queryFn: async () => {
      const response = await http.get("/orders/my-orders");
      const { data } = response;
      if (!data) throw new Error("No order data found");
      return data;
    },
    enabled,
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

/**
 * Fetch single order details by ID
 */
export function useGetOrderDetails(orderId: string, enabled = true) {
  return useQuery({
    queryKey: ["order-details", orderId],
    queryFn: async () => {
      const response = await http.get(`/orders/${orderId}`)
      const { data } = response.data
      if (!data) throw new Error("Order not found")
      return data
    },
    enabled: enabled && !!orderId,
    retry: 1,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })
}