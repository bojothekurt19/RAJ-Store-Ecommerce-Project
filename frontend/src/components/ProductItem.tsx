import { Button, Card } from 'react-bootstrap'
import { Product } from '../types/Product'
import { Link } from 'react-router-dom'
import Rating from './Rating'
import { CurrencyFormat } from '../types/CurrencyFormat'
import { useContext } from 'react'
import { Store } from '../storeData'
import { cartItem } from '../types/cartItem'
import { productToCart } from '../utilities'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ProductItem({ product }: { product: Product }) {
  const { state, dispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state
  const AddToCart = (item: cartItem) => {
    const existingItem = cartItems.find((x) => x._id === product._id)
    const quantity = existingItem ? existingItem.quantity + 1 : 1
    if (product.stockCount < quantity) {
      alert('Sorry. Product is out of stock.')
      return
    }
    dispatch({
      type: 'Add_To_Cart',
      payload: { ...item, quantity },
    })
    toast.success('Product added to the cart.', {
      autoClose: 200,
      hideProgressBar: true, // Hide the progress bar
      pauseOnHover: false, // Do not pause the toast when hovered
      draggable: false, // Disable dragging
    })
  }

  return (
    <Card style={{ height: '100%' }}>
      <Link to={`/product/${product.url}`}>
        <img
          src={product.image}
          alt={product.name}
          className="card-img-top"
          style={{ height: '320px', objectFit: 'cover' }}
        />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.url}`}>
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
          <Button onClick={() => AddToCart(productToCart(product))}>
            {' '}
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}

export default ProductItem
