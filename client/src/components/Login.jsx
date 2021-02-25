import React, { useState } from "react";
import axios from "axios";
import bcrypt from 'bcryptjs';
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { da } from "date-fns/locale";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        Fernvee, Inc. All rights reserved
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    margin: "-15px 0 0 0",
  },
  image: {
    backgroundImage:
      "url(https://images.unsplash.com/photo-1585224489225-03ca294de508?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=3634&q=80)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input: {
    width: "100%",
    padding: "12px 20px",
    margin: "8px 0",
    boxSizing: "border-box"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Login(props) {
  const [cookies, setCookie] = useCookies(["name", "id"]);
  const { register, handleSubmit } = useForm();
  const [email, setEmail] = useState("");

  const classes = useStyles();

  const onSubmit = (inputData) => {
    console.log("LOGIN INPUT DATA ON SUBMIT:", inputData);
    let email = inputData.email;
    let password = inputData.password;
    Promise.all([axios.get("/api/users")])
      .then((all) => {
        const users = all[0].data;
        const filteredUser = users.filter(
          (filteredUser) => filteredUser.email === email
        )[0];
        if (!filteredUser) {
          console.log("Wrong email");
          return;
        }
        if (bcrypt.compare(filteredUser.password, password)) {
          console.log(filteredUser, "in");
          setCookie("name", filteredUser.first_name);
          setCookie("id", filteredUser.id);
          window.location = "/"
          return filteredUser;
        } else if (filteredUser && filteredUser.password !== password) {
          console.log("Wrong password");
          return null;
        }
        console.log("Wrong");
        return null;
      })
      .catch(function (error) {
        console.log(error);
      })
  };

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <input name="email" placeholder="Email" className={classes.input} ref={register} />
            <input name="password" placeholder="Password" type="password" className={classes.input} ref={register} />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              LogIn
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
