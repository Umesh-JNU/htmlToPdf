import React, { useState } from "react";
import {
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Container,
  TextField,
  Button,
  Divider,
  Input,
} from "@mui/material";
import { Add, Logout, PictureAsPdf } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import AdminPanel from "./AdminPanel";
import pdfService from "./pdf/PDFServices";

const nameList = ["Rahul", "Aditya", "Shivam", "Praag", "Somya"];
const downloadPDF = async () => {
  try {
    return pdfService.downloadPDF().then((res) => {
      const filename = "download.pdf";
      const blobObj = new Blob([res.data], { type: "application/pdf" });
      const anchorlink = document.createElement("a");
      anchorlink.href = window.URL.createObjectURL(blobObj)
      anchorlink.setAttribute("download", filename);
      anchorlink.click();
    });
  } catch (err) {
    window.alert(err);
  }
};
const ActionPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const role = searchParams.get("role");

  const [name, setName] = useState("");
  const [rows, setRows] = useState([]);
  const onAddHandle = () => {
    const newRows = [...rows, []];
    setRows(newRows);
  };

  const onChangeHandle = (curRow, index) => {
    const allRows = [...rows];
    allRows[index] = curRow.target.value;
    setRows(allRows);
  };
  // console.log(rows);

  const onSubmitHandle = (e) => {
    e.preventDefault();

    const config = { headers: { "Content-Type": "application/json" } };

    try {
      rows.forEach(async (rowVal) => {
        await axios.post(
          "/api/v2/submit",
          { number: parseInt(rowVal), name, id },
          config
        );
      });

      setName("");
      setRows([]);
      window.alert("Successfully Inserted..");
    } catch (err) {
      window.alert(err);
    }
  };

  const onLogoutHandle = async (e) => {
    try {
      await axios.get("/api/v2/logout");
      navigate("/");
    } catch (error) {
      window.alert(error.message);
    }
  };

  return (
    <>
      {role === "admin" ? (
        <Button
          sx={{ position: "absolute", top: "1rem", left: "1rem" }}
          variant="contained"
          endIcon={<PictureAsPdf />}
          onClick={downloadPDF}
        >
          Download PDF
        </Button>
      ) : (
        <></>
      )}
      <Button
        sx={{ position: "absolute", top: "1rem", right: "1rem" }}
        variant="contained"
        endIcon={<Logout />}
        onClick={onLogoutHandle}
      >
        Logout
      </Button>

      <Container
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          minHeight: "100vh",
          backgroundColor: "#0A1929",
        }}
      >
        {role === "admin" ? (
          <AdminPanel />
        ) : (
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "40ch" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
              border: "2px solid #ffffff",
              borderRadius: "10px",
              padding: "2rem 3rem",
              backgroundColor: "#001e3c",
            }}
            noValidate
            onSubmit={onSubmitHandle}
          >
            <div>
              <FormControl variant="outlined">
                <InputLabel id="name-label">Select Name</InputLabel>
                <Select
                  sx={{ minWidth: "20ch" }}
                  labelId="name-label"
                  id="name-select-label"
                  value={name}
                  label="Select Name"
                  onChange={(e) => setName(e.target.value)}
                >
                  {nameList.map((n, i) => (
                    <MenuItem value={n} key={i}>
                      {n}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            {rows.map((rowVal, i) => {
              return (
                <div key={i}>
                  <TextField
                    hiddenLabel
                    placeholder="Write Number"
                    id={`filled-hidden-label-normal-${i}`}
                    variant="filled"
                    value={rowVal}
                    onChange={(e) => onChangeHandle(e, i)}
                  />
                </div>
              );
            })}
            <div>
              <Button
                variant="contained"
                endIcon={<Add />}
                onClick={() => onAddHandle()}
              >
                List More Number
              </Button>
            </div>
            {rows.length ? (
              <>
                <Divider variant="fullWidth" />
                <div>
                  <Input
                    type="submit"
                    value="Submit"
                    variant="outlined"
                    sx={{ color: "#FFF" }}
                  />
                </div>
              </>
            ) : (
              <></>
            )}
          </Box>
        )}
      </Container>
    </>
  );
};

export default ActionPage;
