import { Link, Image, Money } from "@shopify/hydrogen";

export default function ProductGridItem({ product }) {
  const { title, handle, featuredImage } = product;
  const { priceV2: price, compareAtPriceV2: compareAtPrice } = product.variants?.nodes[0] || {};
  const isDiscounted = compareAtPrice?.amount > price?.amount;


  return (
    <div className="product-grid-item">
      <Link to={`products/${handle}`}>
        <div className="image-container">
            <Image alt={featuredImage?.altText || 'Product image'} data={featuredImage} />
        </div>
        <div className="product-grid-item-title">{title}</div>
        <div className="product-grid-prices">
            <Money withoutTrailingZeros data={price} />
            {isDiscounted && (<Money className="product-compare-at-price" withoutTrailingZeros data={compareAtPrice}/>)}
        </div>
      </Link>
    </div>
  );
}