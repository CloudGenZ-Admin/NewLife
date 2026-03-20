import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProducts, fetchCategories } from '../../api/woocommerce';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ShoppingCart, Star, RefreshCw, Heart, Truck, ShieldCheck, RotateCcw, Headphones } from 'lucide-react';
import '../../styles/shop/Shop.css';

const SORT_OPTIONS = [
    { label: 'Featured', value: 'featured', orderby: 'date', order: 'desc' },
    { label: 'Newest First', value: 'newest', orderby: 'date', order: 'desc' },
    { label: 'Price: Low to High', value: 'price_asc', orderby: 'price', order: 'asc' },
    { label: 'Price: High to Low', value: 'price_desc', orderby: 'price', order: 'desc' },
    { label: 'Name: A → Z', value: 'title_asc', orderby: 'title', order: 'asc' },
    { label: 'Best Selling', value: 'popularity', orderby: 'popularity', order: 'desc' },
];

export default function Shop() {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortKey, setSortKey] = useState('featured');
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();

    const loadCategories = async () => {
        try {
            const catData = await fetchCategories();
            if (Array.isArray(catData))
                setCategories(catData.filter(c => c.name !== 'Uncategorized'));
        } catch (err) {
            console.error('loadCategories:', err);
        }
    };

    const loadProducts = async ({ orderby = 'date', order = 'desc', category = '' } = {}) => {
        setLoading(true);
        setError(null);
        try {
            const prodData = await fetchProducts({
                orderby,
                order,
                ...(category ? { category } : {}),
                perPage: 20,
            });
            if (Array.isArray(prodData)) {
                setProducts(prodData);
            } else {
                throw new Error('Invalid response format');
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadCategories();
        loadProducts();
    }, []);

    const handleSortChange = (value) => {
        setSortKey(value);
        const opt = SORT_OPTIONS.find(o => o.value === value) || SORT_OPTIONS[0];
        const catParam = activeCategory === 'all' ? '' : activeCategory;
        loadProducts({ orderby: opt.orderby, order: opt.order, category: catParam });
    };

    const handleCategoryChange = (catId) => {
        setActiveCategory(catId);
        const opt = SORT_OPTIONS.find(o => o.value === sortKey) || SORT_OPTIONS[0];
        const catParam = catId === 'all' ? '' : catId;
        loadProducts({ orderby: opt.orderby, order: opt.order, category: catParam });
    };

    const isWishlisted = (id) => wishlist.some(w => w.id === id);

    return (
        <div className="shop-page">
            {/* Hero Section */}
            <section className="shop-hero">
                <div className="shop-hero-content">
                    <h1>Shop Our Collection</h1>
                    <p>Discover handcrafted, ethically sourced goods. From apparel to home décor — premium quality delivered to your door.</p>
                    
                    <div className="shop-features">
                        <div className="shop-feature-item">
                            <Truck className="shop-feature-icon" size={20} />
                            <span>Free Shipping $50+</span>
                        </div>
                        <div className="shop-feature-item">
                            <ShieldCheck className="shop-feature-icon" size={20} />
                            <span>Secure Checkout</span>
                        </div>
                        <div className="shop-feature-item">
                            <RotateCcw className="shop-feature-icon" size={20} />
                            <span>30-Day Returns</span>
                        </div>
                        <div className="shop-feature-item">
                            <Headphones className="shop-feature-icon" size={20} />
                            <span>24/7 Support</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <div className="shop-main">
                {/* Controls */}
                <div className="shop-controls">
                    <div className="shop-categories">
                        <button
                            onClick={() => handleCategoryChange('all')}
                            className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                        >
                            All
                        </button>
                        {categories.map(cat => (
                            <button
                                key={cat.id}
                                onClick={() => handleCategoryChange(String(cat.id))}
                                className={`category-btn ${activeCategory === String(cat.id) ? 'active' : ''}`}
                            >
                                {cat.name}
                            </button>
                        ))}
                    </div>

                    <div className="shop-sort">
                        <label>Sort by:</label>
                        <select value={sortKey} onChange={(e) => handleSortChange(e.target.value)}>
                            {SORT_OPTIONS.map(opt => (
                                <option key={opt.value} value={opt.value}>{opt.label}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Products Grid */}
                {loading ? (
                    <div className="shop-loading">
                        <div className="loading-spinner"></div>
                        <p>Loading products...</p>
                    </div>
                ) : error ? (
                    <div className="shop-error">
                        <RefreshCw className="error-icon" size={48} />
                        <p>{error}</p>
                        <button onClick={() => loadProducts()} className="retry-btn">
                            <RefreshCw size={16} /> Retry
                        </button>
                    </div>
                ) : products.length === 0 ? (
                    <div className="shop-error">
                        <p>No products found in this category.</p>
                        <button onClick={() => handleCategoryChange('all')} className="retry-btn">
                            View All Products
                        </button>
                    </div>
                ) : (
                    <div className="products-grid">
                        {products.map(product => (
                            <div key={product.id} className="product-card">
                                <div className="product-image-wrapper">
                                    <Link to={`/shop/product/${product.id}`}>
                                        <img
                                            src={product.images?.[0]?.src || 'https://via.placeholder.com/400'}
                                            alt={product.name}
                                            className="product-image"
                                        />
                                    </Link>
                                    
                                    {product.stock_status === 'outofstock' && (
                                        <span className="product-badge">Out of Stock</span>
                                    )}
                                    {product.stock_status !== 'outofstock' && product.sale_price && (
                                        <span className="product-badge sale">Sale</span>
                                    )}

                                    <div className="product-actions">
                                        <button
                                            onClick={() => toggleWishlist(product)}
                                            className={`action-btn ${isWishlisted(product.id) ? 'active' : ''}`}
                                            title="Add to wishlist"
                                        >
                                            <Heart size={18} />
                                        </button>
                                    </div>
                                </div>

                                <div className="product-info">
                                    {product.categories?.[0] && (
                                        <div className="product-category">{product.categories[0].name}</div>
                                    )}
                                    
                                    <Link to={`/shop/product/${product.id}`} className="product-title">
                                        {product.name}
                                    </Link>

                                    <div className="product-rating">
                                        <div className="stars">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    size={14}
                                                    className={i < Math.round(parseFloat(product.average_rating) || 5) ? 'star' : 'star empty'}
                                                />
                                            ))}
                                        </div>
                                        <span className="rating-count">({product.rating_count || 0})</span>
                                    </div>

                                    <div className="product-price">
                                        {product.sale_price ? (
                                            <>
                                                <span className="price-current">${product.sale_price}</span>
                                                <span className="price-original">${product.regular_price}</span>
                                            </>
                                        ) : (
                                            <span className="price-current">${product.price || '0.00'}</span>
                                        )}
                                    </div>

                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock_status === 'outofstock'}
                                        className="add-to-cart-btn"
                                    >
                                        <ShoppingCart size={18} />
                                        {product.stock_status === 'outofstock' ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
