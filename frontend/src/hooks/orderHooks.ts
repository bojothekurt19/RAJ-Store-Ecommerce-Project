import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { cartItem, shippingAddress } from '../types/cartItem'
import { Order } from '../types/Order'

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['order', id],
    queryFn: async () => (await apiClient.get<Order>(`/api/orders/${id}`)).data,
  })
export const useCreatedOrderMutaion = () =>
  useMutation({
    mutationFn: async (order: {
      orderItems: cartItem[]
      shippingAddress: shippingAddress
      paymentMethod: string
      itemsPrice: number
      shippingPrice: number
      taxPrice: number
      totalPrice: number
    }) =>
      (
        await apiClient.post<{ message: string; order: Order }>(
          `api/orders`,
          order
        )
      ).data,
  })
