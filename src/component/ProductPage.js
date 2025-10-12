import { useContext } from "react";
import { UserContext } from "./UserContext";
import ProductAdminView from "./ProductAdminView";
import ProductUserView from "./ProductUserView";
import { Navigate } from 'react-router-dom';

function Product() {
    const {user , loading} = useContext(UserContext);

    if (loading) {
        return (<div className="container">Loading</div>)
    }

    if (!user) {
    return <Navigate to="/login" replace={true} />;
    } else {
        if (user.role === "admin") {
            return (
                <div>
                    <ProductAdminView />
                </div>
                );
        } else {
            return (<ProductUserView />);
        }
    }
}

export default Product;