import { useMutation, useQuery } from '@tanstack/react-query'
import apiClient from '../apiClient'
import { cartItem, shippingAddress } from '../types/cartItem'
import { Order } from '../types/Order'

export const useGetOrderDetailsQuery = (id: string) =>
  useQuery({
    queryKey: ['order', id],
    queryFn: async () => (await apiClient.get<Order>(`/api/orders/${id}`)).data,
  })
export const useGetPaypalClientIdQuery = () =>
  useQuery({
    queryKey: ['paypal-clientId'],
    queryFn: async () =>
      (await apiClient.get<{ clientId: string }>(`/api/keys/paypal`)).data,
  })
export const usePayOrderMutation = () =>
  useMutation({
    mutationFn: async (details: { orderId: string }) =>
      (
        await apiClient.put<{ message: string; order: Order }>(
          `/api/orders/${details.orderId}/pay`,
          details
        )
      ).data,
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

export const useGetOrderHistoryQuery = () =>
  useQuery({
    queryKey: ['order-history'],
    queryFn: async () =>
      (await apiClient.get<Order[]>(`/api/orders/mine`)).data,
  })

// export const useGetOrderHistoryQuery = () => {
//   const query = useQuery({
//     queryKey: ['order-history'],
//     queryFn: async () => {
//       console.log('Fetching order history...')
//       const response = await apiClient.get<Order[]>(`/api/orders/mine`)
//       console.log('Order history response:', response.data)
//       return response.data
//     },
//   })

//   console.log('Order history query:', query)

//   return query
// }
