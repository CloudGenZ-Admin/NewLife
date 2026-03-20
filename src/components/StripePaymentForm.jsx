import React, { useState } from 'react';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { ArrowLeft, AlertCircle, Lock, ShieldCheck } from 'lucide-react';
import { updateOrder } from '../api/woocommerce';

// Stripe Element Styling
const ELEMENT_STYLE = {
    style: {
        base: {
            fontSize: '15px',
            fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif',
            color: '#1e2520',
            '::placeholder': { color: '#9ca3af' },
            fontWeight: '500',
            lineHeight: '24px',
        },
        invalid: {
            color: '#dc2626',
            iconColor: '#dc2626',
        },
    },
};

const CARD_NUMBER_OPTIONS = { ...ELEMENT_STYLE, showIcon: true, iconStyle: 'solid' };
const CARD_EXPIRY_OPTIONS = { ...ELEMENT_STYLE };
const CARD_CVC_OPTIONS = { ...ELEMENT_STYLE };

export default function StripePaymentForm({ orderData, pendingOrder, finalTotal, coupon, couponCode, onSuccess, onError, onBack }) {
    const stripe = useStripe();
    const elements = useElements();
    const [paying, setPaying] = useState(false);
    const [cardError, setCardError] = useState('');
    const [fieldStatus, setFieldStatus] = useState({ number: false, expiry: false, cvc: false });
    const cardComplete = fieldStatus.number && fieldStatus.expiry && fieldStatus.cvc;

    const handleFieldChange = (field) => (e) => {
        setFieldStatus(prev => ({ ...prev, [field]: e.complete }));
        if (e.error) setCardError(e.error.message);
        else setCardError('');
    };

    const handlePay = async () => {
        if (!stripe || !elements || !pendingOrder) return;
        setPaying(true);
        setCardError('');

        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
            const amountInCents = Math.round(parseFloat(finalTotal) * 100);
            
            const paymentIntentResponse = await fetch(`${apiUrl}/stripe/create-payment-intent`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: amountInCents,
                    currency: 'usd',
                    order_id: pendingOrder.id,
                    customer_email: orderData.billing.email,
                    customer_name: `${orderData.billing.first_name} ${orderData.billing.last_name}`,
                }),
            });

            if (!paymentIntentResponse.ok) {
                const errorData = await paymentIntentResponse.json();
                throw new Error(errorData.error || 'Failed to create payment intent');
            }

            const { clientSecret } = await paymentIntentResponse.json();

            const cardNumberElement = elements.getElement(CardNumberElement);
            const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: cardNumberElement,
                    billing_details: {
                        name: `${orderData.billing.first_name} ${orderData.billing.last_name}`,
                        email: orderData.billing.email,
                        phone: orderData.billing.phone,
                        address: {
                            line1: orderData.billing.address_1,
                            city: orderData.billing.city,
                            state: orderData.billing.state,
                            postal_code: orderData.billing.postcode,
                            country: orderData.billing.country,
                        },
                    },
                },
            });

            if (confirmError) {
                await updateOrder(pendingOrder.id, {
                    status: 'failed',
                    meta_data: [{ key: '_stripe_error', value: confirmError.message }],
                }).catch(() => {});
                throw new Error(confirmError.message);
            }

            if (paymentIntent.status === 'succeeded') {
                const orderReference = `ORD-${pendingOrder.id}-${Date.now()}`;
                const discountAmount = coupon ? (coupon.discount_type === 'percent' ? 
                    (parseFloat(pendingOrder.total) * parseFloat(coupon.amount)) / 100 : 
                    parseFloat(coupon.amount)) : 0;
                
                // Retrieve card details from backend
                let cardBrand = 'UNKNOWN';
                let cardLast4 = '';
                
                try {
                    const cardDetailsResponse = await fetch(`${apiUrl}/stripe/get-payment-details`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ payment_intent_id: paymentIntent.id }),
                    });
                    console.log("zoro",cardDetailsResponse);
                    
                    if (cardDetailsResponse.ok) {
                        const cardDetails = await cardDetailsResponse.json();
                        cardBrand = cardDetails.cardBrand || 'UNKNOWN';
                        cardLast4 = cardDetails.cardLast4 || '';
                        console.log('💳 Retrieved Card Details:', cardDetails);
                    }
                } catch (cardError) {
                    console.error('Failed to retrieve card details:', cardError);
                }
                
                const updateData = {
                    status: 'processing',
                    set_paid: true,
                    transaction_id: paymentIntent.id,
                    meta_data: [
                        { key: 'Stripe Payment ID', value: paymentIntent.id },
                        { key: 'Stripe Payment Status', value: paymentIntent.status },
                        { key: 'Stripe Card Brand', value: cardBrand },
                        { key: 'Stripe Card Last 4', value: cardLast4 },
                        { key: 'Stripe Customer Email', value: orderData.billing.email },
                        { key: 'Payment Reference', value: orderReference },
                        { key: 'Payment Date', value: new Date().toISOString() },
                        { key: 'Payment Amount', value: `${finalTotal}` },
                    ],
                };

                if (coupon && couponCode) {
                    updateData.coupon_lines = [{ code: couponCode }];
                    updateData.discount_total = discountAmount.toFixed(2);
                    updateData.total = (parseFloat(pendingOrder.total) - discountAmount).toFixed(2);
                }
                
                const updatedOrder = await updateOrder(pendingOrder.id, updateData);
                onSuccess(updatedOrder);
            } else {
                throw new Error(`Payment status: ${paymentIntent.status}`);
            }
        } catch (err) {
            console.error('Stripe payment error:', err);
            setCardError(err.message || 'Payment failed. Please try again.');
            onError(err.message);
        } finally {
            setPaying(false);
        }
    };

    return (
        <div className="form-section">
            <div className="step-header">
                <div className="step-number active">2</div>
                <h2>Payment Details</h2>
            </div>

            <div className="checkout-form">
                <div className="security-badge">
                    <ShieldCheck size={18} />
                    <span>Secure payment powered by Stripe</span>
                </div>

                <div className="form-field">
                    <label>Card Number</label>
                    <div className="stripe-element-wrapper">
                        <CardNumberElement options={CARD_NUMBER_OPTIONS} onChange={handleFieldChange('number')} />
                    </div>
                </div>

                <div className="form-grid">
                    <div className="form-field">
                        <label>Expiry Date</label>
                        <div className="stripe-element-wrapper">
                            <CardExpiryElement options={CARD_EXPIRY_OPTIONS} onChange={handleFieldChange('expiry')} />
                        </div>
                    </div>
                    <div className="form-field">
                        <label>CVC</label>
                        <div className="stripe-element-wrapper">
                            <CardCvcElement options={CARD_CVC_OPTIONS} onChange={handleFieldChange('cvc')} />
                        </div>
                    </div>
                </div>

                {cardError && (
                    <div className="error-message">
                        <AlertCircle size={16} />
                        <span>{cardError}</span>
                    </div>
                )}

                <div className="payment-icons">
                    <span style={{ fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--muted)' }}>Accepted:</span>
                    {['VISA', 'MC', 'AMEX', 'DISC'].map(c => <span key={c} className="payment-icon">{c}</span>)}
                </div>

                <div className="checkout-actions">
                    <button type="button" onClick={onBack} disabled={paying} className="back-btn">
                        <ArrowLeft size={14} /> Edit Billing
                    </button>
                    <button type="button" onClick={handlePay} disabled={paying || !stripe || !cardComplete} className="place-order-btn">
                        {paying ? (
                            <>
                                <div className="spinner" />
                                Processing Payment...
                            </>
                        ) : (
                            <>
                                <Lock size={16} />
                                Pay ${finalTotal}
                            </>
                        )}
                    </button>
                </div>

                <div className="security-info">
                    <Lock size={14} />
                    <span>Your payment info is encrypted and never stored on our servers.</span>
                </div>
            </div>
        </div>
    );
}
