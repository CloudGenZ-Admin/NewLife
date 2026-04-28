// ============================================================
// WooCommerce API — Central Configuration
// All API logic lives here. Keys come from .env (VITE_ prefix).
// ============================================================

export const WOOCOMMERCE_URL = import.meta.env.VITE_WC_URL;
const CONSUMER_KEY = import.meta.env.VITE_WC_CONSUMER_KEY;
const CONSUMER_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET;

// ─── Core fetch helper ───────────────────────────────────────
async function wooFetch(endpoint, options = {}) {
  const { headers: callerHeaders, ...restOptions } = options;
  const url = `${WOOCOMMERCE_URL}/wp-json/wc/v3${endpoint}`;
  
  const res = await fetch(url, {
    ...restOptions,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Basic ${btoa(`${CONSUMER_KEY}:${CONSUMER_SECRET}`)}`,
      ...callerHeaders,
    },
  });

  let data;
  try {
    data = await res.json();
  } catch {
    throw new Error(`Server returned non-JSON response (${res.status})`);
  }
  

  if (!res.ok) {
    const CODE_MAP = {
      rest_customer_invalid_email: "That email address is not valid.",
      "registration-error-email-exists":
        "An account already exists with that email. Please sign in.",
      woocommerce_rest_customer_invalid:
        "Customer data is invalid. Please check your details.",
      rest_forbidden: "You do not have permission to perform this action.",
      rest_invalid_param: "Some of the information you entered is invalid.",
    };
    const friendly =
      CODE_MAP[data.code] || data.message || `API error ${res.status}`;
    throw new Error(friendly);
  }

  return data;
}

// ─── PRODUCTS ────────────────────────────────────────────────

/** Fetch paginated products with optional filters */
export async function fetchProducts({
  page = 1,
  perPage = 12,
  category = "",
  search = "",
  orderby = "date",
  order = "desc",
} = {}) {
  const params = new URLSearchParams({
    page,
    per_page: perPage,
    ...(orderby && orderby !== "relevance" ? { orderby } : {}),
    order,
    status: "publish",
    ...(category ? { category } : {}),
    ...(search ? { search } : {}),
    _: Date.now(),
  });
  try {
    return await wooFetch(`/products?${params}`);
  } catch (e) {
    console.error("fetchProducts:", e);
    return [];
  }
}

/** Fetch a single product by ID */
export async function fetchProduct(id) {
  if (!id) return null;
  try {
    return await wooFetch(`/products/${id}`);
  } catch (e) {
    console.error("fetchProduct:", e);
    return null;
  }
}

/** Fetch related products from the same category (excludes current product) */
export async function fetchRelatedProducts(categoryId, excludeId) {
  if (!categoryId) return [];
  try {
    const products = await wooFetch(
      `/products?category=${categoryId}&per_page=5&status=publish`,
    );
    return products.filter((p) => p.id !== parseInt(excludeId)).slice(0, 4);
  } catch (e) {
    console.error("fetchRelatedProducts:", e);
    return [];
  }
}

/** Fetch variations for a variable product */
export async function fetchVariations(productId) {
  if (!productId) return [];
  try {
    return await wooFetch(`/products/${productId}/variations?per_page=50`);
  } catch (e) {
    console.error("fetchVariations:", e);
    return [];
  }
}

/** Live search — debounced in the UI, min 2 chars */
export async function searchProducts(query) {
  if (!query || query.trim().length < 2) return [];
  const params = new URLSearchParams({
    search: query.trim(),
    per_page: 8,
    status: "publish",
  });
  try {
    return await wooFetch(`/products?${params}`);
  } catch (e) {
    console.error("searchProducts:", e);
    return [];
  }
}

// ─── CATEGORIES ──────────────────────────────────────────────

export async function fetchCategories() {
  try {
    return await wooFetch("/products/categories?per_page=100&hide_empty=true");
  } catch (e) {
    console.error("fetchCategories:", e);
    return [];
  }
}

// ─── REVIEWS ─────────────────────────────────────────────────

export async function fetchProductReviews(productId) {
  if (!productId) return [];
  try {
    return await wooFetch(
      `/products/reviews?product=${productId}&status=approved`,
    );
  } catch (e) {
    console.error("fetchProductReviews:", e);
    return [];
  }
}

export async function submitReview({
  productId,
  reviewerName,
  reviewerEmail,
  review,
  rating,
}) {
  if (!productId || !reviewerName || !reviewerEmail || !review) {
    throw new Error("Please fill in all review fields.");
  }
  try {
    return await wooFetch("/products/reviews", {
      method: "POST",
      body: JSON.stringify({
        product_id: productId,
        reviewer: reviewerName,
        reviewer_email: reviewerEmail,
        review,
        rating: Number(rating),
      }),
    });
  } catch (e) {
    console.error("submitReview:", e);
    throw e;
  }
}

// ─── ORDERS ──────────────────────────────────────────────────

export async function createOrder(orderData) {
  try {
    return await wooFetch("/orders", {
      method: "POST",
      body: JSON.stringify(orderData),
    });
  } catch (e) {
    console.error("createOrder:", e);
    throw e;
  }
}

export async function updateOrder(orderId, data) {
  if (!orderId) throw new Error("Order ID is required.");
  try {
    return await wooFetch(`/orders/${orderId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.error("updateOrder:", e);
    throw e;
  }
}

export async function fetchCustomerOrders(customerId) {
  if (!customerId) return [];
  try {
    const orders = await wooFetch(
      `/orders?customer=${customerId}&per_page=20&orderby=date&order=desc&status=any&_=${Date.now()}`,
    );
    return orders;
  } catch (e) {
    console.error("fetchCustomerOrders:", e);
    return [];
  }
}

export async function fetchOrder(orderId) {
  if (!orderId) return null;
  try {
    return await wooFetch(`/orders/${orderId}`);
  } catch (e) {
    console.error("fetchOrder:", e);
    return null;
  }
}

// ─── CUSTOMERS ───────────────────────────────────────────────

// ─── AUTHENTICATION (Custom PHP Backend) ─────────────────────

/** Register new user via custom PHP backend (WordPress database + WooCommerce) */
export async function registerCustomer(data) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();

    if (!response.ok) {
      // Handle both "error" and "message" fields from backend
      throw new Error(result.error || result.message || "Registration failed");
    }

    return result;
  } catch (e) {
    if (e.message?.toLowerCase().includes("email")) {
      throw new Error(
        "An account already exists with that email. Please sign in instead.",
      );
    }
    throw e;
  }
}

/** Login user via custom PHP backend (checks WordPress database password) */
export async function loginCustomer(email, password) {
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000/api";

  if (!email) throw new Error("Please enter your email address.");
  if (!password) throw new Error("Please enter your password.");

  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email.trim(), password }),
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || result.message || "Login failed");
    }

    // Fetch full customer data from WooCommerce if customer ID exists
    if (result.woocommerce_customer_id) {
      try {
        // Add cache-busting parameter to force fresh data from database
        const cacheBuster = `_=${Date.now()}`;
        const customerData = await wooFetch(`/customers/${result.woocommerce_customer_id}?${cacheBuster}`);
        
        // Merge WooCommerce customer data with auth data
        const mergedData = {
          ...result,
          billing: customerData.billing || {},
          shipping: customerData.shipping || {},
          avatar_url: customerData.avatar_url || '',
        };
        
        
        return mergedData;
      } catch (e) {
        console.error("Failed to fetch WooCommerce customer data:", e);
        // Return basic user data even if WooCommerce fetch fails
        return result;
      }
    }

    console.warn("No woocommerce_customer_id found in login response");
    return result;
  } catch (e) {
    console.error("loginCustomer:", e);
    throw e;
  }
}

export async function updateCustomer(customerId, data) {
  if (!customerId) throw new Error("Not signed in.");
  try {
    const result = await wooFetch(`/customers/${customerId}`, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  } catch (e) {
    console.error("updateCustomer error:", e);
    throw e;
  }
}

// ─── COUPONS ─────────────────────────────────────────────────

export async function validateCoupon(code) {
  if (!code) throw new Error("Please enter a coupon code.");
  const coupons = await wooFetch(
    `/coupons?code=${encodeURIComponent(code.trim())}`,
  );
  if (coupons && coupons.length > 0) {
    const coupon = coupons[0];
    if (coupon.date_expires && new Date(coupon.date_expires) < new Date()) {
      throw new Error("This coupon has expired.");
    }
    return coupon;
  }
  throw new Error("Invalid coupon code. Please try again.");
}

// ─── SHIPPING ────────────────────────────────────────────────

export async function fetchShippingZones() {
  try {
    return await wooFetch("/shipping/zones");
  } catch (e) {
    console.error("fetchShippingZones:", e);
    return [];
  }
}

export async function fetchShippingMethods(zoneId) {
  try {
    return await wooFetch(`/shipping/zones/${zoneId}/methods`);
  } catch (e) {
    console.error("fetchShippingMethods:", e);
    return [];
  }
}

export async function fetchShippingClasses() {
  try {
    return await wooFetch("/products/shipping_classes?per_page=100");
  } catch (e) {
    console.error("fetchShippingClasses:", e);
    return [];
  }
}

export async function calculateShipping(cartItems) {
  try {
    const zones = await fetchShippingZones();
    let flatRateMethod = null;

    // Fetch all zone methods in parallel to avoid N+1 problem
    const zoneMethodsPromises = [];
    
    if (zones && zones.length > 0) {
      // Create array of promises for all zones
      zoneMethodsPromises.push(...zones.map(zone => 
        fetchShippingMethods(zone.id).then(methods => ({ zone, methods }))
      ));
    }
    
    // Also check default "Rest of the World" zone (ID 0)
    zoneMethodsPromises.push(
      fetchShippingMethods(0).then(methods => ({ zone: { id: 0, name: 'Rest of the World' }, methods }))
    );

    // Fetch all zone methods at once
    const allZoneMethods = await Promise.all(zoneMethodsPromises);

    // Find first enabled flat_rate method
    for (const { methods } of allZoneMethods) {
      const foundFlatRate = methods.find(m => m.method_id === 'flat_rate' && m.enabled);
      if (foundFlatRate) {
        flatRateMethod = foundFlatRate;
        break;
      }
    }

    if (!flatRateMethod) {
      throw new Error('Flat rate shipping not configured');
    }

    // Fetch shipping classes
    const shippingClasses = await fetchShippingClasses();
    const shippingRates = {};

    // Build shipping rates map from flat rate settings
    if (flatRateMethod.settings) {
      shippingClasses.forEach(shippingClass => {
        const classKey = `class_cost_${shippingClass.id}`;
        if (flatRateMethod.settings[classKey]?.value) {
          const cost = parseFloat(flatRateMethod.settings[classKey].value);
          if (cost > 0) {
            shippingRates[shippingClass.slug] = {
              label: shippingClass.name,
              cost: cost
            };
          }
        }
      });
    }

    if (Object.keys(shippingRates).length === 0) {
      throw new Error('No shipping class costs configured');
    }

    // Find highest shipping cost from cart items
    let highestCost = 0;
    let shippingMethod = null;

    cartItems.forEach(item => {
      const shippingClass = item.shipping_class || '';
      if (shippingRates[shippingClass] && shippingRates[shippingClass].cost > highestCost) {
        highestCost = shippingRates[shippingClass].cost;
        shippingMethod = {
          id: `flat_rate_${shippingClass}`,
          method_id: 'flat_rate',
          label: shippingRates[shippingClass].label,
          cost: shippingRates[shippingClass].cost
        };
      }
    });

    // Use base flat rate cost if no shipping class matched
    if (!shippingMethod) {
      const baseCost = parseFloat(flatRateMethod.settings?.cost?.value || 0);
      shippingMethod = {
        id: 'flat_rate_default',
        method_id: 'flat_rate',
        label: flatRateMethod.title || 'Flat Rate',
        cost: baseCost
      };
    }

    return shippingMethod;
  } catch (e) {
    console.error("calculateShipping:", e);
    throw e;
  }
}
