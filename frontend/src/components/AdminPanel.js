import React, { useEffect, useState } from "react";
import { DataGrid, GridFilterAltIcon } from "@mui/x-data-grid";
import {
  TextField,
  Box,
  Typography,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import axios from "axios";

const AdminPanel = () => {
  const [dataList, setDataList] = useState(null);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [open, setOpen] = useState(false);

  const filterHandler = () => {
    open ? setOpen(false) : setOpen(true);
  };
  const submitFilter = (e) => {
    e.preventDefault();
    
    getDataList(`/api/v2/data/?date[gte]=${fromDate}&date[lte]=${toDate}`);
    setOpen(false);
  };

  const columns = [
    {
      field: "id",
      headerName: "S.No.",
      headerClassName: "super-app-theme--header",
      width: 80,
      sortable: false,
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Date",
      headerClassName: "super-app-theme--header",
      sortable: false,
      renderHeader: () => {
        return (
          <>
            Date
            <GridFilterAltIcon
              position="end"
              onClick={filterHandler}
              sx={{ cursor: "pointer" }}
            />
          </>
        );
      },
      width: 300,
      flex: 1.4,
    },
    {
      field: "token",
      headerName: "Token",
      headerClassName: "super-app-theme--header",
      width: 130,
      sortable: false,
      flex: 1,
    },
    {
      field: "val",
      headerName: "Number",
      headerClassName: "super-app-theme--header",
      width: 150,
      sortable: false,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: "super-app-theme--header",
      sortable: false,
      flex: 1,
    },
  ];

  const getDataList = async (url) => {
    try {
      const { data: res } = await axios.get(url);
      console.log(res.data);
      setDataList(res.data);
    } catch (err) {
      window.alert(err.message);
    }
  };

  useEffect(() => {
    getDataList("/api/v2/data");
  }, []);

  const rows = [];
  dataList &&
    dataList.forEach((item, i) =>
      rows.push({
        id: i + 1,
        token: item.token,
        val: item.number,
        name: item.name,
        date: item.createdAt,
      })
    );

  return (
    <Box
      sx={{
        width: "100%",
        "& .super-app-theme--header": {
          backgroundColor: "rgba(255, 7, 0, 0.55)",
          color: "#FFF",
        },
      }}
    >
      <Dialog
        aria-labelledby="simple-dialog-title"
        open={open}
        onClose={filterHandler}
      >
        <DialogTitle>
          <Typography>Filter Date</Typography>
        </DialogTitle>
        <DialogContent
          sx={{ padding: "1rem !important", display: "flex", gap: "1rem" }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="From Date"
              inputFormat="YYYY-MM-DD"
              value={fromDate}
              onChange={(val) => setFromDate(val)}
              renderInput={(params) => <TextField {...params} />}
            />
            <DesktopDatePicker
              sx={{ color: "black !important" }}
              label="To Date"
              inputFormat="YYYY-MM-DD"
              value={toDate}
              onChange={(val) => setToDate(val)}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={filterHandler} color="secondary">
            Cancel
          </Button>
          <Button onClick={submitFilter} color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Typography
        sx={{
          marginBottom: "10px",
          color: "#2d87db",
          fontSize: "2rem",
          textAlign: "center",
        }}
      >
        Data List
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        disableSelectionOnClick
        disableColumnMenu
        hideFooter
        autoHeight
        sx={{
          "& .MuiDataGrid-cell": {
            color: "#fff",
          },
        }}
      />
    </Box>
  );
};

export default AdminPanel;
