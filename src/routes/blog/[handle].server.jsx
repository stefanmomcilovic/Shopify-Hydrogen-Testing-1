import {
    useShopQuery,
    useLocalization,
    Seo,
    gql,
    Image,
    useRouteParams,
} from '@shopify/hydrogen';
import Layout from "../../components/Layout.server";

export default function Article() {
    const { handle } = useRouteParams();

    const data = useShopQuery({
        query: QUERY,
        variables: {
            blog_handle: 'journal',
            article_handle: handle
        }
    });

    const {data: {blog: {articleByHandle: article} } } = data;

   const { 
        language: {isoCode: languageCode},
        country: {isoCode: countryCode}
     } = useLocalization();

    const formattedDate = new Intl.DateTimeFormat(
        `${languageCode}-${countryCode}`,
        {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        }
    ).format(new Date(article.publishedAt));


    if(!article) {
        return (
            <Layout>
                <div className="container">
                    <h1>Article not found</h1>
                </div>
            </Layout>
        );
    }

    return (
        <Layout>
            <Seo type='article' data={article} />
            <div className="article-page container">
                <div className="article-page-header">
                    <h1>{article.title}</h1>
                    <span>{formattedDate} . {article.authorV2.name}</span>
                </div>
                <article>
                    <Image data={article.image} alt={article.image?.altText || 'Blog Image'} className='image-container' />
                    <div dangerouslySetInnerHTML={{__html: article.contentHtml}} className='article-body' />
                </article>
            </div>
        </Layout>
    );
}

const QUERY = gql`
    query article($blog_handle: String!, $article_handle: String!) {
        blog(handle: $blog_handle) {
            articleByHandle(handle: $article_handle) {
                title
                publishedAt
                contentHtml
                authorV2 {
                    name
                }
                image {
                    url
                    altText
                    height
                    width
                }
            }
        }
    }
`;