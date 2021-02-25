import React from "react";
import axios from "axios";
import bcrypt from "bcryptjs";
import { useForm } from "react-hook-form";
import { useCookies } from "react-cookie";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
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
  },
  image: {
    backgroundImage:
      "url(https://v6j.7cc.myftpupload.com/wp-content/uploads/2020/09/Dzharylhach-drone-photo-white-beach.jpg)",
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
    boxSizing: "border-box",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Signup(props) {
  const [cookies, setCookie] = useCookies(["name", "id"]);
  const { register, handleSubmit, errors } = useForm();

  const classes = useStyles();

  const onSubmit = (inputData) => {
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    let dateTime = date + " " + time;
    let createdAtTS = dateTime;
    //Line Above: Local Date "Created At" Timestamp

    console.log(
      "SIGNUP INPUT DATA ON SUBMIT:",
      inputData,
      "CREATED AT:",
      createdAtTS
      //Currently travelStyle is hardcoded & set to foodie
    );

    let hashedPassword = bcrypt.hashSync(inputData.password, 12);

    // axios.post("/api/users", {
    //   email: inputData.email,
    //   password: hashedPassword,
    //   firstName: inputData.firstname,
    //   lastName: inputData.lastname,
    //   travelStyle: "Foodie",
    //   // travelStyle: inputData.travelstyle,
    //   createdAt: createdAtTS,
    // });

    // Promise.all([axios.get("/api/users")])
    //   .then((all) => {
    //     let email = inputData.email;
    //     const users = all[0].data;
    //     const filteredUser = users.filter(
    //       (filteredUser) => filteredUser.email === email
    //     )[0];
    //     setCookie("name", filteredUser.first_name);
    //     setCookie("id", filteredUser.id);
    //     window.location = "/create"
    //     return;
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });
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
            Signup
          </Typography>
          <form
            className={classes.form}
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              name="firstname"
              placeholder="First Name"
              className={classes.input}
              ref={register}
            />
            <input
              name="lastname"
              placeholder="Last Name"
              className={classes.input}
              ref={register}
            />
            <input
              name="email"
              placeholder="Email"
              className={classes.input}
              ref={register}
            />
            <input
              name="password"
              placeholder="Password"
              type="password"
              className={classes.input}
              ref={register}
            />

            <label for="travelInterest">Choose a car:</label>
            <select name="travelInterest" id="cars">
              <option name="travelInterest" value="volvo">Volvo</option>
              <option name="travelInterest" value="saab">Saab</option>
              <option name="travelInterest" value="opel">Opel</option>
              <option name="travelInterest" value="audi">Audi</option>
            </select>

            {/* <FormControl className={classes.formControl}>
          <InputLabel>Select Your Travel Interest</InputLabel>
          <Select
            className={classes.dropdown}          
          >
            {['Foodie', 'Romantic', 'Historic', 'Glamour', 'Alternative'].map((category) => (
                  <MenuItem key={category} value={category} name="travelStyle"> 
                    {category}
                  </MenuItem>
                ))}
          </Select>
        </FormControl> */}

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
              Signup
            </Button>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
