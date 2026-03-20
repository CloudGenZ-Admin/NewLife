import React, { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { fetchCustomerOrders, updateCustomer, WOOCOMMERCE_URL } from '../../api/woocommerce';
import { Link, useNavigate } from 'react-router-dom';
import { Package, User, MapPin, LogOut, ChevronRight, CheckCircle2, Clock, Truck, AlertCircle } from 'lucide-react';
import '../../styles/shop/Account.css';

const STATUS_MAP = {
    pending: { label: 'Pending Payment', className: 'order-status pending', Icon: Clock },
    processing: { label: 'Processing', className: 'order-status processing', Icon: Package },
    'on-hold': { label: 'On Hold', className: 'order-status pending', Icon: AlertCircle },
    completed: { label: 'Completed', className: 'order-status completed', Icon: CheckCircle2 },
    cancelled: { label: 'Cancelled', className: 'order-status cancelled', Icon: AlertCircle },
    shipped: { label: 'Shipped', className: 'order-status completed', Icon: Truck },
};

const CANADA_PROVINCES = [
    { code: 'AB', name: 'Alberta' },
    { code: 'BC', name: 'British Columbia' },
    { code: 'MB', name: 'Manitoba' },
    { code: 'NB', name: 'New Brunswick' },
    { code: 'NL', name: 'Newfoundland and Labrador' },
    { code: 'NS', name: 'Nova Scotia' },
    { code: 'ON', name: 'Ontario' },
    { code: 'PE', name: 'Prince Edward Island' },
    { code: 'QC', name: 'Quebec' },
    { code: 'SK', name: 'Saskatchewan' },
    { code: 'NT', name: 'Northwest Territories' },
    { code: 'NU', name: 'Nunavut' },
    { code: 'YT', name: 'Yukon' }
];

const tabs = [
    { id: 'orders', label: 'My Orders', Icon: Package },
    { id: 'profile', label: 'My Profile', Icon: User },
    { id: 'address', label: 'Addresses', Icon: MapPin },
];

export default function Account() {
    const { user, login, logout } = useAuth();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('orders');
    const [orders, setOrders] = useState([]);
    const [ordersLoading, setOrdersLoading] = useState(true);
    const [saveLoading, setSaveLoading] = useState(false);
    const [saveSuccess, setSaveSuccess] = useState(false);

    const [profileData, setProfileData] = useState({
        firstName: user?.first_name || '',
        lastName: user?.last_name || '',
        email: user?.billing?.email || user?.email || '',
        phone: user?.billing?.phone || ''
    });
    const [addressData, setAddressData] = useState({
        address1: user?.billing?.address_1 || '',
        city: user?.billing?.city || '',
        state: user?.billing?.state || '',
        postcode: user?.billing?.postcode || '',
        country: user?.billing?.country || 'CA'
    });

    useEffect(() => {
        if (!user) { navigate('/shop/auth'); return; }
        
        // Initialize form data from user object
        setProfileData({
            firstName: user.first_name || '',
            lastName: user.last_name || '',
            email: user.billing?.email || user.email || '',
            phone: user.billing?.phone || ''
        });
        
        setAddressData({
            address1: user.billing?.address_1 || '',
            city: user.billing?.city || '',
            state: user.billing?.state || '',
            postcode: user.billing?.postcode || '',
            country: user.billing?.country || 'CA'
        });
        
        // Fetch orders
        const load = async () => {
            if (!user.woocommerce_customer_id) {
                setOrdersLoading(false);
                return;
            }
            setOrdersLoading(true);
            const data = await fetchCustomerOrders(user.woocommerce_customer_id);
            setOrders(data);
            setOrdersLoading(false);
        };
        load();
    }, [user, navigate]);

    const handleProfileSave = async () => {
        setSaveLoading(true);
        try {
            // Update WooCommerce customer if ID exists
            if (user.woocommerce_customer_id) {
                await updateCustomer(user.woocommerce_customer_id, {
                    first_name: profileData.firstName,
                    last_name: profileData.lastName,
                    billing: { ...user.billing, phone: profileData.phone, email: profileData.email }
                });
                
                // Fetch fresh customer data with cache-busting parameter
                const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY;
                const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;
                const cacheBuster = `_=${Date.now()}`;
                
                const response = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/customers/${user.woocommerce_customer_id}?${Buster}`, {
                    headers: {
                        'Authorization': `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`
                    }
                });
                const freshData = await response.json();
                
                // Update localStorage with fresh WooCommerce data
                const updatedUser = {
                    ...user,
                    first_name: freshData.first_name,
                    last_name: freshData.last_name,
                    billing: freshData.billing,
                    shipping: freshData.shipping
                };
                login(updatedUser);
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 2500);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSaveLoading(false);
        }
    };

    const handleAddressSave = async () => {
        setSaveLoading(true);
        try {
            // Update WooCommerce customer if ID exists
            if (user.woocommerce_customer_id) {
                await updateCustomer(user.woocommerce_customer_id, {
                    billing: { ...user.billing, address_1: addressData.address1, city: addressData.city, state: addressData.state, postcode: addressData.postcode, country: addressData.country },
                    shipping: { ...user.shipping, address_1: addressData.address1, city: addressData.city, state: addressData.state, postcode: addressData.postcode, country: addressData.country }
                });
                
                // Fetch fresh customer data with cache-busting parameter
                const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY;
                const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;
                const cacheBuster = `_=${Date.now()}`;
                
                const response = await fetch(`${WOOCOMMERCE_URL}/wp-json/wc/v3/customers/${user.woocommerce_customer_id}?${cacheBuster}`, {
                    headers: {
                        'Authorization': `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`
                    }
                });
                const freshData = await response.json();
                
                // Update localStorage with fresh WooCommerce data
                const updatedUser = {
                    ...user,
                    billing: freshData.billing,
                    shipping: freshData.shipping
                };
                login(updatedUser);
                setSaveSuccess(true);
                setTimeout(() => setSaveSuccess(false), 2500);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSaveLoading(false);
        }
    };

    if (!user) return null;

    return (
        <div className="account-page">
            <div className="account-container">
                <div className="account-header">
                    <p className="eyebrow">My Account</p>
                    <h1>{user.first_name ? `Welcome back, ${user.first_name}.` : 'My Account'}</h1>
                </div>

                <div className="account-layout">
                    {/* Sidebar Tabs */}
                    <aside className="account-sidebar">
                        <nav className="account-nav">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`nav-item ${activeTab === tab.id ? 'active' : ''}`}
                                >
                                    <tab.Icon size={16} className="nav-icon" /> {tab.label}
                                </button>
                            ))}
                        </nav>
                    </aside>

                    {/* Content */}
                    <div className="account-content">
                        {/* ORDERS TAB */}
                        {activeTab === 'orders' && (
                            <div className={`content-section ${activeTab === 'orders' ? 'active' : ''}`}>
                                <div className="section-header">
                                    <h2>Order History</h2>
                                    <p>Track and review all your past purchases.</p>
                                </div>
                                {ordersLoading ? (
                                    <div style={{ display: 'flex', justifyContent: 'center', padding: '4rem 0' }}>
                                        <div className="spinner" />
                                    </div>
                                ) : orders.length === 0 ? (
                                    <div className="no-orders">
                                        <Package className="no-orders-icon" size={48} />
                                        <p>No orders yet.</p>
                                        <Link to="/" className="shop-now-btn">Start Shopping →</Link>
                                    </div>
                                ) : (
                                    <div className="orders-list">
                                        {orders.map(order => {
                                            const status = STATUS_MAP[order.status] || { label: order.status, className: 'order-status', Icon: Package };
                                            return (
                                                <div key={order.id} className="order-card">
                                                    <div className="order-header">
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
                                                            <span className="order-number">Order #{order.id}</span>
                                                            <span className={status.className}>
                                                                <status.Icon size={11} /> {status.label}
                                                            </span>
                                                        </div>
                                                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                                            <div style={{ textAlign: 'right' }}>
                                                                <p className="total-amount">${order.total}</p>
                                                                <p className="order-date">{new Date(order.date_created).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                                            </div>
                                                            {order.status === 'pending' && (
                                                                <button
                                                                    onClick={() => navigate(`/checkout?order=${order.id}`)}
                                                                    className="view-order-btn"
                                                                    style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
                                                                >
                                                                    Pay Now
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    <div className="order-actions">
                                                        <Link to={`/order/${order.id}`} className="view-order-btn">
                                                            View Details <ChevronRight size={14} />
                                                        </Link>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* PROFILE TAB */}
                        {activeTab === 'profile' && (
                            <div className={`content-section ${activeTab === 'profile' ? 'active' : ''}`}>
                                <div className="section-header">
                                    <h2>Profile Details</h2>
                                </div>
                                {saveSuccess && (
                                    <div className="success-message">
                                        <CheckCircle2 size={16} />
                                        <span>Profile updated successfully!</span>
                                    </div>
                                )}
                                <form className="profile-form">
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input
                                                type="text"
                                                value={profileData.firstName}
                                                onChange={e => setProfileData({ ...profileData, firstName: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input
                                                type="text"
                                                value={profileData.lastName}
                                                onChange={e => setProfileData({ ...profileData, lastName: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input
                                                type="email"
                                                value={profileData.email}
                                                onChange={e => setProfileData({ ...profileData, email: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input
                                                type="tel"
                                                value={profileData.phone}
                                                onChange={e => setProfileData({ ...profileData, phone: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={handleProfileSave} 
                                        disabled={saveLoading} 
                                        className="save-profile-btn"
                                    >
                                        {saveLoading ? 'Saving…' : 'Save Changes'}
                                    </button>
                                </form>
                            </div>
                        )}

                        {/* ADDRESS TAB */}
                        {activeTab === 'address' && (
                            <div className={`content-section ${activeTab === 'address' ? 'active' : ''}`}>
                                <div className="section-header">
                                    <h2>Default Address</h2>
                                </div>
                                {saveSuccess && (
                                    <div className="success-message">
                                        <CheckCircle2 size={16} />
                                        <span>Address updated successfully!</span>
                                    </div>
                                )}
                                <form className="profile-form">
                                    <div className="form-group">
                                        <label>Street Address</label>
                                        <input
                                            type="text"
                                            value={addressData.address1}
                                            onChange={e => setAddressData({ ...addressData, address1: e.target.value })}
                                        />
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                value={addressData.city}
                                                onChange={e => setAddressData({ ...addressData, city: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>State / Province</label>
                                            <select
                                                value={addressData.state}
                                                onChange={e => setAddressData({ ...addressData, state: e.target.value })}
                                            >
                                                <option value="">Select Province</option>
                                                {CANADA_PROVINCES.map(p => <option key={p.code} value={p.code}>{p.name}</option>)}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-group">
                                            <label>Postcode</label>
                                            <input
                                                type="text"
                                                value={addressData.postcode}
                                                onChange={e => setAddressData({ ...addressData, postcode: e.target.value })}
                                            />
                                        </div>
                                        <div className="form-group">
                                            <label>Country</label>
                                            <select disabled value="CA">
                                                <option value="CA">Canada</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button 
                                        type="button"
                                        onClick={handleAddressSave} 
                                        disabled={saveLoading} 
                                        className="save-profile-btn"
                                    >
                                        {saveLoading ? 'Saving…' : 'Save Address'}
                                    </button>
                                </form>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
