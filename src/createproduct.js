import axios from "axios";
import { Field, Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useFormik } from "formik";

function Createproduct(props) {
  const history = useHistory();
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [manufactureDate, setManufactureDate] = useState("");
  const [expirDate, setExpirDate] = useState("");
  const [productType, setProductType] = useState("");

  const [isLoading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      productName: "",
      price: "",
      manufactureDate: "",
      expirDate: "",
      productType: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.productName) {
        errors.productName = "Required";
      }else if(values.productName.length>25)
      {
        errors.productName = "Please enter Product Name with in 25 character";
      }
      if (!values.price) {
        errors.price = "Required";
      }else if(!Number(values.price)){
        errors.price = "Please enter the price in Numbers";
      }
      if (!values.manufactureDate) {
        errors.manufactureDate = "Required";
      }
      if (!values.expirDate) {
        errors.expirDate = "Required";
      }
      if (!values.productType) {
        errors.productType = "Required";
      }else if(Number(values.productType))
      {
        errors.productType = "Please enter the Product type in Alphabets";
      }
      return errors;
    },
    onSubmit:async(values)=>{
      try {
        setLoading(true);
        await axios.post("https://60f1550c38ecdf0017b0fbac.mockapi.io/Product", {
          productName:values.productName,
          price:values.price,
          manufactureDate:values.manufactureDate,
          expirDate:values.expirDate,
          productType:values.productType
        });
        setLoading(false);
        history.push("/products");
      } catch (error) {
        console.log("Error");
        setLoading(false);
      }
    }
  });

  return (
    <div>
      <div class="d-sm-flex align-items-center justify-content-between mb-4">
        <h1 class="h3 mb-0 text-gray-800">Create product</h1>
      </div>
      <div className="container">
        <form onSubmit={formik.handleSubmit}>
          <div className="row">
            <div className="col-lg-6">
              <label>Product Name</label>
              <input
                type="text"
                name="productName"
                value={formik.values.productName}
                onChange={formik.handleChange}
                className="form-control"
              />
              {formik.errors.productName ? (
                <span style={{ color: "red" }}>{formik.errors.productName}</span>
              ) : null}
              <br />
            </div>
            <div className="col-lg-6">
              <label>Price</label>
              <input
                type="text"
                name="price"
                value={formik.values.price}
                onChange={formik.handleChange}
                className="form-control"
              />
              {formik.errors.price ? (
                <span style={{ color: "red" }}>{formik.errors.price}</span>
              ) : null}
              <br />
            </div>
            <div className="col-lg-6">
              <label>Manufature Date</label>
              <input
                type="date"
                name="manufactureDate"
                value={formik.values.manufactureDate}
                onChange={formik.handleChange}
                className="form-control"
              />
              {formik.errors.manufactureDate ? (
                <span style={{ color: "red" }}>Required</span>
              ) : null}
              <br />
            </div>
            <div className="col-lg-6">
              <label>Expiry Date</label>
              <input
                type="date"
                name="expirDate"
                value={formik.values.expirDate}
                onChange={formik.handleChange}
                className="form-control"
              />
              {formik.errors.expirDate ? (
                <span style={{ color: "red" }}>Required</span>
              ) : null}
              <br />
            </div>
            <div className="col-lg-6">
              <label>Product Type</label>
              <input
                type="text"
                name="productType"
                value={formik.values.productType}
                onChange={formik.handleChange}
                className="form-control"
              />
              {formik.errors.productType ? (
                <span style={{ color: "red" }}>{formik.errors.productType}</span>
              ) : null}
              <br />
            </div>
            <div className="col-lg-12 mt-3">
              <input
                type="submit"
                value="Submit"
                className="btn btn-primary"
                disabled={isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Createproduct;
