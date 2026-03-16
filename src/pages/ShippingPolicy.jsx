import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../styles/Policies.css';

const ShippingPolicy = () => {
    return (
        <div className="policy-page">
            <Navbar />
            <header className="policy-hero">
                <div className="container">
                    <h1>Shipping Policy</h1>
                </div>
            </header>
            <main className="policy-content">
                <div className="container">
                    <div className="policy-text-wrapper">
                        <p>It is our goal to process all orders within one (1) business day of receipt. Orders are processed and shipped during regular business hours (Monday through Friday from 9:00am - 5:00pm EST). If your order is placed on a weekend or holiday, your order will be processed and shipped the following business day. All orders placed after 1:00pm on a regular business day will be processed and shipped the following business day. All orders are subject to availability.</p>
                        
                        <p>All orders are shipped via FedEx Ground/Home, unless otherwise specified by customer. Due to the size of our products, we cannot deliver any orders to P.O. boxes. Please always provide a physical address to insure delivery. Depending on the destination, please allow 3-7 business days for shipping. For estimated delivery time to your location, please view the map below. NOTE: All shipping times shown below are estimates.</p>
                        
                        <h3>Expedited Shipping</h3>
                        <p>For guaranteed shipping, choose an expedited shipping method at checkout. Canada Post Mail shipping (1-3 business days) is not a guaranteed method of shipping. FedEx Expedited Shipping services are guaranteed and available at an additional fee. Please select the appropriate service during checkout to ensure timely delivery of your order.</p>
                        
                        <h3>International Shipping</h3>
                        <p>Shipping charges for international orders vary greatly. Please send us an e-mail at info@newlifeprojectinc.org with the item(s) that you are interested in buying, your full address, and the destination country. We will respond within two (2) business days with estimated shipping and handling charges. We will be happy to answer any questions that you have, so please let us know how we can help you. We cannot guarantee international shipments. Any delays in time, damages, or lost packages will have to be handled directly with the shipping carrier by the customer. You may be charged customs or import fees from the destination country prior to delivery. These charges are from the customs department of the country and are not the responsibility of NewLife Project Inc. In some cases, additional shipping charges may apply after your order is shipped.</p>
                        
                        <h3>Breakage</h3>
                        <p>At NewLife Project Inc., we strive to make your buying experience with us as easy as possible. We have worked to perfect our packaging and make our items as secure as possible using ground shipping guidelines. However, no matter how securely items are packaged, glass can occasionally break in transit. If you receive a damaged item, please contact us within seven (7) business days of receipt of your order. Claims of a later date will not be honored. A replacement for the broken item(s) will be issued.</p>
                        
                        <h3>Cancellations</h3>
                        <p>Once an order has been placed, it cannot be cancelled, rerouted, or redirected. If you would like to return the item, please see our Returns and Exchanges policy. Refusal of delivery of non-damaged goods will result in a minimum $10 return delivery fee.</p>
                        
                        <h3>Undeliverable Shipments</h3>
                        <p>Most shipping carriers make three attempts to deliver a package. Unless requested by customer, our packages do not require a signature for delivery. It is generally up to the delivery driver's discretion to determine whether a signature is required. If the driver feels it is best to obtain a signature and no one is present to accept the delivery after three attempts, the package will be returned to us. In this case, an additional shipping charge will be deducted from any refund and/or an additional shipping charge will be required for reshipment. In the case where an order was shipped as a gift directly to recipient(s), all undeliverable packages returned to NewLife Project Inc. will be forwarded to buyer's billing address.</p>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default ShippingPolicy;
