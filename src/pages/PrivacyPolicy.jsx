import React, { useEffect } from 'react';
import Lenis from 'lenis';
import '../styles/Policies.css';

const PrivacyPolicy = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        window.lenis = lenis;

        return () => {
            lenis.destroy();
            window.lenis = null;
        };
    }, []);

    return (
        <div className="policy-page">
            <header className="policy-hero">
                <div className="container">
                    <h1>Privacy Policy</h1>
                </div>
            </header>
            <main className="policy-content">
                <div className="container">
                    <div className="policy-text-wrapper">
                        <p>This Privacy Policy describes how newlifeproject.myshopify.com (the “Site” or “we”) collects, uses, and discloses your Personal Information when you visit or make a purchase from the Site.</p>
                        
                        <h3>Collecting Personal Information</h3>
                        <p>When you visit the Site, we collect certain information about your device, your interaction with the Site, and information necessary to process your purchases. We may also collect additional information if you contact us for customer support. In this Privacy Policy, we refer to any information that can uniquely identify an individual (including the information below) as “Personal Information”. See the list below for more information about what Personal Information we collect and why.</p>
                        
                        <h3>Device information</h3>
                        <ul>
                            <li><strong>Examples of Personal Information collected:</strong> version of web browser, IP address, time zone, cookie information, what sites or products you view, search terms, and how you interact with the Site.</li>
                            <li><strong>Purpose of collection:</strong> to load the Site accurately for you, and to perform analytics on Site usage to optimize our Site.</li>
                            <li><strong>Source of collection:</strong> Collected automatically when you access our Site using cookies, log files, web beacons, tags, or pixels.</li>
                            <li><strong>Disclosure for a business purpose:</strong> shared with our processor Shopify.</li>
                        </ul>
 
                        <h3>Order information</h3>
                        <ul>
                            <li><strong>Examples of Personal Information collected:</strong> name, billing address, shipping address, payment information (including credit card numbers), email address, and phone number.</li>
                            <li><strong>Purpose of collection:</strong> to provide products or services to you to fulfill our contract, to process your payment information, arrange for shipping, and provide you with invoices and/or order confirmations, communicate with you, screen our orders for potential risk or fraud, and when in line with the preferences you have shared with us, provide you with information or advertising relating to our products or services.</li>
                            <li><strong>Source of collection:</strong> collected from you.</li>
                            <li><strong>Disclosure for a business purpose:</strong> shared with our processor Shopify.</li>
                        </ul>
 
                        <h3>Sharing Personal Information</h3>
                        <p>We share your Personal Information with service providers to help us provide our services and fulfill our contracts with you, as described above. For example:</p>
                        <ul>
                            <li>We use Shopify to power our online store. You can read more about how Shopify uses your Personal Information here: https://www.shopify.com/legal/privacy.</li>
                            <li>We may share your Personal Information to comply with applicable laws and regulations, to respond to a subpoena, search warrant or other lawful request for information we receive, or to otherwise protect our rights.</li>
                        </ul>
 
                        <h3>Using Personal Information</h3>
                        <p>We use your personal Information to provide our services to you, which includes: offering products for sale, processing payments, shipping and fulfillment of your order, and keeping you up to date on new products, services, and offers.</p>
 
                        <h3>Cookies</h3>
                        <p>A cookie is a small amount of information that’s downloaded to your computer or device when you visit our Site. We use a number of different cookies, including functional, performance, advertising, and social media or content cookies. Cookies make your browsing experience better by allowing the website to remember your actions and preferences (such as login and region selection).</p>
 
                        <h3>Changes</h3>
                        <p>We may update this Privacy Policy from time to time in order to reflect, for example, changes to our practices or for other operational, legal, or regulatory reasons.</p>
 
                        <h3>Contact</h3>
                        <p>For more information about our privacy practices, if you have questions, or if you would like to make a complaint, please contact us by e-mail at info@newlifeproject.org or by mail using the details provided below:</p>
                        <p>2000 Thurston Drive, Unit 5, Ottawa ON K1G 4K7, Canada</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default PrivacyPolicy;
