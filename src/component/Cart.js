import { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
    const [cartData, setCartData] = useState(null); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const fetchCart = useCallback(async () => {
        try {
            const response = await fetch("https://server-qobj.onrender.com/api/cart/allcart", {
                credentials: 'include' 
            });

            if (response.status === 401) {
                navigate('/login');
                console.log("ไป login")
                return;
            }
            if (!response.ok) {
                throw new Error('ไม่สามารถดึงข้อมูลตะกร้าสินค้าได้');
            }
            
            const datajson = await response.json();
            setCartData(datajson); 
        } catch (err) {
            console.error(err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const handleRemoveItem = async (productId) => {
        if (!window.confirm("คุณต้องการนำสินค้านี้ออกจากตะกร้าใช่หรือไม่?")) return;

        try {
            const response = await fetch(`http://localhost:3600/api/cart/items/${productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                fetchCart(); 
            } else {
                alert("เกิดข้อผิดพลาดในการลบสินค้า");
            }
        } catch (err) {
            console.error("Failed to remove item:", err);
        }
    };

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">กำลังโหลดข้อมูลตะกร้า...</p>
            </div>
        );
    }

    if (error) {
        return <div className="container text-center mt-5 alert alert-danger">Error: {error}</div>
    }

    const subtotal = cartData?.items?.reduce((total, item) => {
        return total + (item.productId.price * item.quantity);
    }, 0) || 0;

    return (
        <div className="container py-5">
            <h1 className="mb-4">ตะกร้าสินค้าของคุณ</h1>
            {cartData && cartData.items.length > 0 ? (
                <div className="row">
                    <div className="col-lg-8">
                        {cartData.items.map(item => (
                            <div key={item.productId._id} className="card mb-3">
                                <div className="row g-0">
                                    <div className="col-md-3 d-flex justify-content-center align-items-center">
                                        <img 
                                            src={`http://localhost:3600/${item.productId.image}`}
                                            alt={item.productId.name}
                                            className="img-fluid rounded-start"
                                            style={{ maxHeight: '120px', width: 'auto', objectFit: 'contain', padding: '10px' }}
                                        />
                                    </div>
                                    <div className="col-md-9">
                                        <div className="card-body">
                                            <div className="d-flex justify-content-between">
                                                <h5 className="card-title">{item.productId.name}</h5>
                                                <button onClick={() => handleRemoveItem(item.productId._id)} className="btn-close" aria-label="Close"></button>
                                            </div>
                                            <p className="card-text text-muted">จำนวน: {item.quantity}</p>
                                            <p className="card-text fw-bold fs-5">฿{(item.productId.price * item.quantity).toLocaleString('th-TH')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="col-lg-4">
                        <div className="card shadow-sm">
                            <div className="card-body">
                                <h5 className="card-title">สรุปยอด</h5>
                                <hr />
                                <div className="d-flex justify-content-between mb-2">
                                    <span>ราคารวม</span>
                                    <span className="fw-bold fs-5">฿{subtotal.toLocaleString('th-TH')}</span>
                                </div>
                                <button className="btn btn-primary w-100 mt-3">ไปที่หน้าชำระเงิน</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center py-5">
                    <p className="fs-4">ไม่มีสินค้าในตะกร้าของคุณ</p>
                    <Link to="/product" className="btn btn-primary">เลือกซื้อสินค้าต่อ</Link>
                </div>
            )}
        </div>
    );
}

export default Cart;
