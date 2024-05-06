import { Row, Col } from 'react-bootstrap'
// import { Product } from '../types/Product'
// import { useEffect, useReducer } from 'react'
// import { ApiError } from '../types/ApiError'
// import { getError } from '../utilities'
// import axios from 'axios'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { Helmet } from 'react-helmet-async'
import { useGetProductQuery } from '../hooks/productHook'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilities'

// type State = {
//   products: Product[]
//   loading: boolean
//   error: string
// }

// type Action =
//   | { type: 'FETCH REQUEST' }
//   | { type: 'FETCH SUCCESS'; payload: Product[] }
//   | { type: 'FETCH FAIL'; payload: string }

// const initialState: State = {
//   products: [],
//   loading: true,
//   error: '',
// }

// const reducer = (state: State, action: Action) => {
//   switch (action.type) {
//     case 'FETCH REQUEST':
//       return { ...state, loading: true }
//     case 'FETCH SUCCESS':
//       return { ...state, products: action.payload, loading: false }
//     case 'FETCH FAIL':
//       return { ...state, loading: false, error: action.payload }
//     default:
//       return state
//   }
// }

export default function Home() {
  // const [{ loading, error, products }, dispatch] = useReducer<
  //   React.Reducer<State, Action>
  // >(reducer, initialState)

  // useEffect(() => {
  //   const fetchData = async () => {
  //     dispatch({ type: 'FETCH REQUEST' })
  //     try {
  //       const result = await axios.get('/api/products')
  //       dispatch({ type: 'FETCH SUCCESS', payload: result.data })
  //     } catch (err) {
  //       dispatch({ type: 'FETCH FAIL', payload: getError(err as ApiError) })
  //     }
  //   }
  //   fetchData()
  // }, [])
  const { data: products, isLoading, error } = useGetProductQuery()

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <Row>
      <Helmet>
        <title>RAJ STORE</title>
      </Helmet>
      {products!.map((product) => (
        <Col key={product.id} sm={6} m={4} lg={3}>
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  )
}
