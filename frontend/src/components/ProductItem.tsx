import { Button, Card } from 'react-bootstrap'
import { Product } from '../types/Product'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { CurrencyFormat } from '../types/CurrencyFormat'

function ProductItem({ product }: { product: Product }) {
  return (
    <Card style={{ height: '100%' }}>
      <Link to={`/product/ ${product.id}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: '320px', objectFit: 'cover' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/ ${product.id}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating
          rating={product.rating}
          numberOfReviews={product.numberOfReviews}
        />
        <Card.Text>{CurrencyFormat(product.price)}</Card.Text>
        {product.stockCount === 0 ? (
          <Button variant="Light" disabled>
            Out of stock
          </Button>
        ) : (
          <Button> Add to cart</Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem
