import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";
import axios from "axios";

const AdminPanel = () => {
  const [dataList, setDataList] = useState(null);
  const columns = [
    {
      field: "id",
      headerName: "S.No.",
      headerClassName: 'super-app-theme--header',
      width: 80,
      sortable: false,
      flex: 0.5,
    },
    {
      field: "date",
      headerName: "Date",
      headerClassName: 'super-app-theme--header',
      width: 300,
      flex: 1.4,
    },
    {
      field: "token",
      headerName: "Token",
      headerClassName: 'super-app-theme--header',
      width: 130,
      sortable: false,
      flex: 1,
    },
    {
      field: "val",
      headerName: "Number",
      headerClassName: 'super-app-theme--header',
      width: 150,
      sortable: false,
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      headerClassName: 'super-app-theme--header',
      sortable: false,
      flex: 1,
    },
  ];

  const getDataList = async () => {
    try {
      const { data: res } = await axios.get("/api/v1/data");
      setDataList(res.data);
    } catch (err) {
      window.alert(err.message);
    }
  };

  useEffect(() => {
    getDataList();
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
          color: "#FFF"
        },
      }}
    >
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
