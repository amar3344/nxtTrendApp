const SimilarProductItem = props => {
  const {similarProducts} = props
  return (
    <>
      <h1>Similar Products</h1>
      <ul className="similar-products-container">
        {similarProducts.map(eachItem => (
          <li>
            <img src={eachItem.image_url} alt={eachItem.title} />
            <p>{eachItem.title}</p>
            <p>By : {eachItem.brand}</p>
            <div>
              <p>{eachItem.price}</p>
              <p>{eachItem.rating}</p>
            </div>
          </li>
        ))}
      </ul>
    </>
  )
}

export default SimilarProductItem
