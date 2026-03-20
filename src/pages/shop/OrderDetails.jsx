import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchOrder } from '../../api/woocommerce';
import {
    ArrowLeft, Package, CheckCircle2, Clock, Truck, AlertCircle,
    CreditCard, MapPin, User, Mail, Phone, Calendar, FileText, ChevronRight
} from 'lucide-react';
import '../../styles/shop/OrderDetails.css';

const STATUS_MAP = {
    pending:    { label: 'Pending Payment', className: 'status-pending', accent: '#FF9800', Icon: Clock },
    processing: { label: 'Processing',     className: 'status-processing', accent: '#2196F3', Icon: Package },
    'on-hold':  { label: 'On Hold',        className: 'status-onhold', accent: '#FF5722', Icon: AlertCircle },
    completed:  { label: 'Completed',      className: 'status-completed', accent: '#4CAF50', Icon: CheckCircle2 },
    cancelled:  { label: 'Cancelled',      className: 'status-cancelled', accent: '#F44336', Icon: AlertCircle },
    refunded:   { label: 'Refunded',       className: 'status-refunded', accent: '#9C27B0', Icon: AlertCircle },
    failed:     { label: 'Failed',         className: 'status-failed', accent: '#F44336', Icon: AlertCircle },
    shipped:    { label: 'Shipped',        className: 'status-shipped', accent: '#2e7d32', Icon: Truck },
};

const PROGRESS_STEPS = [
    { key: 'pending',    label: 'Ordered' },
    { key: 'processing', label: 'Processing' },
    { key: 'shipped',    label: 'Shipped' },
    { key: 'completed',  label: 'Delivered' },
];

function getProgressIndex(status) {
    if (status === 'completed') return 3;
    if (status === 'shipped') return 2;
    if (status === 'processing') return 1;
    return 0;
}

const InfoCard = ({ icon: Icon, title, children }) => (
    <div className="info-card">
        <div className="info-card-header">
            <div className="info-card-icon">
                <Icon size={16} />
            </div>
            <h3>{title}</h3>
        </div>
        <div className="info-card-body">{children}</div>
    </div>
);

const DetailRow = ({ label, value, mono }) => (
    <div className="detail-row">
        <span className="detail-label">{label}</span>
        <span className={`detail-value ${mono ? 'mono' : ''}`}>
            {value || '—'}
        </span>
    </div>
);

export default function OrderDetails() {
    const { id } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!user) { navigate('/shop/auth'); return; }
        const load = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await fetchOrder(id);
                if (!data) throw new Error('Order not found');
                setOrder(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, [id, user, navigate]);

    if (loading) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading order details…</p>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !order) {
        return (
            <div className="order-details-page">
                <div className="order-details-container">
                    <div className="error-state">
                        <AlertCircle size={48} />
                        <h2>Order Not Found</h2>
                        <p>{error || 'We couldn\'t find that order.'}</p>
                        <Link to="/shop/account" className="btn-primary">Back to My Orders</Link>
                    </div>
                </div>
            </div>
        );
    }

    const status = STATUS_MAP[order.status] || { label: order.status, className: 'status-default', accent: '#757575', Icon: Package };
    const billing = order.billing || {};
    const shipping = order.shipping || {};
    const progressIdx = getProgressIndex(order.status);
    const isCancelledOrFailed = ['cancelled', 'failed', 'refunded'].includes(order.status);

    const getMeta = (key) => {
        const m = order.meta_data?.find(m => m.key === key);
        return m?.value || null;
    };

    return (
        <div className="order-details-page">
            <div className="order-details-container">
                <Link to="/shop/account" className="back-link">
                    <ArrowLeft size={14} /> Back to My Orders
                </Link>

                <div className="order-header-card">
                    <div className="status-accent-bar" style={{ background: `linear-gradient(90deg, ${status.accent}, ${status.accent}88)` }} />
                    
                    <div className="order-header-content">
                        <div className="order-header-left">
                            <p className="eyebrow">Order Details</p>
                            <h1 className="order-title">Order #{order.id}</h1>
                        </div>
                        <div className="order-header-right">
                            <span className={`order-status-badge ${status.className}`}>
                                <status.Icon size={14} /> {status.label}
                            </span>
                            <p className="order-date">
                                <Calendar size={12} />
                                {new Date(order.date_created).toLocaleDateString('en-US', {
                                    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                                })}
                            </p>
                            {order.status === 'pending' && (
                                <Link
                                    to={`/shop/checkout?order=${order.id}`}
                                    className="pay-now-btn"
                                >
                                    Pay Now
                                </Link>
                            )}
                        </div>
                    </div>

                    {!isCancelledOrFailed && (
                        <div className="progress-tracker">
                            <div className="progress-line-bg" />
                            <div
                                className="progress-line-fill"
                                style={{
                                    width: `${(progressIdx / (PROGRESS_STEPS.length - 1)) * 80}%`,
                                    background: `linear-gradient(90deg, ${status.accent}, ${status.accent}cc)`,
                                }}
                            />

                            {PROGRESS_STEPS.map((step, idx) => {
                                const isActive = idx <= progressIdx;
                                const isCurrent = idx === progressIdx;
                                return (
                                    <div key={step.key} className="progress-step">
                                        <div className={`progress-circle ${isCurrent ? 'current' : isActive ? 'active' : ''}`}>
                                            {isActive && idx < progressIdx ? (
                                                <CheckCircle2 size={18} />
                                            ) : (
                                                idx + 1
                                            )}
                                        </div>
                                        <span className={`progress-label ${isActive ? 'active' : ''}`}>
                                            {step.label}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className="order-main-grid">
                    <div className="order-left-col">
                        <InfoCard icon={Package} title="Order Items">
                            <div className="order-items-list">
                                {order.line_items?.map((item) => (
                                    <div key={item.id} className="order-item">
                                        <div className="item-image">
                                            {item.image?.src ? (
                                                <img src={item.image.src} alt={item.name} />
                                            ) : (
                                                <div className="item-image-placeholder">
                                                    <Package size={20} />
                                                </div>
                                            )}
                                        </div>
                                        <div className="item-details">
                                            <p className="item-name">{item.name}</p>
                                            <p className="item-meta">
                                                Qty: <span className="bold">{item.quantity}</span>
                                                {item.sku && <> · SKU: <span className="mono">{item.sku}</span></>}
                                            </p>
                                        </div>
                                        <div className="item-price-col">
                                            <p className="item-price">${parseFloat(item.total).toFixed(2)}</p>
                                            {item.quantity > 1 && (
                                                <p className="item-unit-price">${parseFloat(item.price).toFixed(2)} each</p>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="order-totals">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>${(parseFloat(order.total) + parseFloat(order.discount_total || 0) - parseFloat(order.total_tax) - parseFloat(order.shipping_total || 0)).toFixed(2)}</span>
                                </div>
                                {parseFloat(order.shipping_total) > 0 && (
                                    <div className="total-row">
                                        <span>Shipping</span>
                                        <span>${parseFloat(order.shipping_total).toFixed(2)}</span>
                                    </div>
                                )}
                                {parseFloat(order.discount_total) > 0 && (
                                    <div className="total-row discount">
                                        <span>Discount</span>
                                        <span>-${parseFloat(order.discount_total).toFixed(2)}</span>
                                    </div>
                                )}
                                {parseFloat(order.total_tax) > 0 && (
                                    <div className="total-row">
                                        <span>Tax</span>
                                        <span>${parseFloat(order.total_tax).toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="total-row grand-total">
                                    <span>Total</span>
                                    <span>${parseFloat(order.total).toFixed(2)}</span>
                                </div>
                            </div>
                        </InfoCard>

                        {order.status !== 'pending' && (
                            <InfoCard icon={CreditCard} title="Payment Information">
                                <DetailRow label="Method" value={order.payment_method_title || order.payment_method || 'N/A'} />
                                <DetailRow label="Transaction ID" value={order.transaction_id} mono />
                                {order.date_paid && (
                                    <DetailRow label="Paid On" value={new Date(order.date_paid).toLocaleDateString('en-US', {
                                        year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
                                    })} />
                                )}
                                {getMeta('Stripe Payment ID') && (
                                    <>
                                        <DetailRow label="Card Brand" value={(getMeta('Stripe Card Brand') || '').toUpperCase()} />
                                        <DetailRow label="Card Last 4" value={getMeta('Stripe Card Last 4') ? `•••• ${getMeta('Stripe Card Last 4')}` : null} />
                                    </>
                                )}
                            </InfoCard>
                        )}
                    </div>

                    <div className="order-right-col">
                        <InfoCard icon={User} title="Billing Details">
                            <div className="billing-info">
                                <div className="billing-header">
                                    <div className="billing-avatar">
                                        <User size={16} />
                                    </div>
                                    <div>
                                        <p className="billing-name">
                                            {billing.first_name} {billing.last_name}
                                        </p>
                                        {billing.company && (
                                            <p className="billing-company">{billing.company}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="billing-details">
                                    {billing.email && (
                                        <div className="billing-detail-row">
                                            <Mail size={13} />
                                            <span>{billing.email}</span>
                                        </div>
                                    )}
                                    {billing.phone && (
                                        <div className="billing-detail-row">
                                            <Phone size={13} />
                                            <span>{billing.phone}</span>
                                        </div>
                                    )}
                                    {billing.address_1 && (
                                        <div className="billing-detail-row">
                                            <MapPin size={13} />
                                            <div>
                                                <p>{billing.address_1}</p>
                                                {billing.address_2 && <p>{billing.address_2}</p>}
                                                <p>{[billing.city, billing.state, billing.postcode].filter(Boolean).join(', ')}</p>
                                                <p className="billing-country">{billing.country}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </InfoCard>

                        <InfoCard icon={Truck} title="Shipping Address">
                            <div className="shipping-info">
                                <div className="shipping-header">
                                    <div className="shipping-avatar">
                                        <MapPin size={16} />
                                    </div>
                                    <p className="shipping-name">
                                        {shipping.first_name} {shipping.last_name}
                                    </p>
                                </div>

                                {shipping.address_1 ? (
                                    <div className="shipping-address-box">
                                        <p>{shipping.address_1}</p>
                                        {shipping.address_2 && <p>{shipping.address_2}</p>}
                                        <p>{[shipping.city, shipping.state, shipping.postcode].filter(Boolean).join(', ')}</p>
                                        <p className="shipping-country">{shipping.country}</p>
                                    </div>
                                ) : (
                                    <p className="shipping-same">Same as billing address</p>
                                )}

                                {order.shipping_lines?.length > 0 && (
                                    <div className="shipping-method">
                                        <p className="shipping-method-label">Method</p>
                                        <p className="shipping-method-value">
                                            {order.shipping_lines[0].method_title}
                                            {parseFloat(order.shipping_lines[0].total) > 0 && (
                                                <span className="shipping-cost">${parseFloat(order.shipping_lines[0].total).toFixed(2)}</span>
                                            )}
                                        </p>
                                    </div>
                                )}
                            </div>
                        </InfoCard>

                        {order.customer_note && (
                            <InfoCard icon={FileText} title="Order Notes">
                                <div className="order-notes-box">
                                    <p>{order.customer_note}</p>
                                </div>
                            </InfoCard>
                        )}

                        <div className="order-actions">
                            <Link to="/shop/account" className="btn-primary">
                                <ArrowLeft size={14} /> Back to Orders
                            </Link>
                            <Link to="/shop" className="btn-secondary">
                                Continue Shopping <ChevronRight size={14} />
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
