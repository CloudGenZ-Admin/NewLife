import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { fetchProducts, fetchCategories } from '../../api/woocommerce';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { ShoppingCart, Star, RefreshCw, Heart, Truck, ShieldCheck, RotateCcw, Headphones, ArrowRight } from 'lucide-react';
import '../../styles/shop/Shop.css';
import '../../styles/ArchitectHero.css';

gsap.registerPlugin(ScrollTrigger);

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
    const [categoryImages, setCategoryImages] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [activeCategory, setActiveCategory] = useState('all');
    const [sortKey, setSortKey] = useState('featured');
    const [view, setView] = useState('categories'); // 'categories' or 'products'
    const { addToCart } = useCart();
    const { wishlist, toggleWishlist } = useWishlist();

    const loadCategories = async () => {
        try {
            const catData = await fetchCategories();
            if (Array.isArray(catData)) {
                const filtered = catData.filter(c => c.name !== 'Uncategorized');
                setCategories(filtered);
                
                // For each category, get a representative product image
                const images = {};
                // First, check if categories have built-in images
                filtered.forEach(cat => {
                    if (cat.image?.src) images[cat.id] = cat.image.src;
                });

                // For those without images, fetch a product image in parallel
                const missingCats = filtered.filter(cat => !images[cat.id]);
                
                if (missingCats.length > 0) {
                    const results = await Promise.all(
                        missingCats.map(async (cat) => {
                            try {
                                const pData = await fetchProducts({ category: String(cat.id), perPage: 1 });
                                return { id: cat.id, src: pData?.[0]?.images?.[0]?.src };
                            } catch (err) {
                                console.warn(`Failed image for ${cat.name}:`, err);
                                return { id: cat.id, src: null };
                            }
                        })
                    );
                    
                    results.forEach(res => {
                        if (res.src) images[res.id] = res.src;
                    });
                }
                
                setCategoryImages(images);
            }
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

    const heroRef = useRef(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        loadCategories();
        loadProducts();

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.0 } });

            // 1. Grid Construction
            tl.to('.grid-line', {
                height: '100%',
                stagger: 0.02,
                duration: 0.6,
                ease: 'expo.inOut'
            })
            .to('.architect-decoration', {
                opacity: 0.15,
                scale: 1,
                duration: 1.2
            }, '-=0.5');

            // 2. Content Entry
            tl.to('.architect-detail, .architect-hero-title', {
                y: 0,
                opacity: 1,
                stagger: 0.08,
                duration: 0.5,
                ease: 'power3.out'
            }, 0.15);

            tl.to('.architect-meta, .footer-info-item', {
                y: 0,
                opacity: 1,
                stagger: 0.05,
                duration: 0.5,
                ease: 'power2.out'
            }, '-=0.4');

            // 3. Category Tiles Entry
            tl.from('.category-tile', {
                y: 30,
                opacity: 0,
                stagger: 0.1,
                duration: 0.8,
                ease: 'power3.out'
            }, '-=0.2');

            // 4. Main Content Reveal (for when view is already products)
            gsap.from('.products-grid', {
                y: 40,
                opacity: 0,
                duration: 1.2,
                scrollTrigger: {
                    trigger: '.shop-main',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            });

        }, heroRef);

        return () => ctx.revert();
    }, []);

    const handleSortChange = (value) => {
        setSortKey(value);
        const opt = SORT_OPTIONS.find(o => o.value === value) || SORT_OPTIONS[0];
        const catParam = activeCategory === 'all' ? '' : activeCategory;
        loadProducts({ orderby: opt.orderby, order: opt.order, category: catParam });
    };

    const handleCategoryChange = (catId) => {
        setActiveCategory(catId);
        setView('products');
        const opt = SORT_OPTIONS.find(o => o.value === sortKey) || SORT_OPTIONS[0];
        const catParam = catId === 'all' ? '' : catId;
        loadProducts({ orderby: opt.orderby, order: opt.order, category: catParam });
        
        // Scroll to top of products
        setTimeout(() => {
            const mainSection = document.querySelector('.shop-main');
            if (mainSection) mainSection.scrollIntoView({ behavior: 'smooth' });
        }, 100);
    };

    const handleBackToCategories = () => {
        setView('categories');
        setActiveCategory('all');
        // Re-animate categories with a guaranteed reset
        setTimeout(() => {
            gsap.fromTo('.category-tile', 
                { y: 30, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    stagger: 0.05,
                    duration: 0.8,
                    ease: 'power3.out',
                    clearProps: 'transform,opacity'
                }
            );
        }, 10);
    };

    const isWishlisted = (id) => wishlist.some(w => w.id === id);

    return (
        <div className="shop-page">
            {/* Hero Section */}
            <header className="architect-hero shop-hero-theme" ref={heroRef}>
                <div className="architect-grid">
                    {[...Array(12)].map((_, i) => (
                        <div key={`v-${i}`} className="grid-line v"></div>
                    ))}
                    {[...Array(6)].map((_, i) => (
                        <div key={`h-${i}`} className="grid-line h"></div>
                    ))}
                </div>

                <div className="architect-decoration shop-decor"></div>

                <div className="architect-wrapper">
                    <div className="architect-title-group">
                        <span className="architect-detail">NEWLIFE DESIGNS</span>
                        <h1 className="architect-hero-title">Entrepreneurship <br /> <em>& Cultural Richness.</em></h1>
                    </div>

                    <div className="architect-meta">
                        <p>We market custom-made outfits, African artifact, and accessories while displaying the richness of the Black culture and educating the community on the importance of diversity. Three-fourth of our products are made here in Canada by women and youth in our Project.</p>
                        <p style={{ marginTop: '1rem'}}>It is an income-generating division aimed to empower women in Ottawa, assist them in establishing independence, and create self-employed opportunities for entrepreneurs. Every purchase supports our shop and our local mission.</p>
                    </div>
                </div>

                <div className="architect-footer-info">
                    <div className="footer-info-item">
                        <div className="info-dot"></div>
                        <div>
                            <h4>Cultural Impact</h4>
                            <p>African Artifacts & Accessories</p>
                        </div>
                    </div>
                    <div className="footer-info-item">
                        <div className="info-dot"></div>
                        <div>
                            <h4>Made Locally</h4>
                            <p>75% Handcrafted in Canada</p>
                        </div>
                    </div>
                    <div className="footer-info-item">
                        <div className="info-dot"></div>
                        <div>
                            <h4>Empowerment</h4>
                            <p>Income-generating division</p>
                        </div>
                    </div>
                    <div className="footer-info-item">
                        <div className="info-dot"></div>
                        <div>
                            <h4>Charity</h4>
                            <p>Percentage of proceeds donated</p>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="shop-main">
                {view === 'categories' ? (
                    <div className="category-bento-grid">
                        {categories.map((cat, index) => (
                            <div 
                                key={cat.id} 
                                className={`category-tile tile-${(index % 6) + 1} ${
                                    ['out'].some(k => cat.name.toLowerCase().includes(k)) 
                                        ? 'tile-vertical-extra' 
                                        : ['acc', 'jewelry', 'pillow','bonnet'].some(k => cat.name.toLowerCase().includes(k))
                                            ? 'tile-square-extra'
                                            : ''
                                }`}
                                onClick={() => handleCategoryChange(String(cat.id))}
                            >
                                <div className="tile-image-wrapper">
                                    <img 
                                        src={categoryImages[cat.id] || ''} 
                                        alt={cat.name} 
                                    />
                                    <div className="tile-overlay"></div>
                                </div>
                                <div className="tile-content">
                                    <h3>{cat.name}</h3>
                                    <span className="tile-btn">Explore Collection <ArrowRight size={16} /></span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        {/* Controls */}
                        <div className="shop-controls">
                            <div className="shop-nav-actions">
                                <button onClick={handleBackToCategories} className="back-btn">
                                    <ArrowRight size={16} style={{ transform: 'rotate(180deg)' }} /> Categories
                                </button>
                                <div className="active-cat-label">
                                    Displaying: <span>{categories.find(c => String(c.id) === activeCategory)?.name || 'All Products'}</span>
                                </div>
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
                                <button onClick={handleBackToCategories} className="retry-btn">
                                    Return to Categories
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
                    </>
                )}
            </div>
        </div>
    );
}
