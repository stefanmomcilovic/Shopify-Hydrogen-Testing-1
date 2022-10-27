import Layout from "../components/Layout.server";
import { Link } from "@shopify/hydrogen";
export default function About(){
    return (
        <Layout>
            <h1>About Us</h1>
            <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tenetur officia iste velit sit aspernatur ad et accusamus fugiat quia atque laborum necessitatibus repellendus aliquid consequuntur recusandae molestias quos mollitia, ut voluptatibus praesentium cum consectetur? Incidunt ex officiis, magnam consectetur repellat accusamus iste, cum veniam molestias ducimus saepe pariatur est dignissimos.
            </p>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis voluptatum, veritatis quaerat eveniet facilis sapiente fugit amet quasi hic repellendus.
            </p>
            <p><Link to='/catalog'>Shop to support </Link></p>
        </Layout>
    );
}