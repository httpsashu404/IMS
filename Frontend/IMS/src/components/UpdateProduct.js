import React, { useEffect, useState } from 'react'
import { NavLink, useParams, useNavigate } from 'react-router-dom';

export default function InsertProduct() {
    const [productName, setProductName] = useState("");
    const [productPrice, setProductPrice] = useState();
    const [productBarcode, setProductBarcode] = useState();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate("");

    const setName = (e) => {
        setProductName(e.target.value);
    };

    const setPrice = (e) => {
        setProductPrice(e.target.value);
    };

    const setBarcode = (e) => {
        const value = e.target.value.slice(0, 12);
        setProductBarcode(value);
    };

    const { id } = useParams("");

    useEffect(() => {
        const getProduct = async () => {
            try {
                const res = await fetch(`http://localhost:3001/products/${id}`, {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                const data = await res.json();

                if (res.status === 201) {
                    console.log("Data Retrieved.");
                    setProductName(data.ProductName);
                    setProductPrice(data.ProductPrice);
                    setProductBarcode(data.ProductBarcode);
                } else {
                    console.log("Something went wrong. Please try again.");
                }
            } catch (err) {
                console.log(err);
            }
        };

        getProduct();
    }, [id]);

    const updateProduct = async (e) => {
        e.preventDefault();

        if (!productName || !productPrice || !productBarcode) {
            setError("*Please fill in all the required fields.");
            return;
        }

        setLoading(true);
        setError("");

        try {
            const response = await fetch(`http://localhost:3001/updateproduct/${id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ "ProductName": productName, "ProductPrice": productPrice, "ProductBarcode": productBarcode })
            });

            await response.json();

            if (response.status === 201) {
                alert("Data Updated");
                navigate('/');
            }
            else {
                setError("Something went wrong. Please try again.");
            }
        } catch (err) {
            setError("An error occurred. Please try again later.");
            console.log(err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='container bg-light p-3 rounded'>
            <div className="row">
                <div className="col">
                    <form action="" className="form">
                        <h1 className=''>Enter Product Information</h1>
                        <div className="mt-5 col-lg-6 col-md-6 col-12">
                            <label htmlFor="product_name" className="form-label fw-bold">Product Name :</label>
                            <input type="text" onChange={setName} value={productName} className="form-control form-control-sm fs-5" id="product_name" placeholder="Enter Product Name" required autoFocus />
                        </div>
                        <div className="mt-3 col-lg-6 col-md-6 col-12">
                            <label htmlFor="product_price" className="form-label fw-bold">Product Price :</label>
                            <input type="number" onChange={setPrice} value={productPrice} className="form-control form-control-sm fs-5" id="product_price" placeholder="Enter Product Price" required />
                        </div>
                        <div className="mt-3 mb-5 col-lg-6 col-md-6 col-12">
                            <label htmlFor="product_barcode" className="form-label fw-bold">Product Barcode :</label>
                            <input type="number" onChange={setBarcode} value={productBarcode} maxLength={12} className="form-control form-control-sm fs-5" id="product_barcode" placeholder="Enter Product Barcode" required />
                        </div>
                        <div className='d-flex justify-content-center col-lg-6 col-md-6'>
                            <NavLink to="/" className='btn btn-primary me-5'>Cancel</NavLink>
                            <button type="submit" onClick={updateProduct} className="btn btn-primary" disabled={loading}>{loading ? 'Updating...' : 'Update'}</button>
                        </div>
                        <div className="col text-center col-lg-6 ">
                            {error && <div className="text-danger mt-3 fw-bold">{error}</div>}
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
