import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { Box } from "@mui/material";
import "./formShoppingCart.scss";

import ShoppingCartContext from "../../../contexts/ShoppingCartContext.jsx";
import useProducts from "../../../hooks/useProducts.js";

import validationSchema from "./formShoppingCart.validation.js";

import InputField from "../inputField/InputField.jsx";
import Button from "../../button/Button.jsx";
import Alert from "../../alert/Alert.jsx";

const FormShoppingCart = () => {
    const [ openAlert, setOpenAlert ] = useState(false);
    const { shoppingCart, removeAllCartProducts, buyCartProducts, calculateTotal } = useContext(ShoppingCartContext);
    const { decreaseProductStock } = useProducts();

    const formik = useFormik({
        initialValues: {
            fullname: "",
            email: "",
            total: 0,
        },
        validationSchema: validationSchema,
        onSubmit: async (values, { resetForm }) => {
            values.total = calculateTotal();
            await buyCartProducts(values);
            await decreaseProductStock(shoppingCart);
            setOpenAlert(true);
            resetForm();
        },
    });

    return (
        <Box
            component="form"
            className="form-shopping-cart"
            noValidate
            autoComplete="off"
            onSubmit={formik.handleSubmit}>

            <InputField
                label="Nombre y apellido"
                name="fullname"
                value={formik.values.fullname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fullname && Boolean(formik.errors.fullname)}
                errorMessage={formik.touched.fullname && formik.errors.fullname}
                inputProps={{ maxLength: 25 }}/>

            <InputField
                label="E-mail"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                errorMessage={formik.touched.email && formik.errors.email}
                inputProps={{ maxLength: 50 }}/>

            <Button type="submit">Comprar</Button>
            <Button
                component={NavLink}
                to={"/"}
                color="danger"
                onClick={() => removeAllCartProducts()}>
                    Cancelar
            </Button>

            <Alert
                openAlert={openAlert}
                setOpenAlert={setOpenAlert}
                message="Tu compra se procesó correctamente"/>
        </Box>
    );
};

export default FormShoppingCart;