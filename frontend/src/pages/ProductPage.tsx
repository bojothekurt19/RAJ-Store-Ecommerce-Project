import { Helmet } from 'react-helmet-async'
import MessageBox from '../components/MessageBox'
import { ApiError } from '../types/ApiError'
import LoadingBox from '../components/LoadingBox'
import { useGetProductUrlQuery } from '../hooks/productHook'
import { getError, productToCart } from '../utilities'
import { useNavigate, useParams } from 'react-router-dom'
import { Badge, Button, Card, Col, ListGroup, Row } from 'react-bootstrap'
import Rating from '../components/Rating'
import '../index.css'
import { CurrencyFormat } from '../types/CurrencyFormat'
import { useContext } from 'react'
import { Store } from '../storeData'
import { toast } from 'react-toastify'

// interface ClearCartAction {
//   type: 'Clear_Cart'
// }
function ProductPage() {
  const params = useParams()
  const { url } = params

  const { data: product, isLoading, error } = useGetProductUrlQuery(url!)

  const { state, dispatch } = useContext(Store)
  const { cart } = state

  const navigate = useNavigate()

  const AddToCart = () => {
    const existingItem = cart.cartItems.find((x) => x._id === product!._id)
    const quantity = existingItem ? existingItem.quantity + 1 : 1
    if (product!.stockCount < quantity) {
      toast.warn('Sorry. Product is not available.')
      return
    }
    dispatch({
      type: 'Add_To_Cart',
      payload: { ...productToCart(product!), quantity },
    })
    toast.success('Product added to the cart.')
    navigate('/cart')
  }

  // const clearCartAction: ClearCartAction = { type: 'Clear_Cart' }
  // dispatch(clearCartAction)

  return isLoading ? (
    <LoadingBox />
  ) : error ? (
    <MessageBox variant="danger">
      {getError(error as unknown as ApiError)}
    </MessageBox>
  ) : !product ? (
    <MessageBox variant="danger">Product Not Found</MessageBox>
  ) : (
    <div>
      <Row>
        <Col md={6}>
          <img className="large" src={product.image} alt={product.name}></img>
        </Col>
        <Col md={3}>
          <ListGroup variant="flush">
            <ListGroup.Item>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <h1>{product.name}</h1>
            </ListGroup.Item>
            <ListGroup.Item>
              <Rating
                rating={product.rating}
                numberOfReviews={product.numberOfReviews}
              ></Rating>
            </ListGroup.Item>
            <ListGroup.Item>
              Price : {CurrencyFormat(product.price)}
            </ListGroup.Item>
            <ListGroup.Item>
              Description:
              <p>{product.description}</p>
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>{CurrencyFormat(product.price)}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      {product.stockCount > 0 ? (
                        <Badge bg="success">In Stock</Badge>
                      ) : (
                        <Badge bg="danger">Unavailable</Badge>
                      )}
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.stockCount > 0 && (
                  <ListGroup.Item>
                    <div className="d-grid">
                      <Button onClick={AddToCart} variant="primary">
                        Add to Cart
                      </Button>
                    </div>
                    {/* <Button
                      onClick={() => dispatch(clearCartAction)}
                      variant="primary"
                    >
                      Clear Cart
                    </Button> */}
                  </ListGroup.Item>
                )}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  )
}
export default ProductPage
