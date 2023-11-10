import { createContext } from "react";
import PropTypes from "prop-types";
import useLocalStorage from "../hooks/useLocalStorage";

const ShoppingCartContext = createContext();

const ShoppingCartProvider = (props) => {
    const { children } = props;
    const { items, setItemValue } = useLocalStorage({ shoppingCart: [] });

    const setProduct = (product, amount) => {
        const shoppingCartWithoutThisProduct = items.shoppingCart.filter((item) => item.id != product.id);

        if (amount <= 0) {
            setItemValue("shoppingCart", shoppingCartWithoutThisProduct);
        }

        if (amount > 0 && amount <= product.stock) {
            product.amount = amount;
            product.totalPrice = product.price * product.amount;
            setItemValue("shoppingCart", [ ...shoppingCartWithoutThisProduct, product ]);
        }
    };

    const getProduct = (id) => {
        return items.shoppingCart.find((item) => item.id === id);
    };

    const addProduct = (product) => {
        const amount = getProduct(product.id)?.amount ?? 0;
        setProduct(product, amount+1);
    };

    const subtractProduct = (product) => {
        const amount = getProduct(product.id)?.amount ?? 0;
        setProduct(product, amount-1);
    };

    const countProducts = () => {
        return items.shoppingCart.reduce((accumulator, item) => accumulator += item.amount, 0);
    };

    const calculateTotal = () => {
        return items.shoppingCart.reduce((accumulator, item) => accumulator += (item.price * item.amount), 0);
    };

    const removeProduct = (id) => {
        const shoppingCartWithoutThisProduct = items.shoppingCart.filter((item) => item.id != id);
        setItemValue("shoppingCart", shoppingCartWithoutThisProduct);
    };

    const removeAllProducts = () => {
        setItemValue("shoppingCart", []);
    };

    const buyProducts = () => {
        setItemValue("shoppingCart", []);
    };

    return (
        <ShoppingCartContext.Provider
            value={{
                shoppingCart: items.shoppingCart,
                getProduct,
                addProduct,
                subtractProduct,
                countProducts,
                calculateTotal,
                removeProduct,
                removeAllProducts,
                buyProducts,
            }}>
            {children}
        </ShoppingCartContext.Provider>
    );
};

ShoppingCartProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

export {
    ShoppingCartContext,
    ShoppingCartProvider,
};