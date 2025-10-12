import { useEffect, useState } from "react";
import { Link } from 'react-router-dom';

function ProductUserView() {
    const [productList, setProductList] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchdata = async () => {
            try {
                const response = await fetch("http://localhost:3600/api/allproduct");
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const datajson = await response.json();
                setProductList(datajson);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchdata();
    }, []);

    if (loading) {
        return (
            <div className="container text-center mt-5">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
                <p className="mt-2">กำลังโหลดข้อมูลสินค้า...</p>
            </div>
        );
    }

    return (
        <div className="container py-5">
            <h1 className="text-center mb-4">รายการสินค้าของเรา</h1>
            
            <div className="row g-4">
                {productList.map(product => (
                    <div key={product.id || product._id} className="col-lg-4 col-md-6 col-12">
                        <div className="card h-100 shadow-sm">
                            <img 
                                src={`http://localhost:3600/${product.image}` || 'https://placehold.co/600x400?text=No+Image'} 
                                className="card-img-top" 
                                alt={product.name}
                                style={{ height: '200px', objectFit: 'cover' }}
                            />
                            
                            <div className="card-body d-flex flex-column">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="card-text text-muted flex-grow-1">{product.description}</p>
                                
                                {product.price != null && (
                                    <p className="card-text h5 text-end fw-bold text-success my-2">
                                        ฿{product.price.toLocaleString('th-TH')}
                                    </p>
                                )}
                                
                                <Link to={`/product/${product.id || product._id}`} className="btn btn-primary mt-auto">
                                    ดูรายละเอียด
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default ProductUserView;

