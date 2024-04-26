import { Link } from 'react-router-dom'
import { sampleProduct } from '../data'
import { Row, Col } from 'react-bootstrap'

export default function Home() {
  return (
    <Row>
      {sampleProduct.map((product) => (
        <Col key={product.id} sm={6} m={4} lg={3}>
          <Link to={'product/' + product.name}>
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p> {product.price} </p>
          </Link>
        </Col>
      ))}
    </Row>
  )
}
