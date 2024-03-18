
const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;

const CONSULTS_URL = `${BACKEND_HOST}/api/consults`;
const PRODUCTS_URL = `${BACKEND_HOST}/api/products`;
const IMAGES_URL = `${BACKEND_HOST}/public/images`;

const DEFAULT_IMAGE_NAME = "default.jpg";

export {
    CONSULTS_URL,
    PRODUCTS_URL,
    IMAGES_URL,
    DEFAULT_IMAGE_NAME,
};