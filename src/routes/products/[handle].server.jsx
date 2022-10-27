import { useShopQuery, CacheLong, useRouteParams, gql, Seo } from "@shopify/hydrogen";
import Layout from '../../components/Layout.server';
import ProductDetails from "../../components/ProductDetails.client";

export default function Product(){
    const { handle } = useRouteParams();

    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong(),
        preload: true,
        variables: {
            handle
        }
    });

    const { data: { product } } = data;

    if(!product){
        return (
            <Layout>
                <div className="container">
                    <h1>Product not found</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Seo type="product" data={product} />
            <div className="product-page container">
                <ProductDetails product={product} />
            </div>
        </Layout>
    );
};

const QUERY = gql`
    query Product($handle: String!) {
        product(handle: $handle) {
            title
            descriptionHtml
            media(first: 1) {
                nodes {
                    ... on MediaImage {
                        id
                        image {
                            url
                            width
                            height
                            altText
                        }
                    }
                }
            }
            variants(first: 250) {
                nodes {
                    id
                    availableForSale
                    priceV2 {
                        amount
                        currencyCode
                    }
                    compareAtPriceV2 { 
                        amount
                        currencyCode
                    }
                    selectedOptions { 
                        name
                        value
                    }
                }
            }
        }
    }
`;