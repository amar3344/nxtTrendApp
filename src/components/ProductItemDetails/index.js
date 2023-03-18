import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import './index.css'
import Header from '../Header'
import SimilarProductItem from '../SimilarProductItem'

const apiStatus = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const jwtToken = Cookies.get('jwt_token')

const ProductItemDetails = props => {
  const [productObject, setProductObject] = useState({})
  const [similarProducts, setSimilarProducts] = useState([])
  const [currentApiStatus, setCurrentApiStatus] = useState(apiStatus.initial)
  const [quantity, setQuantity] = useState(1)

  const clickAddingPlus = () => {
    setQuantity(q => q + 1)
  }

  const clickSubQuantity = () => {
    if (quantity > 1) {
      setQuantity(q => q - 1)
    }
  }

  const getSuccessFullViewOfProduct = () => (
    <>
      <Header />
      <div className="single-product-view">
        <div className="product-container">
          <img
            src={productObject.image_url}
            alt="product"
            className="product-image"
          />
          <div>
            <h1 className="heading">{productObject.title}</h1>
            <p className="price-tag">Rs {productObject.price}</p>
            <div className="review-ratings">
              <div className="rating-container">
                <p className="rating-text">{productObject.rating}</p>
                <AiFillStar className="star-rating" />
              </div>
              <p className="review-text">
                {productObject.total_reviews} Reviews
              </p>
            </div>
            <p className="description">{productObject.description}</p>
            <p className="available-text">
              Available :{' '}
              <span className="span-ele">{productObject.availability}</span>
            </p>
            <p className="available-text">
              Brand : <span className="span-ele">{productObject.brand}</span>
            </p>
            <hr />
            <div className="adding-quantity">
              <button
                type="button"
                className="add-sub-quantity"
                onClick={clickAddingPlus}
                data-testid="plus"
              >
                <BsPlusSquare />
              </button>
              <p>{quantity}</p>
              <button
                type="button"
                className="add-sub-quantity"
                onClick={clickSubQuantity}
                data-testid="minus"
              >
                <BsDashSquare />
              </button>
            </div>
            <button type="button" className="add-to-cart-button">
              ADD TO CART
            </button>
          </div>
        </div>
        <div className="similar-products">
          <h1>Similar Products</h1>
          <ul className="similar-products-container">
            {similarProducts.map(eachItem => (
              <SimilarProductItem
                key={eachItem.id}
                similarProducts={eachItem}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  )

  const getBackToProducts = () => {
    const {history} = props
    return history.replace('/products')
  }
  const FailureViewOfProduct = () => (
    <div>
      <Header />
      <div className="error-view-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
          className="error-view-image"
        />
        <h1 className="error-view-heading">Product Not Found</h1>
        <button
          type="button"
          className="continue-shopping-button"
          onClick={getBackToProducts}
        >
          continue shopping
        </button>
      </div>
    </div>
  )

  const renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#fff" width={50} height={50} />
    </div>
  )

  useEffect(() => {
    setCurrentApiStatus(apiStatus.inProgress)
    const getProductDetails = async () => {
      const {match} = props
      const {id} = match.params
      const url = `https://apis.ccbp.in/products/${id}`
      const options = {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      }

      const res = await fetch(url, options)
      const data = await res.json()
      if (res.ok === true) {
        setCurrentApiStatus(apiStatus.success)
        setProductObject(data)
        setSimilarProducts(data.similar_products)
      } else {
        setCurrentApiStatus(apiStatus.failure)
        FailureViewOfProduct(data.error)
      }
    }
    getProductDetails()
  }, [])

  const renderProductObjectView = () => {
    switch (currentApiStatus) {
      case apiStatus.inProgress:
        return renderLoader()
      case apiStatus.success:
        return getSuccessFullViewOfProduct()
      case apiStatus.failure:
        return FailureViewOfProduct()
      default:
        return ''
    }
  }

  return renderProductObjectView()
}

export default ProductItemDetails
