import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import { Box } from "@mui/material";
import "./product.scss";

import {
    MESSAGE_REQUIRED,
    MESSAGE_PRICE_INVALID,
    MESSAGE_STOCK_INVALID,
    REGEX_PRICE,
    REGEX_STOCK,
} from "../../constants/regexPattern.js";
import { JPG } from "../../constants/general.js";

import Alert from "../../components/alert/Alert.jsx";

import InputField from "../../components/form/inputField/InputField";
import Button from "../../components/button/Button";
import Switch from "../../components/form/switch/Switch";
import InputFile from "../../components/form/inputFile/InputFile";

const Product = () => {
    const [ openAlert, setOpenAlert ] = useState(false);

    const validationSchema = yup.object({
        name: yup
            .string("Ingresa un nombre")
            .min(3, "Ingresa un nombre con 3 o más caracteres")
            .required(MESSAGE_REQUIRED),
        price: yup
            .string("Ingresa un precio")
            .matches(REGEX_PRICE, MESSAGE_PRICE_INVALID)
            .required(MESSAGE_REQUIRED),
        stock: yup
            .string("Ingresa un stock")
            .matches(REGEX_STOCK, MESSAGE_STOCK_INVALID)
            .required(MESSAGE_REQUIRED),
        description: yup
            .string("Ingresa una descripción")
            .min(15, "Ingresa una consulta que tenga entre 15 y 150 carateres"),
    });

    const formik = useFormik({
        initialValues: {
            name: "",
            price: 0,
            stock: 0,
            description: "",
            image: null,
            isPromotion: false,
            files: [],
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            submit(values);
            resetForm();
        },
    });

    const submit = (values) => {
        console.log(values);
        setOpenAlert(true);
    };

    return (
        <Box className="product">
            <Box
                component="section"
                className="product__section">
                <h3>Producto</h3>

                <Box
                    className="product__section__form"
                    component="form"
                    noValidate
                    autoComplete="off"
                    onSubmit={formik.handleSubmit}>

                    <InputField
                        label="Nombre"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        errorMessage={formik.touched.name && formik.errors.name}
                        inputProps={{ maxLength: 25 }}/>

                    <InputField
                        label="Precio"
                        name="price"
                        value={formik.values.price}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.price && Boolean(formik.errors.price)}
                        errorMessage={formik.touched.price && formik.errors.price}
                        inputProps={{ maxLength: 12 }}/>

                    <InputField
                        label="Stock"
                        name="stock"
                        value={formik.values.stock}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.stock && Boolean(formik.errors.stock)}
                        errorMessage={formik.touched.stock && formik.errors.stock}
                        inputProps={{ maxLength: 6 }}/>

                    <InputField
                        label="Descripción"
                        name="description"
                        multiline
                        rows={5}
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        errorMessage={formik.touched.description && formik.errors.description}
                        inputProps={{ maxLength: 150 }}/>

                    <InputFile
                        label="Imagen"
                        name="files"
                        accept={[JPG]}
                        formik={formik}
                        error={formik.touched.files && Boolean(formik.errors.files)}
                        errorMessage={formik.touched.files && formik.errors.files}/>

                    <Switch
                        label="Está en promoción"
                        name="isPromotion"
                        value={formik.values.isPromotion}
                        onChange={formik.handleChange}
                    />

                    <Button type="submit">Guardar</Button>
                    <Button
                        component={NavLink}
                        to={"/"}
                        color="danger">
                            Cancelar
                    </Button>
                    <Alert
                        openAlert={openAlert}
                        setOpenAlert={setOpenAlert}
                        message="El producto se creó correctamente"/>
                </Box>
            </Box>
        </Box>
    );
};

export default Product;