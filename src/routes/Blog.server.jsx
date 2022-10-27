import { useShopQuery, CacheLong, gql, Link, Image } from "@shopify/hydrogen";
import Layout from "../components/Layout.server";

export default function Blog(){
    const data = useShopQuery({
        query: QUERY,
        cache: CacheLong,
        preload: true,
        variables: {
            handle: "journal"
        }
    });

    const { data: { blog: { articles: { nodes: articles } } } } = data;

    return (
        <Layout>
            <h1>Blog</h1>
            <div className="container">
                <div className="article-grid">
                    {articles.map((article) => {
                        return (
                           <ArticleGridItem key={article.id} article={article} />
                        );
                    })}
                </div>
            </div>
        </Layout>
    );
}

function ArticleGridItem({ article }){
    return (
        <div className="article-grid-item" key={article.id}>
            <Link to={`/blog/${article.handle}`} className='image-container'>
                <Image data={article.image} alt={article.image?.altText || 'Blog Image'} />
            </Link>
            <Link to={`/blog/${article.handle}`} className='article-grid-item-title'>
                <h2>{article.title}</h2>
            </Link>
        </div>
    );
}

const QUERY = gql`
    query articles($handle: String!) {
        blog(handle: $handle) {
            articles(first: 250) {
                nodes {
                    id
                    title
                    handle
                    image {
                        id
                        width
                        height
                        url
                        altText
                    }
                }
            }
        }
    }
`;