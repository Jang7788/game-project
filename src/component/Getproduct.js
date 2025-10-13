import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "./UserContext"; // Import UserContext

function ProductDetailPage() {
    // 1. เปลี่ยน State เริ่มต้นเป็น null เพราะคาดหวัง Object แค่ชิ้นเดียว
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1); // State สำหรับจำนวนสินค้าที่จะเพิ่ม
    
    // 2. ใช้ useParams() เพื่อดึง id ออกมาจาก URL
    const { id } = useParams();
    const { user } = useContext(UserContext); // ดึงข้อมูล user มาจาก Context
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            if (!id) return; // ถ้าไม่มี id ใน URL ก็ไม่ต้องทำอะไร
            try {
                const response = await fetch(`http://localhost:3600/api/products/getproduct/${id}`);
                if (!response.ok) {
                    throw new Error('Product not found');
                }
                const datajson = await response.json();
                setProduct(datajson);
            } catch (err) {
                console.log(err);
                alert(err.message);
                navigate('/products'); // ถ้าหาไม่เจอ ให้กลับไปหน้าหลัก
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]); // ให้ Effect นี้ทำงานใหม่ทุกครั้งที่ id ใน URL เปลี่ยน

    const handleAddToCart = async () => {
        if (!user) {
            alert("กรุณาเข้าสู่ระบบเพื่อเพิ่มสินค้าลงตะกร้า");
            navigate('/login');
            return;
        }
        if (quantity > product.stock) {
            alert(`สินค้ามีไม่เพียงพอ! (คงเหลือ ${product.stock} ชิ้น)`);
            return;
        }

        try {
            const response = await fetch('http://localhost:3600/api/cart/addcart', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                credentials: 'include',
                body: JSON.stringify({
                    productId: product._id, // ส่ง _id ของ MongoDB
                    quantity: quantity
                })
            });
            if (response.ok) {
                alert(`เพิ่ม "${product.name}" จำนวน ${quantity} ชิ้น ลงตะกร้าแล้ว!`);
                navigate('/cart');
            } else {
                alert("เกิดข้อผิดพลาดในการเพิ่มสินค้าลงตะกร้า");
            }
        } catch(err) {
            console.error("Failed to add to cart:", err);
        }
    };

    if (loading) {
        return <div className="container text-center p-5"><h4>กำลังโหลดข้อมูลสินค้า...</h4></div>;
    }

    // 3. ถ้าหา product ไม่เจอ (เป็น null) ให้แสดงข้อความ
    if (!product) {
        return <div className="container text-center p-5"><h4>ไม่พบสินค้า</h4></div>;
    }

    // 4. แสดงผลข้อมูลจาก Object โดยตรง ไม่ต้อง .map()
    return (
        <div className="container my-5">
            <div className="row">
                <div className="col-md-6">
                    <img 
                        src={`http://localhost:3600/${product.image}`} 
                        alt={product.name}
                        className="img-fluid rounded shadow-sm"
                    />
                </div>
                <div className="col-md-6">
                    <h2>{product.name}</h2>
                    <p className="text-muted">{product.group}</p>
                    <p>{product.description}</p>
                    <h3 className="my-3 text-success fw-bold">฿{product.price.toLocaleString('th-TH')}</h3>
                    <p className={product.stock > 0 ? 'text-success' : 'text-danger'}>
                        {product.stock > 0 ? `มีสินค้า (${product.stock} ชิ้น)` : 'สินค้าหมด'}
                    </p>
                    
                    {product.stock > 0 && (
                        <div className="d-flex align-items-center mt-4">
                            <input 
                                type="number" 
                                className="form-control me-3" 
                                style={{width: '80px'}}
                                value={quantity}
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                min="1"
                                max={product.stock}
                            />
                            <button onClick={handleAddToCart} className="btn btn-primary btn-lg">
                                เพิ่มลงตะกร้า
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;