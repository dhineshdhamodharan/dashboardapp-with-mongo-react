import React, { useEffect } from 'react'
import react, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from "axios";
import { Formik, useFormik } from 'formik';
function Edituser(props) {
  const history=useHistory()
  const [isLoading,setLoading]=useState(false)

  useEffect(async()=>{
    try {
      let user =await axios.get(`https://60f1550c38ecdf0017b0fbac.mockapi.io/user/${props.match.params.id}`);
      formik.setFieldValue("userName",user.data.userName) 
      formik.setFieldValue("position",user.data.position) 
      formik.setFieldValue("office",user.data.office) 
      formik.setFieldValue("age",user.data.age) 
      formik.setFieldValue("registernumber",user.data.registernumber)
      formik.setFieldValue("salary",user.data.salary)
    } catch (error) {
      console.log(error);
    } 
  }, [])

  const formik=useFormik({
    initialValues: {
      userName: "",
      position: "",
      office: "",
      age: "",
      registernumber:"",
      salary: "",
    },
    validate: (values) => {
      const errors = {};
      if (!values.userName) {
        errors.userName = "Required";
      }else if(values.userName.length>25)
      {
        errors.userName = "Please enter Product Name with in 25 character";
      }
      if (!values.position) {
        errors.position = "Required";
      }else if(Number(values.position)){
        errors.position = "Please enter the position in Alphabets";
      }
      if (!values.office) {
        errors.office = "Required";
      }
      if (!values.age) {
        errors.age = "Required";
      }
      if (!values.registernumber) {
        errors.registernumber = "Required";
      }
      if(!values.salary){
        errors.salary="Required"
      }
      return errors;
    },
    onSubmit:async(values)=>{
    try {
      setLoading(true);
      await axios.put(`https://60f1550c38ecdf0017b0fbac.mockapi.io/user/${props.match.params.id}`,
      {  
        userName:values.userName,
        position:values.position,
        office:values.office,
        age:values.age,
        registernumber:values.registernumber,
        salary:values.salary
    }) 
      setLoading(false);
      history.push("/users")
    } catch (error) {
      console.log("Error");
      setLoading(false);
    }
  }
  });

  return (
  <div>
    <div class="d-sm-flex align-items-center justify-content-between mb-4">
      <h1 class="h3 mb-0 text-gray-800">Edit product</h1>
    </div>
    <div className="container">
      <form onSubmit={formik.handleSubmit}>
        <div className="row">
          <div className="col-lg-6">
            <label>User Name</label>
            <input
              type="text"
              name="username"
              value={formik.values.userName}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.userName ? (
              <span style={{ color: "red" }}>{formik.errors.userName}</span>
            ) : null}
            <br />
          </div>
          <div className="col-lg-6">
            <label>Position</label>
            <input
              type="text"
              name="position"
              value={formik.values.position}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.position ? (
              <span style={{ color: "red" }}>{formik.errors.position}</span>
            ) : null}
            <br />
          </div>
          <div className="col-lg-6">
            <label>Office</label>
            <input
              type="text"
              name="office"
              value={formik.values.office}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.office ? (
              <span style={{ color: "red" }}>Required</span>
            ) : null}
            <br />
          </div>
          <div className="col-lg-6">
            <label>Age</label>
            <input
              type="text"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.age ? (
              <span style={{ color: "red" }}>Required</span>
            ) : null}
            <br />
          </div>
          <div className="col-lg-6">
            <label>Register Number</label>
            <input
              type="text"
              name="registernumber"
              value={formik.values.registernumber}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.registernumber ? (
              <span style={{ color: "red" }}>{formik.errors.registernumber}</span>
            ) : null}
            <br />
          </div>
          <div className="col-lg-6">
            <label>Salary</label>
            <input
              type="text"
              name="salary"
              value={formik.values.salary}
              onChange={formik.handleChange}
              className="form-control"
            />
            {formik.errors.salary ? (
              <span style={{ color: "red" }}>{formik.errors.salary}</span>
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
export default Edituser
