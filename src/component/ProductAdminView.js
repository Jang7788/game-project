import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ProductAdminView() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3600/api/products/allproduct");
                const productList = await response.json();
                setProducts(productList);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return <div className="loading">loading</div>;
    }

    const handleAddProduct = () => {
        navigate('/addproduct');
    };

    const handleEraseProduct = async (id) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?")) {
            return;
        }
        
        try {
            const response = await fetch(`http://localhost:3600/api/products/deleteproduct/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setProducts(products.filter(p => (p.id || p._id) !== id));
                alert("ลบสินค้าสำเร็จ!");
            } else {
                alert("เกิดข้อผิดพลาดในการลบสินค้า");
            }
        } catch (err) {
            console.log(err);
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อ");
        }
    };

    const handleEditProduct = (id) => {
        navigate(`/editproduct/${id}`);
    };

    return (
        <div>
            <div>
                <h1>จัดการสินค้า (Admin)</h1>
                <button
                    className="btn btn-success"
                    onClick={handleAddProduct}
                >
                    + เพิ่มสินค้าใหม่
                </button>
            </div>
            <table>
                <tbody>
                    {products.map(product => (
                        <tr key={product.id || product._id}>
                            <td>
                                <img src={product.image || 'https://placehold.co/80x80?text=No+Image'} alt={product.name}/>
                            </td>
                            <td>{product.name}</td>
                            <td>{product.group}</td>
                            <td>{product.description}</td>
                            <td>
                                <button className="btn btn-warning" onClick={() => handleEditProduct(product.id || product._id)}>แก้ไข</button>
                                <button className="btn btn-danger" onClick={() => handleEraseProduct(product.id || product._id)}>ลบ</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default ProductAdminView;