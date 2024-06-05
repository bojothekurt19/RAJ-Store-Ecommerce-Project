import { Row, Col } from 'react-bootstrap'
import LoadingBox from '../components/LoadingBox'
import MessageBox from '../components/MessageBox'
import ProductItem from '../components/ProductItem'
import { Helmet } from 'react-helmet-async'
import { useGetProductQuery } from '../hooks/productHook'
import { ApiError } from '../types/ApiError'
import { getError } from '../utilities'
import '../index.css'

export default function Home() {
  const { data: products, isLoading, error } = useGetProductQuery()

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : (
    <Row className="flex-wrap">
      <Helmet>
        <title>RAJ STORE</title>
      </Helmet>
      {products!.map((product) => (
        <Col key={product.url} sm={6} m={4} lg={3} className="Product-Col">
          <ProductItem product={product} />
        </Col>
      ))}
    </Row>
  )
}
