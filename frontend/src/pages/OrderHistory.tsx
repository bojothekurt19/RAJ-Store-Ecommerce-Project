import { useNavigate } from 'react-router-dom'
import { useGetOrderHistoryQuery } from '../hooks/orderHooks'
import { Helmet } from 'react-helmet-async'
import { getError } from '../utilities'
import { ApiError } from '../types/ApiError'
import MessageBox from '../components/MessageBox'
import LoadingBox from '../components/LoadingBox'
import { Button } from 'react-bootstrap'
import { CurrencyFormat } from '../types/CurrencyFormat'

export default function OrderHistory() {
  const navigate = useNavigate()
  const { data: orders, isLoading, error } = useGetOrderHistoryQuery()
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {isLoading ? (
        <LoadingBox />
      ) : error ? (
        <MessageBox variant="danger">
          {getError(error as unknown as ApiError)}
        </MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders!.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>{CurrencyFormat(order.totalPrice)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    className="small"
                    onClick={() => {
                      navigate(`/order/${order._id}`)
                    }}
                  >
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
