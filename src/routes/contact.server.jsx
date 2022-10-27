import {Form} from '@shopify/hydrogen/experimental';
import Layout from '../components/Layout.server';

export default function Contact() {
    return (
        <Layout>
        <h1>Contact Us</h1>

        <Form action='/contact#ContactForm' id='ContactForm'>
            <div className="form-group">
                <label>
                    First name <input type="text" name="first-name" required minLength={3} />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Last name <input type="text" name="last-name" required minLength={3} />
                </label>
            </div>
            <div className="form-group">
                <label>
                    Email <input type="email" name="email" required minLength={3} pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$" />
                </label>
            </div>
            <div className="form-group">
                <label>Message </label><br/>
                <textarea name="message" required minLength={20} rows={15} cols={30} />
            </div>
            <div className="form-group">
                <button type="submit">Send message</button>
            </div>            
        </Form>

        <div className="contact-us">
            <h2>Our Address</h2>
            <p>123 Main Street</p>
            <p>Anytown, USA</p>
            <p>12345</p>

            <h2>Or Send Us An Email</h2>
            <p><a href="mailto:contactus@example.com">contactus@example.com</a></p>
        </div>
        </Layout>
    );
}