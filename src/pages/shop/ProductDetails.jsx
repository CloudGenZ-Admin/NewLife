import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchProduct, fetchProductReviews, submitReview, fetchRelatedProducts, fetchVariations } from '../../api/woocommerce';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useAuth } from '../../context/AuthContext';
import { Minus, Plus, ShoppingCart, ArrowLeft, Star, Heart, CheckCircle2, Share2, Send } from 'lucide-react';
import '../../styles/shop/ProductDetails.css';

export default function ProductDetails() {
    const { id } = useParams();
    const { addToCart } = useCart();
    const { toggleWishlist, isWishlisted } = useWishlist();
    const { user } = useAuth();

    const [product, setProduct] = useState(null);
    const [variations, setVariations] = useState([]);
    const [reviews, setReviews] = useState([]);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [added, setAdded] = useState(false);
    const [activeImg, setActiveImg] = useState(0);
    const [activeTab, setActiveTab] = useState('description');
    const [selectedVariation, setSelectedVariation] = useState(null);

    const [reviewForm, setReviewForm] = useState({ name: user?.first_name || '', email: user?.billing?.email || '', review: '', rating: 5 });
    const [reviewLoading, setReviewLoading] = useState(false);
    const [reviewSuccess, setReviewSuccess] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true); setError(null);
            try {
                const data = await fetchProduct(id);
                if (!data?.id) throw new Error('Product not found');
                setProduct(data);
                const [rev, vars] = await Promise.all([
                    fetchProductReviews(id),
                    data.type === 'variable' ? fetchVariations(id) : Promise.resolve([]),
                ]);
                setReviews(rev || []);
                setVariations(vars || []);
                if (data.categories?.[0]?.id) {
                    const rel = await fetchRelatedProducts(data.categories[0].id, id);
                    setRelated(rel);
                }
            } catch (e) {
                setError(e.message);
            } finally {
                setLoading(false);
            }
        };
        load();
        window.scrollTo(0, 0);
    }, [id]);

    const handleAddToCart = () => {
        const targetStockStatus = selectedVariation ? (selectedVariation.stock_status || product.stock_status) : product.stock_status;
        if (targetStockStatus === 'outofstock') return;

        let targetStockQuantity = selectedVariation ? selectedVariation.stock_quantity : product.stock_quantity;
        if (selectedVariation && (selectedVariation.stock_quantity === null || selectedVariation.stock_quantity === undefined)) {
            targetStockQuantity = product.stock_quantity;
        }

        const cartProduct = selectedVariation ? { 
            ...product, 
            id: selectedVariation.id,
            parent_id: product.id,
            name: `${product.name} - ${selectedVariation.attributes.map(a => a.option).join(', ')}`,
            price: selectedVariation.price, 
            images: selectedVariation.image ? [selectedVariation.image] : product.images,
            stock_status: targetStockStatus,
            stock_quantity: targetStockQuantity
        } : product;
        addToCart(cartProduct, quantity);
        setAdded(true);
        setTimeout(() => setAdded(false), 2500);
    };

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setReviewLoading(true);
        try {
            const newReview = await submitReview({ productId: id, reviewerName: reviewForm.name, reviewerEmail: reviewForm.email, review: reviewForm.review, rating: reviewForm.rating });
            setReviews(prev => [newReview, ...prev]);
            setReviewSuccess(true);
            setReviewForm({ ...reviewForm, review: '', rating: 5 });
        } catch (e) { console.error(e); }
        finally { setReviewLoading(false); }
    };

    const displayPrice = selectedVariation ? selectedVariation.price : product?.price;

    if (loading) return (
        <div className="product-loading">
            <div className="loading-spinner-detail" />
        </div>
    );
    
    if (error || !product) return (
        <div className="product-error">
            <h3 style={{ fontFamily: 'var(--ff)', fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Product Not Found
            </h3>
            <Link to="/" className="add-to-cart-detail" style={{ width: 'auto', padding: '1rem 2rem' }}>
                <ArrowLeft size={16} /> Back to Collections
            </Link>
        </div>
    );

    const images = product.images?.length > 0 ? product.images : [{ src: "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=800&q=80" }];
    const avgRating = reviews.length ? Math.round(reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length) : 5;

    return (
        <div className="product-details-page">
            <div className="product-container">
                {/* Breadcrumb */}
                <div className="breadcrumb">
                    <Link to="/">
                        <ArrowLeft size={14} /> Collections
                    </Link>
                    {product.categories?.[0] && (
                        <>
                            <span className="breadcrumb-separator">/</span>
                            <span>{product.categories[0].name}</span>
                        </>
                    )}
                </div>

                {/* Main Product Grid */}
                <div className="product-layout">
                    {/* Gallery */}
                    <div className="product-gallery">
                        <div className="main-image-wrapper">
                            <img src={images[activeImg]?.src} alt={product.name} className="main-image" />
                            {product.on_sale && (
                                <div className="discount-badge" style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                                    Sale
                                </div>
                            )}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`wishlist-btn-detail ${isWishlisted(product.id) ? 'active' : ''}`}
                                style={{ position: 'absolute', top: '1rem', right: '1rem' }}
                            >
                                <Heart size={18} className={isWishlisted(product.id) ? 'fill-current' : ''} />
                            </button>
                        </div>
                        {images.length > 1 && (
                            <div className="thumbnail-grid">
                                {images.map((img, i) => (
                                    <button 
                                        key={i} 
                                        onClick={() => setActiveImg(i)} 
                                        className={`thumbnail ${i === activeImg ? 'active' : ''}`}
                                    >
                                        <img src={img.src} alt="" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="product-info-section">
                        <span className="product-category-badge">
                            {product.categories?.[0]?.name || 'New Arrival'}
                        </span>
                        
                        <h1 className="product-title-main">{product.name}</h1>

                        <div className="product-rating-section">
                            <div className="rating-stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star 
                                        key={i} 
                                        size={14} 
                                        className={i < avgRating ? "star-icon" : "star-icon empty"}
                                    />
                                ))}
                            </div>
                            <span className="rating-text">
                                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                            </span>
                        </div>

                        <div className="product-price-section">
                            <span className="current-price">${displayPrice || '0.00'}</span>
                            {product.regular_price && product.sale_price && (
                                <span className="original-price">${product.regular_price}</span>
                            )}
                        </div>

                        {/* Variations */}
                        {variations.length > 0 && (
                            <div style={{ marginBottom: '1.5rem' }}>
                                <p style={{ fontSize: '0.9rem', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-gray)', marginBottom: '1rem' }}>
                                    Options
                                </p>
                                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                                    {variations.map(v => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariation(v.id === selectedVariation?.id ? null : v)}
                                            style={{
                                                padding: '0.75rem 1.25rem',
                                                borderRadius: 'var(--radius-sm)',
                                                fontSize: '0.95rem',
                                                fontWeight: '600',
                                                border: `2px solid ${selectedVariation?.id === v.id ? 'var(--primary-green)' : 'var(--border-light)'}`,
                                                background: selectedVariation?.id === v.id ? 'var(--green-light)' : 'var(--white)',
                                                color: selectedVariation?.id === v.id ? 'var(--primary-green)' : 'var(--dark-gray)',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease'
                                            }}
                                        >
                                            {v.attributes?.map(a => a.option).join(' / ')}
                                            {v.price && <span style={{ marginLeft: '0.5rem', color: 'var(--text-gray)', fontSize: '0.85rem' }}>${v.price}</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Short description */}
                        {product.short_description && (
                            <div className="product-description" dangerouslySetInnerHTML={{ __html: product.short_description }} />
                        )}

                        {(() => {
                            const isOutOfStock = selectedVariation 
                                ? (selectedVariation.stock_status === 'outofstock' || product.stock_status === 'outofstock')
                                : product.stock_status === 'outofstock';
                            
                            let maxStock = null;
                            if (selectedVariation) {
                                if (selectedVariation.stock_quantity !== null && selectedVariation.stock_quantity !== undefined) maxStock = selectedVariation.stock_quantity;
                                else if (product.stock_quantity !== null && product.stock_quantity !== undefined) maxStock = product.stock_quantity;
                            } else if (product.stock_quantity !== null && product.stock_quantity !== undefined) {
                                maxStock = product.stock_quantity;
                            }

                            return (
                                <>
                                    {isOutOfStock && (
                                        <div className="stock-status out-of-stock">
                                            Currently Out of Stock
                                        </div>
                                    )}
                                    {maxStock !== null && maxStock > 0 && !isOutOfStock && (
                                        <div className="stock-status in-stock">
                                            <CheckCircle2 size={16} /> {maxStock} in stock
                                        </div>
                                    )}
                                    
                                    <div className="quantity-controls-detail">
                                        <button 
                                            disabled={isOutOfStock}
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))} 
                                            className="quantity-btn-detail"
                                        >
                                            <Minus size={15} />
                                        </button>
                                        <span className="quantity-display-detail">{quantity}</span>
                                        <button 
                                            disabled={isOutOfStock || (maxStock !== null && quantity >= maxStock)}
                                            onClick={() => setQuantity(maxStock !== null ? Math.min(maxStock, quantity + 1) : quantity + 1)} 
                                            className="quantity-btn-detail"
                                        >
                                            <Plus size={15} />
                                        </button>
                                    </div>

                                    <button
                                        disabled={isOutOfStock}
                                        onClick={handleAddToCart}
                                        className="add-to-cart-detail"
                                        style={{
                                            background: isOutOfStock ? 'var(--muted)' : added ? 'var(--green-dark)' : 'var(--primary-green)',
                                            cursor: isOutOfStock ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isOutOfStock ? (
                                            'Out of Stock'
                                        ) : added ? (
                                            <>
                                                <CheckCircle2 size={20} /> Added!
                                            </>
                                        ) : (
                                            <>
                                                <ShoppingCart size={17} /> 
                                                Add to Cart — ${(parseFloat(displayPrice || 0) * quantity).toFixed(2)}
                                            </>
                                        )}
                                    </button>
                                </>
                            );
                        })()}

                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.95rem', color: 'var(--text-gray)' }}>
                            <CheckCircle2 size={14} style={{ color: 'var(--primary-green)' }} />
                            Every purchase supports NewLife Project programs.
                        </div>

                        <div className="product-meta">
                            <button 
                                onClick={() => toggleWishlist(product)} 
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    background: 'none',
                                    border: 'none',
                                    color: isWishlisted(product.id) ? '#e53935' : 'var(--text-gray)',
                                    cursor: 'pointer',
                                    fontSize: '0.95rem',
                                    fontWeight: '600',
                                    padding: 0
                                }}
                            >
                                <Heart size={15} className={isWishlisted(product.id) ? 'fill-current' : ''} />
                                {isWishlisted(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs: Description / Reviews */}
                <div className="product-tabs">
                    <div className="tabs-header">
                        {['description', 'reviews'].map(tab => (
                            <button 
                                key={tab} 
                                onClick={() => setActiveTab(tab)} 
                                className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                            >
                                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                {tab === 'reviews' ? ` (${reviews.length})` : ''}
                            </button>
                        ))}
                    </div>

                    <div className="tab-content">
                        {activeTab === 'description' && (
                            <div className={`tab-panel ${activeTab === 'description' ? 'active' : ''}`}>
                                <div 
                                    className="product-description" 
                                    dangerouslySetInnerHTML={{ __html: product.description || '<p>No description available.</p>' }} 
                                />
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className={`tab-panel ${activeTab === 'reviews' ? 'active' : ''}`}>
                                <div className="reviews-section">
                                    {reviews.length > 0 ? (
                                        <div style={{ marginBottom: '3rem' }}>
                                            {reviews.map(r => (
                                                <div key={r.id} className="review-item">
                                                    <div className="review-header">
                                                        <div>
                                                            <p className="reviewer-name">{r.reviewer}</p>
                                                            <p className="review-date">
                                                                {new Date(r.date_created).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                        <div className="rating-stars">
                                                            {Array.from({ length: 5 }).map((_, i) => (
                                                                <Star 
                                                                    key={i} 
                                                                    size={12} 
                                                                    className={i < r.rating ? "star-icon" : "star-icon empty"}
                                                                />
                                                            ))}
                                                        </div>
                                                    </div>
                                                    <div className="review-text" dangerouslySetInnerHTML={{ __html: r.review }} />
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="no-reviews">No customer reviews yet. Be the first!</p>
                                    )}

                                    {/* Submit review form */}
                                    <div style={{ background: 'var(--light-gray)', borderRadius: 'var(--radius)', padding: '2rem' }}>
                                        <h3>{reviewSuccess ? '✅ Review submitted!' : 'Write a Review'}</h3>
                                        {!reviewSuccess && (
                                            <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginTop: '1.5rem' }}>
                                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                                                    <div className="form-group">
                                                        <label>Your Name</label>
                                                        <input 
                                                            required 
                                                            type="text" 
                                                            value={reviewForm.name} 
                                                            onChange={e => setReviewForm({ ...reviewForm, name: e.target.value })} 
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label>Email</label>
                                                        <input 
                                                            required 
                                                            type="email" 
                                                            value={reviewForm.email} 
                                                            onChange={e => setReviewForm({ ...reviewForm, email: e.target.value })} 
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Rating</label>
                                                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                                                        {[1, 2, 3, 4, 5].map(n => (
                                                            <button 
                                                                key={n} 
                                                                type="button" 
                                                                onClick={() => setReviewForm({ ...reviewForm, rating: n })} 
                                                                style={{
                                                                    fontSize: '1.5rem',
                                                                    background: 'none',
                                                                    border: 'none',
                                                                    cursor: 'pointer',
                                                                    color: n <= reviewForm.rating ? '#ffc107' : 'var(--border-light)'
                                                                }}
                                                            >
                                                                ★
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                                <div className="form-group">
                                                    <label>Your Review</label>
                                                    <textarea 
                                                        required 
                                                        rows={4} 
                                                        value={reviewForm.review} 
                                                        onChange={e => setReviewForm({ ...reviewForm, review: e.target.value })} 
                                                        placeholder="Share your experience..."
                                                        style={{ resize: 'vertical' }}
                                                    />
                                                </div>
                                                <button 
                                                    type="submit" 
                                                    disabled={reviewLoading} 
                                                    className="add-to-cart-detail"
                                                    style={{ width: 'auto', alignSelf: 'flex-start' }}
                                                >
                                                    {reviewLoading ? 'Submitting…' : (
                                                        <>
                                                            <Send size={14} /> Submit Review
                                                        </>
                                                    )}
                                                </button>
                                            </form>
                                        )}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Related Products */}
                {related.length > 0 && (
                    <div className="related-products">
                        <h2>You May Also Like</h2>
                        <div className="related-grid">
                            {related.map(p => (
                                <Link 
                                    key={p.id} 
                                    to={`/product/${p.id}`} 
                                    onClick={() => window.scrollTo(0, 0)} 
                                    className="product-card"
                                >
                                    <div className="product-image">
                                        <img src={p.images?.[0]?.src} alt={p.name} />
                                    </div>
                                    <div className="product-card-info">
                                        <h4 className="product-card-name">{p.name}</h4>
                                        <p className="product-card-price">${p.price}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
