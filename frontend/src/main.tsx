import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './pages/Home.tsx'
import ProductPage from './pages/ProductPage.tsx'
// import axios from 'axios'
import { HelmetProvider } from 'react-helmet-async'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ColorTheme } from './storeData.tsx'
import CartPage from './pages/CartPage.tsx'
import SigninPage from './pages/SigninPage.tsx'
import SignupPage from './pages/SignupPage.tsx'
import ShippingAddressPage from './pages/ShippingAdressPage.tsx'
import PaymentMethodPage from './pages/PaymentMethodPage.tsx'
import ProtectedRoute from './components/protectedRoute.tsx'
import PlaceOrder from './pages/PlaceOrder.tsx'
import OrderPage from './pages/OrderPage.tsx'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'
import OrderHistory from './pages/OrderHistory.tsx'
import CoverPage from './pages/CoverPage.tsx'

// axios.defaults.baseURL =
//   process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : '/'

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />}>
        <Route index={true} element={<CoverPage />} />
        <Route path="home" element={<Home />} />
        <Route path="product/:url" element={<ProductPage />} />
        <Route path="cart" element={<CartPage />} />
        <Route path="signin" element={<SigninPage />} />
        <Route path="signup" element={<SignupPage />} />

        <Route path="" element={<ProtectedRoute />}>
          <Route path="shipping" element={<ShippingAddressPage />} />
          <Route path="payment" element={<PaymentMethodPage />} />
          <Route path="placeorder" element={<PlaceOrder />} />
          <Route path="/order/:id" element={<OrderPage />} />
          <Route path="purchase-history" element={<OrderHistory />} />
          {/* <Route path="/orderhistory" element={<OrderHistory />} /> */}
        </Route>
        {/* <Route path="dashboard" element={<Dashboard />} /> */}
        {/* ... etc. */}
      </Route>
    </>
  )
)
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ColorTheme>
      <PayPalScriptProvider
        options={{
          clientId:
            'AQzCXu7up7UVkEu_txDFrviScUK_brpdfRR5JAT9Ube0peaee-4Xurb0HH-ExpYLsdusRhI2fv3sqIsE',
        }}
        deferLoading={true}
      >
        <HelmetProvider>
          <QueryClientProvider client={queryClient}>
            <RouterProvider router={router} />
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </HelmetProvider>
      </PayPalScriptProvider>
    </ColorTheme>
  </React.StrictMode>
)
