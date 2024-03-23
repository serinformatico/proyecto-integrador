
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

const PRODUCTS_URL = `${BACKEND_HOST}/api/products`;
const SHOPPING_CARTS_URL = `${BACKEND_HOST}/api/shopping-carts`;
const CONSULTS_URL = `${BACKEND_HOST}/api/consults`;
const IMAGES_URL = `${BACKEND_HOST}/public/images`;

const DEFAULT_IMAGE_NAME = "default.jpg";

export {
    PRODUCTS_URL,
    SHOPPING_CARTS_URL,
    CONSULTS_URL,
    IMAGES_URL,
    DEFAULT_IMAGE_NAME,
};