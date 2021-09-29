import axios from 'axios';
import React, {useState} from 'react';
import '../css/loginStandard.css';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";
import FormikField from './Forms/FormikField';

interface FormValues {
    email: string,
    password: string,
    firstName: string,
    lastName: string
}

const initialValues: FormValues = {
    email: "",
    password: "",
    firstName: "",
    lastName: ""
};

const SignUpSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please provide a valid email address")
        .required("Email is Required"),
    password: Yup.string()
        .min(8, "8 characters is minimum to create a password")
        .required("Please enter a password")
        .matches(
            /((?=.*\w)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[|!"@#$%&_~:./()?^'\\+\-*]))^.*/,
            "Your password must consist of number(s), upper & lowercase letter(s) and a special character"
        ),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Password must match")
        .required("Please confirm your password"),
    firstName: Yup.string()
        .required("First Name is required"),
    lastName: Yup.string()
        .required("Last Name is required")
            
});

const register_url: any = process.env.REACT_APP_URL_REGISTER;

export default function Registration() {

    // const register = (e: any) => {
    //     e.preventDefault();
    //     console.log(email);
    //     console.log(password);
    //     axios.post('http://localhost:4000/register', {
    //         email: email,
    //         password: password
    //     }, {
    //         withCredentials: true
    //     }).then(res => {
    //         if(res.data.status === "success"){
    //             setMyMessage(res.data.message);
    //             console.log(res.data);
    //             // setIsUserOrEmail(false);
    //             // setIsNext(true);
    //         } else {
    //             let errorResponse = res.data.message;
    //             console.log(errorResponse);
    //             setError(errorResponse);
    //         }
    //     });
    
    // }

    const handleSubmit = (values: FormValues): void => {
        axios.post(register_url, {
            email: values.email,
            password: values.password,
            firstName: values.firstName,
            lastName: values.lastName
        }, {
            withCredentials: true
        }).then(res => {
            if(res.data.status === "success"){
                alert("Your account has been successfully created");
                window.location.href = "/registration";
            } else {
                alert(res.data.message)
            }
        });
      };

    return (
        <div>
            <div className="loginBox">
                <h1>Register</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                    validationSchema={SignUpSchema}
                >
                    {({ dirty, isValid }) => {
                        return (
                            <Form>
                                <FormikField name="email" label="Email" required />
                                <FormikField name="firstName" label="First Name" required />
                                <FormikField name="lastName" label="Last Name" required />
                                <FormikField name="password" label="Password" type="password" required />
                                <FormikField name="confirmPassword" label="Confirm Password" type="password" required />
                                <Button variant="contained" color="primary" disabled={!dirty || !isValid} type="submit">
                                    Register
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
                <p>Have an account? <a style={{color:'blue'}} href="/login">login</a></p>
            </div>
        </div>
    )
}
