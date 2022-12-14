import { useShopQuery, CacheLong, gql, Seo, Link, Image } from "@shopify/hydrogen";
import {Suspense} from 'react';
import ShopLogo from '../assets/images/hydrogen-logo-350x186.png';
import CartBubble from "./CartBubble.client";

export default function Layout({ children }) {

  const data = useShopQuery({
      query: SHOP_QUERY,
      cache: CacheLong(),
      preload: true,
  });

const { data: { shop } } = data;

  return (
    <>
        <Seo 
            type="defaultSeo"
            data={{
                title: shop.name,
                description: shop.description,
            }}
        />
        <header>
            <div className="container header-inner">
                <Link to="/" className="header-logo">
                    {ShopLogo ? <Image alt="Shop Logo" src={ShopLogo} width="150px" height="auto" /> : shop.name} 
                </Link>
                <ul className="header-navigation">
                    <li><Link to="/catalog">Catalog</Link></li>
                    <li><Link to="/collections/winter-2022">Winter 2022 Collection</Link></li>
                    <li><Link to="/about">About us</Link></li>
                    <li><Link to="/contact">Contact us</Link></li>
                    <li><Link to="/blog">Blog</Link></li>
                </ul>
                <Link to="/cart" className="header-cart-link">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                  </svg>
                  <CartBubble />
                </Link>
            </div>
        </header>
        <main>
            <Suspense fallback={'Loading...'}>{children}</Suspense>
        </main>
    </>
  );
}

const SHOP_QUERY = gql`
  query ShopInfo {
    shop {
      name
      description
    }
  }
`;