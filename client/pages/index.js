import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import {withStyles} from '@material-ui/core';
import Layout from '../components/layout/layout';
import styles from './../static/styles/index';
import fetchApi from './../helper/fetchApi';
import fetch from 'isomorphic-unfetch';
import { API_DOMAIN, HTTP_METHOD_POST, API_SIGN_IN } from './../config/config';
import FormHelperText from '@material-ui/core/FormHelperText';
import Router from 'next/router';

class Index extends Component{

    static getInitialProps({req, res}){
        var data = {};
        return data;
    }

    constructor(props){
        super(props);
        this.state = {
            email: null,
            password: null,
            signInRememberMe: false,
            email_error_text:'',
            email_erro:false,
            password_error:false,
            password_error_text:''
        }   
        this.handleSignIn = this.handleSignIn.bind(this); 
        //this.handleChange = this.handleChange.bind(this);
        this.handleCheckBox = this.handleCheckBox.bind(this);
        
    }

    async handleSignIn(event){
        event.preventDefault();
        console.log("Sign In Button Clicked!!");
        console.log(this.state);
        var email = this.state.email;
        var password = this.state.password;
        if(email!="" && password!=""){
            var apiUrl = API_DOMAIN+API_SIGN_IN;
            var obj = {email: email, password:password}
            var result = await fetchApi.fetchApiClientSide(apiUrl, HTTP_METHOD_POST, obj);
            if(result.status != 200){
                this.setState({
                    email_error_text: "Wrong credentials" , 
                    email_error:true,
                    password_error_text: "Wrong credentials" , 
                    password_error:true
                });    
            }
            else{
                var data = result.data;
                Router.push('/profile/'+data._id);
            }
        }
    }

    handleChange(name, event) {
        this.setState({ 
            [name]: event.target.value, 
            email_error:false, 
            password_error:false,
            email_error_text:'',
            password_error_text:''
         })
    }

    handleCheckBox = (e) => {
        this.setState({ signInRememberMe: !this.state.signInRememberMe });
    };

    render(){
        const {classes} = this.props;

        return (
            <Layout>
            <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                Sign in
                </Typography>
                <form className={classes.form} noValidate>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                    onChange={this.handleChange.bind(this, "email")}
                    error={this.state.email_error}
                />
                <FormHelperText id="component-error-text">{this.state.email_error_text}</FormHelperText>

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    helperText={this.state.password_error_text}
                    onChange={this.handleChange.bind(this, "password")}
                    error={this.state.password_error}
                />
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                    onChange = {this.handleCheckBox}
                />
                <Button
                    // type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                    onClick={this.handleSignIn}
                >
                    Sign In
                </Button>
                <Grid container>
                    <Grid item xs>
                    <Link href="#" variant="body2">
                        Forgot password?
                    </Link>
                    </Grid>
                    <Grid item>
                    <Link href="/signup" variant="body2">
                        {"Don't have an account? Sign Up"}
                    </Link>
                    </Grid>
                </Grid>
                </form>
            </div>
            </Container>
            </Layout>
        );
    }
}

export default  withStyles(styles)(Index);