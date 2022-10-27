import { useShopQuery, CacheLong, gql, useRouteParams } from '@shopify/hydrogen';
import Layout from '../../components/Layout.server';
import ProductGridItem from '../../components/ProductGridItem.server';

export default function Collection(){
    const { handle } = useRouteParams();
    
    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
        preload: true,
        variables: {
            handle
        }
    });

    const { data: { collection: { title, products: { nodes } } } } = data;

    if(!nodes){
        return (
            <Layout>
                <div className="container">
                    <h1>Collection not found</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <div className="catalog-page continer">
                <h1>{title}</h1>
                <div className="product-grid">
                    {nodes.map((product) => (
                        <ProductGridItem key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </Layout>
    );
};

const QUERY = gql`
    query Collection($handle: String!) {
       collection(handle: $handle) {
            id
            title
            description
            seo {
                description
                title
            }
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
    }
`;