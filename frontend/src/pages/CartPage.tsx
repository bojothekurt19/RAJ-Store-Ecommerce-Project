import { useContext } from 'react'
import { Store } from '../storeData'
import { Link, useNavigate } from 'react-router-dom'
import { cartItem } from '../types/cartItem'
import { toast } from 'react-toastify'
import { Helmet } from 'react-helmet-async'
import { Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import MessageBox from '../components/MessageBox'
import { CurrencyFormat } from '../types/CurrencyFormat'
import '../index.css'

export default function CartPage() {
  const navigate = useNavigate()
  const {
    state: {
      mode,
      cart: { cartItems },
    },
    dispatch,
  } = useContext(Store)

  const updateCartHandler = (item: cartItem, quantity: number) => {
    if (item.stockCount < quantity) {
      toast.warn('Sorry, Item is unavailable.')
      return
    }
    dispatch({
      type: 'Add_To_Cart',
      payload: { ...item, quantity },
    })
  }
  const checkoutHandler = () => {
    navigate('signin?redirect=/shipping')
  }
  const removeItemfromCartHandler = (item: cartItem) => {
    dispatch({ type: 'Remove_Item_From_Cart', payload: item })
  }
  const removeAllCartItemsHandler = () => {
    dispatch({ type: 'Clear_Cart' })
  }

  const calculateSubtotal = () => {
    return {
      quantity: cartItems.reduce(
        (initialize, currentItem) => initialize + currentItem.quantity,
        0
      ),
      totalPrice: cartItems.reduce(
        (initialize, currentItem) =>
          initialize + currentItem.price * currentItem.quantity,
        0
      ),
    }
  }
  const summary = calculateSubtotal()

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is empty. <Link to="/">Home</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item: cartItem) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    <Col md={4}>
                      <Link to={`/product/${item.url}`}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="img-fluid rounded img-thumbnail"
                        ></img>
                        {item.name}
                      </Link>
                    </Col>
                    <Col md={3}>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity - 1)
                        }
                        variant={mode}
                        disabled={item.quantity === 1}
                      >
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>
                      <Button
                        onClick={() =>
                          updateCartHandler(item, item.quantity + 1)
                        }
                        variant={mode}
                        disabled={item.quantity === item.stockCount}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>{CurrencyFormat(item.price)}</Col>
                    <Col md={2}>
                      <Button
                        onClick={() => removeItemfromCartHandler(item)}
                        variant="light"
                      >
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Subtotal ({summary.quantity} items):
                    {CurrencyFormat(summary.totalPrice)}
                  </h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <div className="d-grid">
                    <Button
                      type="button"
                      variant="primary"
                      onClick={checkoutHandler}
                      disabled={cartItems.length === 0}
                    >
                      Proceed to Checkout
                    </Button>
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <div className="clear-save">
        <Col md={4}>
          <Card>
            <Card.Body>
              <ListGroup horizontal>
                <Link to="/">
                  <Button variant="secondary">Save</Button>
                </Link>
                <Button
                  onClick={removeAllCartItemsHandler}
                  variant="secondary"
                  className="clear-cart"
                >
                  Clear Cart
                </Button>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </div>
    </div>
  )
}
