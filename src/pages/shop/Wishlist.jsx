import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import { Heart, ShoppingCart, ArrowLeft, Trash2, Star } from 'lucide-react';
import '../../styles/shop/Wishlist.css';

export default function Wishlist() {
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    if (wishlist.length === 0) {
        return (
            <div className="wishlist-page">
                <div className="wishlist-container">
                    <div className="empty-wishlist">
                        <Heart className="empty-wishlist-icon" size={80} />
                        <h2>Your wishlist is empty</h2>
                        <p>Save your favorite items here to purchase later.</p>
                        <Link to="/shop" className="browse-products-btn">
                            <ArrowLeft size={18} /> Browse Products
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="wishlist-page">
            <div className="wishlist-container">
                <div className="wishlist-header">
                    <h1>My Wishlist</h1>
                    <p>Your saved items</p>
                    <div className="wishlist-count">{wishlist.length} items</div>
                </div>

                <div className="wishlist-grid">
                    {wishlist.map(product => (
                        <div key={product.id} className="wishlist-card">
                            <div className="wishlist-image-wrapper">
                                <Link to={`/shop/product/${product.id}`}>
                                    <img
                                        src={product.images?.[0]?.src || 'https://via.placeholder.com/400'}
                                        alt={product.name}
                                        className="wishlist-image"
                                    />
                                </Link>
                                
                                {product.stock_status === 'instock' && (
                                    <span className="stock-badge in-stock">In Stock</span>
                                )}
                                {product.stock_status === 'outofstock' && (
                                    <span className="stock-badge out-of-stock">Out of Stock</span>
                                )}

                                <button
                                    onClick={() => toggleWishlist(product)}
                                    className="remove-wishlist-btn"
                                    title="Remove from wishlist"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>

                            <div className="wishlist-info">
                                {product.categories?.[0] && (
                                    <div className="wishlist-category">{product.categories[0].name}</div>
                                )}
                                
                                <Link to={`/shop/product/${product.id}`} className="wishlist-title">
                                    {product.name}
                                </Link>

                                <div className="wishlist-rating">
                                    <div className="wishlist-stars">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                size={14}
                                                className={i < Math.round(parseFloat(product.average_rating) || 5) ? 'wishlist-star' : 'wishlist-star empty'}
                                            />
                                        ))}
                                    </div>
                                    <span className="wishlist-rating-count">({product.rating_count || 0})</span>
                                </div>

                                <div className="wishlist-price">
                                    {product.sale_price ? (
                                        <>
                                            <span className="wishlist-price-current">${product.sale_price}</span>
                                            <span className="wishlist-price-original">${product.regular_price}</span>
                                        </>
                                    ) : (
                                        <span className="wishlist-price-current">${product.price || '0.00'}</span>
                                    )}
                                </div>

                                <div className="wishlist-actions">
                                    <button
                                        onClick={() => addToCart(product)}
                                        disabled={product.stock_status === 'outofstock'}
                                        className="add-to-cart-wishlist"
                                    >
                                        <ShoppingCart size={18} />
                                        {product.stock_status === 'outofstock' ? 'Out of Stock' : 'Add to Cart'}
                                    </button>
                                    <Link to={`/shop/product/${product.id}`} className="view-product-btn">
                                        View
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
