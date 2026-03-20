import React, { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { createOrder, validateCoupon, fetchOrder } from '../../api/woocommerce';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight, CheckCircle2, AlertCircle, Tag, X, CreditCard, Lock } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import StripePaymentForm from '../../components/StripePaymentForm';
import '../../styles/shop/Checkout.css';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const InputField = ({ label, name, type = 'text', value, onChange, required }) => (
    <div className="form-field">
        <label>{label}</label>
        <input required={required} type={type} name={name} value={value} onChange={onChange} />
    </div>
);

const CANADA_PROVINCES = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'YT', name: 'Yukon' }
];

// ═══════════════════════════════════════════════════════════════
// Main Checkout — orchestrates Billing → Payment → Success
// ═══════════════════════════════════════════════════════════════
export default function Checkout() {
    const { cart, getCartTotal, clearCart } = useCart();
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const [step, setStep] = useState('billing');
    const [error, setError] = useState(null);
    const [completedOrder, setCompletedOrder] = useState(null);
    const [pendingOrder, setPendingOrder] = useState(null);
    const [isCreatingOrder, setIsCreatingOrder] = useState(false);
    const [isInitializingPayment, setIsInitializingPayment] = useState(false);

    const [couponCode, setCouponCode] = useState('');
    const [coupon, setCoupon] = useState(null);
    const [couponError, setCouponError] = useState('');
    const [couponLoading, setCouponLoading] = useState(false);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        city: '',
        state: '',
        postcode: '',
        country: 'CA'
    });

    // ─── Authentication & Data Loading ───────────────────────────
    useEffect(() => {
        // Redirect if not authenticated
        if (!user) {
            navigate('/shop/auth', { 
                state: { 
                    from: '/shop/checkout',
                    message: 'Please login to continue with checkout' 
                },
                replace: true
            });
            return;
        }

        // Populate form with user data
        setFormData({
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            email: user.billing?.email || user.email || '',
            phone: user.billing?.phone || '',
            address1: user.billing?.address_1 || '',
            city: user.billing?.city || '',
            state: user.billing?.state || '',
            postcode: user.billing?.postcode || '',
            country: user.billing?.country || 'CA'
        });

        // Load pending order from URL if exists
        const queryParams = new URLSearchParams(location.search);
        const orderId = queryParams.get('order');
        if (orderId && !pendingOrder) {
            const loadPendingOrder = async () => {
                setIsInitializingPayment(true);
                try {
                    const orderData = await fetchOrder(orderId);
                    
                    if (!orderData) throw new Error("Order not found");
                    if (orderData.status !== 'pending') {
                        throw new Error(`This order is not pending payment. Status: ${orderData.status}`);
                    }
                    
                    setFormData({
                        firstName: orderData.billing?.first_name || '',
                        lastName: orderData.billing?.last_name || '',
                        email: orderData.billing?.email || '',
                        phone: orderData.billing?.phone || '',
                        address1: orderData.billing?.address_1 || '',
                        city: orderData.billing?.city || '',
                        state: orderData.billing?.state || '',
                        postcode: orderData.billing?.postcode || '',
                        country: orderData.billing?.country || 'CA'
                    });
                    
                    setPendingOrder(orderData);
                    setStep('payment');
                } catch (err) {
                    console.error('Error loading pending order:', err);
                    setError(err.message || 'Failed to load pending order.');
                    setStep('billing');
                } finally {
                    setIsInitializingPayment(false);
                }
            };
            loadPendingOrder();
        }
    }, [user, navigate, location.search, pendingOrder]);

    // Show loading while redirecting
    if (!user) {
        return (
            <div className="checkout-page">
                <div className="checkout-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <div className="spinner" style={{ margin: '0 auto 1rem' }} />
                    <h2 style={{ fontFamily: 'var(--ff)', fontSize: '2rem', color: 'var(--dark-gray)' }}>
                        Redirecting to login...
                    </h2>
                </div>
            </div>
        );
    }

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const getCurrentTotal = () => {
        if (pendingOrder && pendingOrder.line_items) {
            return pendingOrder.line_items.reduce((sum, item) => {
                const itemSubtotal = parseFloat(item.subtotal || item.price * item.quantity || 0);
                return sum + itemSubtotal;
            }, 0);
        }
        return getCartTotal();
    };

    const getDiscount = () => {
        if (!coupon) return 0;
        const total = getCurrentTotal();
        if (coupon.discount_type === 'percent') return (total * parseFloat(coupon.amount)) / 100;
        return parseFloat(coupon.amount) || 0;
    };

    const getFinalTotal = () => Math.max(0, getCurrentTotal() - getDiscount());

    const handleCoupon = async () => {
        if (!couponCode.trim()) return;
        setCouponLoading(true);
        setCouponError('');
        try {
            const result = await validateCoupon(couponCode.trim());
            setCoupon(result);
        } catch (err) {
            setCouponError(err.message);
        } finally {
            setCouponLoading(false);
        }
    };

    const handleBillingSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsCreatingOrder(true);

        try {
            const orderData = buildOrderData();
            const wcOrder = await createOrder({
                ...orderData,
                status: 'pending',
                payment_method: 'stripe',
                payment_method_title: 'Credit Card (Stripe)',
                set_paid: false,
            });

            if (!wcOrder || !wcOrder.id) {
                throw new Error('Failed to create order in WooCommerce.');
            }

            setPendingOrder(wcOrder);
            setStep('payment');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } catch (err) {
            setError(err.message || 'Failed to initialize payment.');
        } finally {
            setIsCreatingOrder(false);
        }
    };

    const buildOrderData = () => {
        // User is required for checkout (enforced by auth check)
        const orderData = {
            billing: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                address_1: formData.address1,
                city: formData.city,
                state: formData.state,
                postcode: formData.postcode,
                country: formData.country,
                email: formData.email,
                phone: formData.phone,
            },
            shipping: {
                first_name: formData.firstName,
                last_name: formData.lastName,
                address_1: formData.address1,
                city: formData.city,
                state: formData.state,
                postcode: formData.postcode,
                country: formData.country,
            },
            line_items: cart.map(item => ({ product_id: item.id, quantity: item.quantity })),
        };

        // Add WooCommerce customer ID if available
        if (user?.woocommerce_customer_id) {
            orderData.customer_id = user.woocommerce_customer_id;
        }

        // Add coupon if applied
        if (coupon) {
            orderData.coupon_lines = [{ code: couponCode }];
        }

        return orderData;
    };

    const handlePaymentSuccess = (wcOrder) => {
        setCompletedOrder(wcOrder);
        setStep('success');
        clearCart();
    };

    const getPaymentReference = () => {
        if (!completedOrder?.meta_data) return null;
        const refMeta = completedOrder.meta_data.find(m => m.key === 'Stripe Payment ID');
        return refMeta?.value || null;
    };

    // ══════════════════════════════════════════════════════════
    // RENDER: Success State
    // ══════════════════════════════════════════════════════════
    if (step === 'success') {
        return (
            <div className="checkout-page">
                <div className="checkout-container">
                    <div className="checkout-success">
                        <div className="success-icon">
                            <CheckCircle2 size={42} />
                        </div>
                        <h2>Payment Confirmed!</h2>
                        <p>Thank you! Your order has been placed successfully.</p>
                        {completedOrder?.id && (
                            <div className="order-number">Order #{completedOrder.id}</div>
                        )}
                        {getPaymentReference() && (
                            <p style={{ color: 'var(--muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
                                Payment Reference: {getPaymentReference()}
                            </p>
                        )}
                        <p style={{ color: 'var(--text-gray)', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
                            A confirmation email has been sent to <strong>{formData.email}</strong>. Your order is now being processed.
                        </p>
                        <div className="success-actions">
                            <Link to="/" className="continue-shopping-success">Continue Shopping</Link>
                            {completedOrder?.id && (
                                <Link to={`/order/${completedOrder.id}`} className="view-order-btn">View Order Details</Link>
                            )}
                            {user && (
                                <Link to="/account" className="continue-shopping-success">All Orders</Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════
    // RENDER: Loading existing order
    // ══════════════════════════════════════════════════════════
    if (isInitializingPayment) {
        return (
            <div className="checkout-page">
                <div className="checkout-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <div className="spinner" style={{ margin: '0 auto 1rem' }} />
                    <h2 style={{ fontFamily: 'var(--ff)', fontSize: '2rem', color: 'var(--dark-gray)' }}>
                        Loading Payment Details...
                    </h2>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════
    // RENDER: Empty Cart
    // ══════════════════════════════════════════════════════════
    if (cart.length === 0 && step !== 'success' && !pendingOrder) {
        return (
            <div className="checkout-page">
                <div className="checkout-container" style={{ textAlign: 'center', padding: '4rem 0' }}>
                    <h2 style={{ fontFamily: 'var(--ff)', fontSize: '2.5rem', color: 'var(--dark-gray)', marginBottom: '1rem' }}>
                        Your cart is empty
                    </h2>
                    <Link to="/" style={{ color: 'var(--primary-green)', fontWeight: 'bold', textDecoration: 'underline' }}>
                        Return to Shop
                    </Link>
                </div>
            </div>
        );
    }

    // ══════════════════════════════════════════════════════════
    // RENDER: Checkout (billing + payment steps)
    // ══════════════════════════════════════════════════════════
    return (
        <div className="checkout-page">
            <div className="checkout-container">
                {!pendingOrder ? (
                    <Link to="/cart" className="back-link">
                        <ArrowLeft size={14} /> Return to Cart
                    </Link>
                ) : (
                    <Link to="/account" className="back-link">
                        <ArrowLeft size={14} /> Back to My Orders
                    </Link>
                )}

                <div className="checkout-steps">
                    <div className={`step-item ${step === 'billing' ? 'active' : 'completed'}`}>
                        <div className="step-number">1</div>
                        <span className="step-label">Billing</span>
                    </div>
                    <div className="step-separator" />
                    <div className={`step-item ${step === 'payment' ? 'active' : ''}`}>
                        <div className="step-number">2</div>
                        <span className="step-label">Payment</span>
                    </div>
                </div>

                <div className="checkout-layout">
                    {/* LEFT COLUMN: Billing / Payment Form */}
                    <div>
                        {error && (
                            <div className="error-message">
                                <AlertCircle size={20} />
                                <div>
                                    <p style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Could not process order</p>
                                    <p>{error}</p>
                                </div>
                            </div>
                        )}

                        {/* STEP 1: Billing Details */}
                        {step === 'billing' && (
                            <div className="form-section">
                                <div className="step-header">
                                    <div className="step-number active">1</div>
                                    <h2>Billing Details</h2>
                                </div>

                                <form onSubmit={handleBillingSubmit} className="checkout-form">
                                    <div className="form-grid">
                                        <InputField label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} required />
                                        <InputField label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} required />
                                    </div>
                                    <div className="form-grid">
                                        <InputField label="Email Address" name="email" type="email" value={formData.email} onChange={handleChange} required />
                                        <InputField label="Phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
                                    </div>
                                    <div className="form-grid full">
                                        <InputField label="Street Address" name="address1" value={formData.address1} onChange={handleChange} required />
                                    </div>
                                    <div className="form-grid">
                                        <InputField label="City" name="city" value={formData.city} onChange={handleChange} required />
                                        <div className="form-field">
                                            <label>State / Province</label>
                                            <select
                                                required
                                                name="state"
                                                value={formData.state}
                                                onChange={handleChange}
                                            >
                                                <option value="">Select Province</option>
                                                {CANADA_PROVINCES.map(p => (
                                                    <option key={p.code} value={p.code}>{p.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-grid">
                                        <InputField label="Postcode" name="postcode" value={formData.postcode} onChange={handleChange} required />
                                        <div className="form-field">
                                            <label>Country</label>
                                            <select disabled name="country" value="CA">
                                                <option value="CA">Canada</option>
                                            </select>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isCreatingOrder}
                                        className="continue-btn"
                                    >
                                        {isCreatingOrder ? (
                                            <>
                                                <div className="spinner" />
                                                Creating Order...
                                            </>
                                        ) : (
                                            <>
                                                <CreditCard size={18} />
                                                Continue to Payment
                                                <ArrowRight size={16} />
                                            </>
                                        )}
                                    </button>
                                    <div className="security-info">
                                        <Lock size={14} />
                                        <span>Secure checkout · All data encrypted</span>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* STEP 2: Stripe Payment */}
                        {step === 'payment' && pendingOrder && (
                            <Elements stripe={stripePromise}>
                                <StripePaymentForm
                                    orderData={buildOrderData()}
                                    pendingOrder={pendingOrder}
                                    finalTotal={getFinalTotal().toFixed(2)}
                                    coupon={coupon}
                                    couponCode={couponCode}
                                    onSuccess={handlePaymentSuccess}
                                    onError={(msg) => setError(msg)}
                                    onBack={() => { setStep('billing'); setError(null); }}
                                />
                            </Elements>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Order Summary */}
                    <div>
                        <div className="order-summary">
                            <h2>Your Order</h2>

                            <div className="order-items">
                                {(pendingOrder ? pendingOrder.line_items : cart).map((item) => (
                                    <div key={item.id} className="order-item">
                                        <img 
                                            src={item.image?.src || item.images?.[0]?.src || '/placeholder.png'} 
                                            alt={item.name} 
                                            className="order-item-image"
                                        />
                                        <div className="order-item-details">
                                            <div className="order-item-name">{item.name}</div>
                                            <div className="order-item-meta">Qty: {item.quantity}</div>
                                        </div>
                                        <div className="order-item-price">
                                            ${(item.total ? parseFloat(item.total) : (item.price * item.quantity)).toFixed(2)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="coupon-section">
                                {coupon ? (
                                    <div className="coupon-applied">
                                        <span className="coupon-code">
                                            <Tag size={14} /> {coupon.code} — {coupon.discount_type === 'percent' ? `${coupon.amount}% Off` : `$${coupon.amount} Off`}
                                        </span>
                                        <button onClick={() => { setCoupon(null); setCouponCode(''); }} className="remove-coupon-btn">
                                            <X size={16} />
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <div className="coupon-form">
                                            <input
                                                type="text"
                                                value={couponCode}
                                                onChange={(e) => setCouponCode(e.target.value)}
                                                placeholder="Enter coupon code"
                                                className="coupon-input"
                                            />
                                            <button type="button" onClick={handleCoupon} disabled={couponLoading} className="apply-coupon-btn">
                                                {couponLoading ? '...' : 'Apply'}
                                            </button>
                                        </div>
                                        {couponError && <p style={{ color: '#e53935', fontSize: '0.85rem', marginTop: '0.5rem' }}>{couponError}</p>}
                                    </>
                                )}
                            </div>

                            <div className="order-totals">
                                <div className="total-row">
                                    <span>Subtotal</span>
                                    <span>${getCurrentTotal().toFixed(2)}</span>
                                </div>
                                {coupon && (
                                    <div className="total-row" style={{ color: 'var(--primary-green)' }}>
                                        <span>Discount ({coupon.code})</span>
                                        <span>-${getDiscount().toFixed(2)}</span>
                                    </div>
                                )}
                                <div className="total-row">
                                    <span>Shipping</span>
                                    <span style={{ color: 'var(--primary-green)', fontWeight: 'bold' }}>Free</span>
                                </div>
                                <div className="total-row grand-total">
                                    <span>Total</span>
                                    <span className="total-value">${getFinalTotal().toFixed(2)}</span>
                                </div>
                            </div>
                        </div>

                        <div className="payment-method-badge">
                            <div className="payment-method-icon">
                                <CreditCard size={20} />
                            </div>
                            <div>
                                <p style={{ fontWeight: 'bold', fontSize: '0.95rem', color: 'var(--dark-gray)', marginBottom: '0.25rem' }}>
                                    Paying with Stripe
                                </p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-gray)' }}>
                                    Visa, Mastercard, Amex, Discover
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
