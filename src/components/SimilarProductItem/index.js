import {AiFillStar} from 'react-icons/ai'

import './index.css'

const SimilarProductItem = props => {
  const {similarProducts} = props
  console.log(similarProducts)
  return (
    <li className="each-similar-products">
      <img
        src={similarProducts.image_url}
        alt={similarProducts.title}
        className="similar-product-image"
      />
      <p className="title">{similarProducts.title}</p>
      <p className="brand">by {similarProducts.brand}</p>
      <div>
        <p className="price">Rs {similarProducts.price}/- </p>
        <div>
          <p className="rating"> {similarProducts.rating}</p>
          <AiFillStar className="star-rating" />
        </div>
      </div>
    </li>
  )
}

export default SimilarProductItem
