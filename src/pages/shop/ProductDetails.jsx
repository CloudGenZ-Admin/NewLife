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
        <div className="product-details-page">
            <div className="product-loading">
                <div className="spinner"></div>
            </div>
        </div>
    );

    if (error || !product) return (
        <div className="product-details-page">
            <div className="product-error">
                <h3>Product Not Found</h3>
                <Link to="/shop" className="btn-primary">
                    <ArrowLeft size={16} /> Back to Collections
                </Link>
            </div>
        </div>
    );

    const images = product.images?.length > 0 ? product.images : [{ src: "https://images.unsplash.com/photo-1560393464-5c69a73c5770?auto=format&fit=crop&w=800&q=80" }];
    const avgRating = reviews.length ? Math.round(reviews.reduce((s, r) => s + (r.rating || 0), 0) / reviews.length) : 5;

    return (
        <div className="product-details-page">
            <div className="product-container">
                <div className="breadcrumb">
                    <Link to="/shop" className="breadcrumb-link">
                        <ArrowLeft size={14} /> Collections
                    </Link>
                    {product.categories?.[0] && (
                        <>
                            <span className="breadcrumb-separator">/</span>
                            <span className="breadcrumb-text">{product.categories[0].name}</span>
                        </>
                    )}
                </div>

                <div className="product-grid">
                    <div className="product-gallery">
                        <div className="main-image-container">
                            <img src={images[activeImg]?.src} alt={product.name} className="main-image" />
                            {product.on_sale && (
                                <div className="sale-badge">Sale</div>
                            )}
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`wishlist-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                            >
                                <Heart size={18} className={isWishlisted(product.id) ? 'fill-heart' : ''} />
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

                    <div className="product-info">
                        <span className="product-category">{product.categories?.[0]?.name || 'New Arrival'}</span>
                        <h1 className="product-title">{product.name}</h1>

                        <div className="product-rating">
                            <div className="rating-stars">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={i < avgRating ? "star filled" : "star"}
                                    />
                                ))}
                            </div>
                            <span className="rating-count">
                                {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
                            </span>
                        </div>

                        <div className="product-price">
                            <span className="current-price">${displayPrice || '0.00'}</span>
                            {product.regular_price && product.sale_price && (
                                <span className="original-price">${product.regular_price}</span>
                            )}
                        </div>

                        {variations.length > 0 && (
                            <div className="variations-section">
                                <p className="variations-label">Options</p>
                                <div className="variations-grid">
                                    {variations.map(v => (
                                        <button
                                            key={v.id}
                                            onClick={() => setSelectedVariation(v.id === selectedVariation?.id ? null : v)}
                                            className={`variation-btn ${selectedVariation?.id === v.id ? 'active' : ''}`}
                                        >
                                            {v.attributes?.map(a => a.option).join(' / ')}
                                            {v.price && <span className="variation-price">${v.price}</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.short_description && (
                            <div className="product-short-desc" dangerouslySetInnerHTML={{ __html: product.short_description }} />
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
                                            <span className="stock-count">{maxStock}</span> in stock
                                        </div>
                                    )}

                                    <div className="add-to-cart-section">
                                        <div className="quantity-selector">
                                            <button
                                                disabled={isOutOfStock}
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                className="quantity-btn"
                                            >
                                                <Minus size={15} />
                                            </button>
                                            <span className="quantity-display">{quantity}</span>
                                            <button
                                                disabled={isOutOfStock || (maxStock !== null && quantity >= maxStock)}
                                                onClick={() => setQuantity(maxStock !== null ? Math.min(maxStock, quantity + 1) : quantity + 1)}
                                                className="quantity-btn"
                                            >
                                                <Plus size={15} />
                                            </button>
                                        </div>
                                        <button
                                            disabled={isOutOfStock}
                                            onClick={handleAddToCart}
                                            className={`add-to-cart-btn ${isOutOfStock ? 'disabled' : added ? 'added' : ''}`}
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
                                    </div>
                                </>
                            );
                        })()}

                        <div className="product-support-text">
                            <CheckCircle2 size={14} />
                            Every purchase supports NewLife Project programs.
                        </div>

                        <div className="product-actions">
                            <button
                                onClick={() => toggleWishlist(product)}
                                className={`action-btn ${isWishlisted(product.id) ? 'wishlisted' : ''}`}
                            >
                                <Heart size={15} className={isWishlisted(product.id) ? 'fill-heart' : ''} />
                                {isWishlisted(product.id) ? 'In Wishlist' : 'Add to Wishlist'}
                            </button>
                            <span className="action-separator">|</span>
                            <button className="action-btn">
                                <Share2 size={15} /> Share
                            </button>
                        </div>
                    </div>
                </div>

                <div className="product-tabs-section">
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
                            <div className="tab-panel">
                                <div
                                    className="product-description"
                                    dangerouslySetInnerHTML={{ __html: product.description || '<p>No description available.</p>' }}
                                />
                            </div>
                        )}

                        {activeTab === 'reviews' && (
                            <div className="tab-panel">
                                {reviews.length > 0 ? (
                                    <div className="reviews-list">
                                        {reviews.map(r => (
                                            <div key={r.id} className="review-card">
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
                                                                className={i < r.rating ? "star filled" : "star"}
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

                                <div className="review-form-card">
                                    <h3 className="review-form-title">
                                        {reviewSuccess ? '✅ Review submitted!' : 'Write a Review'}
                                    </h3>
                                    {!reviewSuccess && (
                                        <form onSubmit={handleReviewSubmit} className="review-form">
                                            <div className="form-row">
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
                                            <div className="form-group">
                                                <label>Rating</label>
                                                <div className="rating-input">
                                                    {[1, 2, 3, 4, 5].map(n => (
                                                        <button
                                                            key={n}
                                                            type="button"
                                                            onClick={() => setReviewForm({ ...reviewForm, rating: n })}
                                                            className={`rating-star-btn ${n <= reviewForm.rating ? 'active' : ''}`}
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
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={reviewLoading}
                                                className="btn-primary"
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
                        )}
                    </div>
                </div>

                {related.length > 0 && (
                    <div className="related-products-section">
                        <h2 className="related-title">You May Also Like</h2>
                        <div className="related-grid">
                            {related.map(p => (
                                <Link
                                    key={p.id}
                                    to={`/shop/product/${p.id}`}
                                    onClick={() => window.scrollTo(0, 0)}
                                    className="related-product-card"
                                >
                                    <div className="related-product-image">
                                        <img src={p.images?.[0]?.src} alt={p.name} />
                                    </div>
                                    <div className="related-product-info">
                                        <h4 className="related-product-name">{p.name}</h4>
                                        <p className="related-product-price">${p.price}</p>
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
