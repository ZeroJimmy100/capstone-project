import React, {useState} from 'react'
import axios from 'axios';
import '../css/loginStandard.css';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import Button from "@material-ui/core/Button";
import FormikField from './Forms/FormikField';

interface FormValues {
    email: string,
    password: string
}

const initialValues: FormValues = {
    email: "",
    password: ""
};

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Please provide a valid email address")
        .required("Email is Required"),
    password: Yup.string()
        .required("Please enter a password")
});

const login_url: any = process.env.REACT_APP_URL_LOGIN;
const context_url: any = process.env.REACT_APP_URL_USER;

export default function Login() {
    // const [email, setEmail] = useState<string>("");
    // const [password, setPassword] = useState<string>("");
    // const [isUserOrEmail, setIsUserOrEmail] = useState<boolean>(false);
    // const [isNext, setIsNext] = useState<boolean>(true);

    const login = (values: FormValues): void => {
        axios.post(login_url, {
            email: values.email,
            password: values.password
        }, {
            withCredentials: true
        }).then(res => {
            console.log(res.data);
            if(res.data.message === "Successfully Authenicated"){
                window.location.href = "/";
            }else{
                alert(res.data.message);
            }
        });
    }

    const getUser = () => {
        axios.get(context_url, {
            withCredentials: true
        }).then(res => {
            console.log(res.data);
        })
    }

    return (
        <div style={{minHeight: '100%'}}>
            <div className="loginBox">
                <h1>Login</h1>
                <Formik
                    initialValues={initialValues}
                    onSubmit={login}
                    validationSchema={LoginSchema}
                >
                    {({ dirty, isValid }) => {
                        return (
                            <Form>
                                <FormikField name="email" label="Email" required />
                                <FormikField name="password" label="Password" type="password" required />
                                <Button variant="contained" color="primary" disabled={!dirty || !isValid} type="submit">
                                    Login
                                </Button>
                            </Form>
                        );
                    }}
                </Formik>
                <p>Don't have an account? <a style={{color:'blue'}} href="/registration">sign up</a></p>
            </div>
        </div>
    )
}
