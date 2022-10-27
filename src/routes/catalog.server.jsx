import { useShopQuery, CacheLong, gql } from '@shopify/hydrogen';
import Layout from '../components/Layout.server';
import ProductGridItem from '../components/ProductGridItem.server';

export default function Catalog(){
    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
        preload: true,
    });

    const { data: { products: { nodes } } } = data;

    return (
        <Layout>
            <div className="catalog-page continer">
                <div className="product-grid">
                    {nodes.map((product) => (
                        <ProductGridItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </Layout>
    );
}

const QUERY = gql`
    query products {
        products(first: 250){
            nodes {
                id
                title
                handle
                featuredImage {
                    url
                    altText
                    height
                    width
                }
                variants(first: 1) {
                    nodes {
                        priceV2 {
                            amount
                            currencyCode
                        }
                        compareAtPriceV2 { 
                            amount
                            currencyCode
                        }
                    }
                }
            }
        }
    }
`;