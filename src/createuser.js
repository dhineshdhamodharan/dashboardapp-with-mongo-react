import React from 'react'
import react, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Formik } from 'formik';
import { useFormik } from "formik";

function Createuser(props) {
  const history=useHistory()
    const [userName,setuserName]=useState("");
    const [position,setPosition]=useState("");
    const [office,setOffice]=useState("");
    const [age,setAge]=useState("");
    const [registernumber,setregisterNumber]=useState("");
    const [salary,setSalary]=useState("");

    const [isLoading,setLoading]=useState(false)

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
        }else if(values.userName.length>15)
        {
          errors.userName = "Please enter Product Name with in 15 character";
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
          await axios.post("https://60f1550c38ecdf0017b0fbac.mockapi.io/user",{
          userName:values.userName,
          position:values.position,
          office:values.office,
          age:values.age,
          registernumber:values.registernumber,
          salary:values.salary
        }); 
          setLoading(false);
          history.push("/Users")
        } catch (error) {
          console.log("Error");
          setLoading(false);
        }
      }
    });
    return (
        <div>
             <div class="d-sm-flex align-items-center justify-content-between mb-4">
                        <h1 class="h3 mb-0 text-gray-800">Create user</h1>
                    </div>
              <div className="container">
                  <form onSubmit={formik.handleSubmit}>
                      <div className="row">
                          <div className="col-lg-6">
                            <label>Username</label>
                          <input type="text" name="userName" value={formik.values.userName} onChange={formik.handleChange} className="form-control"/>
                          {formik.errors.userName ? (<span style={{ color: "red" }}>{formik.errors.userName}</span>) : null}
                          <br/>
                          </div>
                          <div className="col-lg-6">
                            <label>Position</label>
                          <input type="text" name="position" value={formik.values.position} onChange={formik.handleChange} className="form-control"/>
                          {formik.errors.position ? (<span style={{ color: "red" }}>{formik.errors.position}</span>) : null}
                          <br/>
                          </div>
                          <div className="col-lg-6">
                            <label>Office</label>
                          <input type="text" name="office" value={formik.values.office} onChange={formik.handleChange} className="form-control"/>
                          {formik.errors.office ? (<span style={{ color: "red" }}>{formik.errors.userName}</span>) : null}
                          <br/>
                          </div>
                          <div className="col-lg-6">
                            <label>Age</label>
                          <input type="text" name="age" value={formik.values.age} onChange={formik.handleChange} className="form-control"/>
                          {formik.errors.age ? (<span style={{ color: "red" }}>{formik.errors.age}</span>) : null}
                          <br/>
                          </div>
                          <div className="col-lg-6">
                            <label>Register Number</label>
                          <input type="text" name="registernumber" value={formik.registernumber} onChange={formik.handleChange} className="form-control"/>
                          {formik.errors.registernumber ? (<span style={{ color: "red" }}>{formik.errors.registernumber}</span>) : null}
                          <br/>
                          </div>
                          <div className="col-lg-6">
                            <label>Salary</label>
                          <input type="text" name="salary" value={formik.values.salary} onChange={formik.handleChange} className="form-control"/>
                          {formik.errors.salary ? (<span style={{ color: "red" }}>{formik.errors.salary}</span>) : null}
                          <br/>
                          </div>
                          <div className="col-lg-12 mt-3">     
                          <input type="submit" value="Submit" className="btn btn-primary"/>
                          </div>
                      </div>
                  </form>
                  </div>      
        </div>
    )
}

export default Createuser


