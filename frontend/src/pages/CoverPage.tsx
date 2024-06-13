import { Link } from 'react-router-dom'
import '../index.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function CoverPage() {
  return (
    <>
      <div className="cover-content">
        <div className="container border rounded">
          <br />
          <br />
          <h3>Fashion Forward Trend 2024.</h3>
          <br />
          <h1>
            <strong>Where</strong> Quality Meets <strong>Convenience.</strong>
          </h1>
          <br />
          <h6>
            Your trendy e-commerce destination: “<strong>RAJ Store</strong>{' '}
            offers the latest 2024 women’s fashion collection, where style meets
            convenience. Shop now!
          </h6>
          <br />
          <Link to="/home" className="shop-link">
            <div className="cointainer border shop">
              Shop Now
              <i className="bi bi-arrow-right" style={{ fontSize: 20 }}></i>
            </div>
          </Link>
          <img src="splash.png" alt="Your Image" className="splash"></img>
        </div>
        <div className="cover-page"></div>
      </div>
    </>
  )
}
