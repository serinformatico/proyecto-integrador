import { useContext } from "react";
import PropTypes from "prop-types";
import { Card, CardActions, CardContent, CardMedia } from "@mui/material";
import "./productCard.scss";

import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";

import Button from "../button/Button";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

const ProductCard = (props) => {
    const { product, itIsOff } = props;
    const { getProduct, addProduct, subtractProduct } = useContext(ShoppingCartContext);

    return (
        <Card className="product-card">
            <CardMedia
                component="img"
                className="product-card__image"
                image={product.image}
                alt={`Fotografía de ${product.name}`}/>
            <CardContent className="product-card__content">
                <h4>{product.name}</h4>
                <p><span>Ingredientes:</span> {`${product.description}`}</p>
                {!product.isPromotion && <p><span>Precio:</span> {`${product.price}`}</p>}
                {product.isPromotion && <p><span>Precio promocional:</span> {`${product.price - (product.price / 100 * itIsOff )}`}</p>}
            </CardContent>
            <CardActions className="product-card__actions">
                {product.stock > 0
                    ? (<>
                        <Button
                            color="danger"
                            onClick={() => subtractProduct(product)}>
                            <RemoveIcon/>
                        </Button>
                        <span>{getProduct(product.id)?.amount ?? 0}</span>
                        <Button onClick={() => addProduct(product)}><AddIcon/></Button>
                    </>)
                    : (<span>SIN STOCK</span>)
                }
            </CardActions>
        </Card>
    );
};

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired,
        stock: PropTypes.number.isRequired,
        price: PropTypes.number.isRequired,
        isPromotion: PropTypes.bool.isRequired,
    }),
    itIsOff: PropTypes.number,
};

ProductCard.defaultProps = {
    itIsOff: 0.0,
};

export default ProductCard;