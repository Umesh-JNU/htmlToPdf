import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Container,
  Input,
  InputAdornment,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const loginSubmit = (e) => {
    e.preventDefault();

    const config = { headers: { "Content-Type": "application/json" } };
    axios
      .post(
        "/api/v2/login",
        { email: loginEmail, password: loginPassword },
        config
      )
      .then((res) => {
        let link = `/actionpage/${res.data.user._id}`;
        if (res.data.user.role === "admin") link += `/?role=admin`;
        navigate(link);
      })
      .catch((err) => {
        window.alert(err);
      });
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  // const [user, setUser] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  // });
  // const { name, email, password } = user;

  // const registerSubmit = async (e) => {
  //   e.preventDefault();

  //   const myForm = new FormData();
  //   myForm.set("name", name);
  //   myForm.set("email", email);
  //   myForm.set("password", password);

  //   try {
  //     const config = { headers: { "Content-Type": "application/json" } };
  //     const { data } = await axios.post("/api/v2/register", myForm, config);
  //     console.log(data);
  //     navigate("/actionpage");
  //   } catch (error) {
  //     return window.alert(error.message);
  //   }
  // };

  // const registerDataChange = (e) => {
  //   setUser({ ...user, [e.target.name]: e.target.value });
  // };
  return (
    <Container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "100vh",
        backgroundColor: "#0A1929",
      }}
    >
      <Box
        component="form"
        sx={{
          "& .MuiTextField-root": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          border: "2px solid #ffffff",
          borderRadius: "10px",
          padding: "2rem 3rem",
          backgroundColor: "#ffffffd1",
        }}
        noValidate
        autoComplete="on"
        // onSubmit={registerSubmit}
        onSubmit={loginSubmit}
      >
        <div>
          <Typography
            sx={{ marginBottom: "10px", color: "#2d87db", fontSize: "2rem" }}
          >
            Login
          </Typography>
        </div>
        {/* <div>
          <TextField
            name="name"
            id="outlined-name-input"
            label="Name"
            placeholder="Name"
            onChange={registerDataChange}
          />
        </div> */}
        <div>
          <TextField
            name="email"
            id="outlined-email-input"
            label="Email"
            type="email"
            placeholder="abc@gmail.com"
            // onChange={registerDataChange}
            // value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>
        <div>
          <TextField
            name="password"
            label="Password"
            id="outlined-password-input"
            // onChange={registerDataChange}
            onChange={(e) => setLoginPassword(e.target.value)}
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Password"
          />
        </div>
        <div>
          <Input
            type="submit"
            value="Submit"
            variant="outlined"
          />
        </div>
      </Box>
    </Container>
  );
};

export default Home;
