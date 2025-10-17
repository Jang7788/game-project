import { useContext, useState, useRef } from "react"; 
import { UserContext } from "./UserContext";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom"; 

function AddProduct() {
  const { user, loading } = useContext(UserContext); 
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [group, setGroup] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [stock, setStock] = useState(''); 
  const [price, setPrice] = useState('');
  const fileInputRef = useRef(null); 
  const navigate = useNavigate(); 

  const handleAddProduct = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", name);
    formData.append("group", group);
    formData.append("description", description);
    formData.append("stock", stock);
    formData.append("price", price);
    if (image) formData.append("image", image);

    try {
      const res = await fetch("https://server-qobj.onrender.com/api/products/addproduct", {
        method: "POST",
        body: formData,
        credentials: "include",
      });

      if (res.ok) {
        alert("เพิ่มสินค้าเรียบร้อย!");
        setId("");
        setName("");
        setGroup("");
        setDescription("");
        setImage(null);
        setStock(''); 
        if (fileInputRef.current) {
          fileInputRef.current.value = null; 
        }
        navigate("/product"); 
      } else {
        const data = await res.json();
        alert("เกิดข้อผิดพลาด: " + (data.message || "Unknown error"));
      }
    } catch (err) {
      console.error(err);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อ: " + err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  } else if (user.role !== 'admin') {
    return <div>ไม่มีสิทธิเข้าถึง</div>
  }
  
  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Add Product</h2>
      <form onSubmit={handleAddProduct}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">ID</label>
          <input
            type="text"
            id="id"
            className="form-control"
            value={id}
            onChange={(e) => setId(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name Product</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="group" className="form-label">Group</label>
          <input
            type="text"
            id="group"
            className="form-control"
            value={group}
            onChange={(e) => setGroup(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="image" className="form-label">Product Image</label>
          <input
            type="file"
            id="image"
            className="form-control"
            ref={fileInputRef} 
            onChange={(e) => setImage(e.target.files[0])}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Stock</label>
          <input
            type="number"
            id="stock"
            className="form-control"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
            required
            min="0"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="stock" className="form-label">Price</label>
          <input
            type="number"
            id="price"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            min="0"
          />
        </div>

        <button type="submit" className="btn btn-primary">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
