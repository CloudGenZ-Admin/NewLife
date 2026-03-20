import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchOrder } from '../../api/woocommerce';
import { ArrowLeft, Package, CheckCircle, Clock, XCircle, Truck } from 'lucide-react';
import '../../styles/shop/OrderDetails.css';

export default function OrderDetails() {
    const { id } = useParams();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadOrder();
    }, [id]);

    const loadOrder = async () => {
        try {
            setLoading(true);
            const data = await fetchOrder(id);
            setOrder(data);
        } catch (err) {
            setError(err.message || 'Failed to load order');
        } finally {
            setLoading(false);
        }
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'completed': return <CheckCircle size={20} />;
            case 'processing': return <Clock size={20} />;
            case 'pending': return <Clock size={20} />;
            case 'failed': return <XCircle size={20} />;
            case 'cancelled': return <XCircle size={20} />;
            default: return <Package size={20} />;
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'completed': return '#4CAF50';
            case 'processing': return '#2196F3';
            case 'pending': return '#FF9800';
            case 'failed': return '#F44336';
            case 'cancelled': return '#9E9E9E';
            default: return '#757575';
        }
    };

    if (loading) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="loading-state">
                        <div className="spinner" />
                        <p>Loading order details...</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="error-state">
                        <XCircle size={48} />
                        <h2>Order Not Found</h2>
                        <p>{error}</p>
                        <Link to="/shop" className="back-to-shop-btn">Back to Shop</Link>
                    </div>
                </div>
            </div>
        );
    }

    if (!order) return null;

    const stripePaymentId = order.meta_data?.find(m => m.key === 'Stripe Payment ID')?.value;
    const paymentReference = order.meta_data?.find(m => m.key === 'Payment Reference')?.value;

    return (
        <div className="order-details-page">
            <div className="order-details-container">
                <Link to="/shop/account" className="back-link">
                    <ArrowLeft size={16} /> Back to My Orders
                </Link>

                <div className="order-header">
                    <div>
                        <h1>Order #{order.id}</h1>
                        <p className="order-date">
                            Placed on {new Date(order.date_created).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </p>
                    </div>
                    <div className="order-status" style={{ backgroundColor: getStatusColor(order.status) + '20', color: getStatusColor(order.status) }}>
                        {getStatusIcon(order.status)}
                        <span>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
                    </div>
                </div>

                <div className="order-content">
                    <div className="order-main">
                        <div className="order-section">
                            <h2>Order Items</h2>
                            <div className="order-items">
                                {order.line_items.map((item) => (
                                    <div key={item.id} className="order-item">
                                        <img 
                                            src={item.image?.src || '/placeholder.png'} 
                                            alt={item.name}
                                            className="item-image"
                                        />
                                        <div className="item-details">
                                            <h3>{item.name}</h3>
                                            <p className="item-meta">Quantity: {item.quantity}</p>
                                            {item.meta_data && item.meta_data.length > 0 && (
                                                <div className="item-variations">
                                                    {item.meta_data.map((meta, idx) => (
                                                        <span key={idx}>{meta.display_key}: {meta.display_value}</span>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="item-price">
                                            ${parseFloat(item.total).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="order-section">
                            <h2>Shipping Address</h2>
                            <div className="address-card">
                                <p><strong>{order.shipping.first_name} {order.shipping.last_name}</strong></p>
                                <p>{order.shipping.address_1}</p>
                                {order.shipping.address_2 && <p>{order.shipping.address_2}</p>}
                                <p>{order.shipping.city}, {order.shipping.state} {order.shipping.postcode}</p>
                                <p>{order.shipping.country}</p>
                            </div>
                        </div>

                        {order.customer_note && (
                            <div className="order-section">
                                <h2>Order Notes</h2>
                                <div className="note-card">
                                    <p>{order.customer_note}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="order-sidebar">
                        <div className="order-summary-card">
                            <h2>Order Summary</h2>
                            <div className="summary-row">
                                <span>Subtotal</span>
                                <span>${parseFloat(order.total).toFixed(2)}</span>
                            </div>
                            {order.discount_total && parseFloat(order.discount_total) > 0 && (
                                <div className="summary-row discount">
                                    <span>Discount</span>
                                    <span>-${parseFloat(order.discount_total).toFixed(2)}</span>
                                </div>
                            )}
                            <div className="summary-row">
                                <span>Shipping</span>
                                <span>{parseFloat(order.shipping_total) === 0 ? 'Free' : `$${parseFloat(order.shipping_total).toFixed(2)}`}</span>
                            </div>
                            <div className="summary-row total">
                                <span>Total</span>
                                <span>${parseFloat(order.total).toFixed(2)}</span>
                            </div>
                        </div>

                        <div className="payment-info-card">
                            <h2>Payment Information</h2>
                            <div className="payment-detail">
                                <span>Method</span>
                                <span>{order.payment_method_title || 'Credit Card'}</span>
                            </div>
                            <div className="payment-detail">
                                <span>Status</span>
                                <span className={order.date_paid ? 'paid' : 'unpaid'}>
                                    {order.date_paid ? 'Paid' : 'Unpaid'}
                                </span>
                            </div>
                            {stripePaymentId && (
                                <div className="payment-detail">
                                    <span>Transaction ID</span>
                                    <span className="transaction-id">{stripePaymentId.substring(0, 20)}...</span>
                                </div>
                            )}
                            {paymentReference && (
                                <div className="payment-detail">
                                    <span>Reference</span>
                                    <span className="reference">{paymentReference}</span>
                                </div>
                            )}
                        </div>

                        <div className="order-actions">
                            <Link to="/shop" className="continue-shopping-btn">
                                Continue Shopping
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
