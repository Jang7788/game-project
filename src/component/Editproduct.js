import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Editproduct() {
    const [productData, setProductData] = useState({
        name: "",
        group: "",
        image: "",
        description: "",
        stock: "",
        price: ""
    });
    const [loading, setLoading] = useState(true);
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(`http://localhost:3600/api/products/getproduct/${id}`);
                
                if (!response.ok) {
                    throw new Error("Product not found");
                }
                
                const dataProduct = await response.json();
                
                setProductData({
                    name: dataProduct.name || '',
                    group: dataProduct.group || '',
                    image: dataProduct.image || '',
                    description: dataProduct.description || '',
                    stock: dataProduct.stock || '',
                    price: dataProduct.price || ''
                });

            } catch (err) {
                console.log(err);
                alert(err.message);
                navigate('/product'); 
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id, navigate]); 

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`http://localhost:3600/api/products/editproduct/`+id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(productData) 
            });

            if (response.ok) {
                alert("บันทึกข้อมูลสำเร็จ!");
                navigate('/product');
            } else {
                const errorData = await response.json();
                alert(`เกิดข้อผิดพลาด: ${errorData.message}`);
            }
        } catch (err) {
            console.error("Failed to update product:", err);
            alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
        }
    };

    if (loading) {
        return <div>กำลังโหลดข้อมูลสินค้า...</div>;
    }

    return (
        <div className="container mt-5" style={{ maxWidth: "600px" }}>
            <h2>Edit Product ID: {id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" id="name" name="name" className="form-control" value={productData.name} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="group" className="form-label">Group</label>
                    <input type="text" id="group" name="group" className="form-control" value={productData.group} onChange={handleChange} />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea 
                        id="description" 
                        name="description" 
                        className="form-control" 
                        value={productData.description} 
                        onChange={handleChange} 
                    />
                </div>

                <div className="mb-3">
                    <label htmlFor="stock" className="form-label">Stock</label>
                    <input type="number" id="stock" name="stock" className="form-control" value={productData.stock} onChange={handleChange} />
                </div>
                
                <div className="mb-3">
                    <label htmlFor="price" className="form-label">Price</label>
                    <input type="number" id="price" name="price" className="form-control" value={productData.price} onChange={handleChange} />
                </div>
                
                <button type="submit" className="btn btn-primary">Save Changes</button>
            </form>
        </div>
    );
}

export default Editproduct;

