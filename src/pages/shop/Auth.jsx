import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { registerCustomer, loginCustomer } from '../../api/woocommerce';
import { useAuth } from '../../context/AuthContext';
import { Mail, Lock, User, AlertCircle, ArrowRight } from 'lucide-react';
import '../../styles/shop/Auth.css';

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    // Get redirect message if coming from checkout
    const redirectMessage = location.state?.message;
    const redirectFrom = location.state?.from || '/';

    const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', password: '' });
    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isLogin) {
                if (!formData.email || !formData.password) throw new Error("Please enter your email and password");
                const userProfile = await loginCustomer(formData.email, formData.password);
                login(userProfile);
                navigate(redirectFrom);
            } else {
                if (!formData.email || !formData.password || !formData.firstName) throw new Error("Please fill in all required fields.");
                const newProfile = await registerCustomer({
                    email: formData.email,
                    password: formData.password,
                    first_name: formData.firstName,
                    last_name: formData.lastName,
                    username: formData.email.split('@')[0],
                    billing: { first_name: formData.firstName, last_name: formData.lastName, email: formData.email }
                });
                login(newProfile);
                navigate(redirectFrom);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-container">
                <div className="auth-header">
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                        <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                            <path d="M14 4C14 4 8 8 8 16C8 20 10.5 23 14 24C17.5 23 20 20 20 16C20 8 14 4 14 4Z" fill="#2E7D32" />
                            <path d="M14 14L14 26" stroke="#1B5E20" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>
                        <span style={{ fontFamily: 'var(--ff)', fontSize: '1.25rem', fontWeight: 'bold', color: 'var(--dark-gray)' }}>
                            NewLife Project<span style={{ color: 'var(--muted)', fontWeight: 'normal', fontSize: '0.95rem' }}>.store</span>
                        </span>
                    </div>
                    <h1>{isLogin ? "Welcome Back" : "Create an Account"}</h1>
                    <p>{isLogin ? "Sign in to access your orders and history" : "Join our community and shop with purpose"}</p>
                </div>

                <div className="auth-card">
                    {redirectMessage && (
                        <div className="auth-message" style={{ background: '#e3f2fd', border: '1px solid #2196F3', color: '#1565C0', marginBottom: '1rem' }}>
                            <AlertCircle size={16} />
                            <span>{redirectMessage}</span>
                        </div>
                    )}
                    
                    {error && (
                        <div className="auth-message error">
                            <AlertCircle size={16} />
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="auth-form">
                        {!isLogin && (
                            <div className="auth-name-fields">
                                <div className="auth-field">
                                    <User size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', zIndex: 1 }} />
                                    <input 
                                        required 
                                        type="text" 
                                        name="firstName" 
                                        placeholder="First Name" 
                                        value={formData.firstName} 
                                        onChange={handleChange}
                                        style={{ paddingLeft: '2.5rem' }}
                                    />
                                </div>
                                <div className="auth-field">
                                    <User size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', zIndex: 1 }} />
                                    <input 
                                        type="text" 
                                        name="lastName" 
                                        placeholder="Last Name" 
                                        value={formData.lastName} 
                                        onChange={handleChange}
                                        style={{ paddingLeft: '2.5rem' }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="auth-field">
                            <Mail size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', zIndex: 1 }} />
                            <input 
                                required 
                                type="email" 
                                name="email" 
                                placeholder="Email Address" 
                                value={formData.email} 
                                onChange={handleChange}
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>

                        <div className="auth-field">
                            <Lock size={15} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)', zIndex: 1 }} />
                            <input 
                                required 
                                type="password" 
                                name="password" 
                                placeholder="Password" 
                                value={formData.password} 
                                onChange={handleChange}
                                style={{ paddingLeft: '2.5rem' }}
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className={`auth-submit ${loading ? 'loading' : ''}`}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        >
                            {loading ? (
                                <div className="spinner" />
                            ) : (
                                <>
                                    {isLogin ? "Sign In" : "Create Account"}
                                    <ArrowRight size={16} />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="auth-footer">
                        <p>
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <a 
                                href="#" 
                                onClick={(e) => { 
                                    e.preventDefault(); 
                                    setIsLogin(!isLogin); 
                                    setError(''); 
                                }}
                            >
                                {isLogin ? "Create one" : "Sign In"}
                            </a>
                        </p>
                    </div>
                </div>

                <p style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-gray)', marginTop: '1.5rem' }}>
                    By continuing you agree to our terms. Your data is protected securely.
                </p>
            </div>
        </div>
    );
}
