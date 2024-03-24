import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import {
  Box,
  Button,
  Divider,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import Swal from "sweetalert2";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Autocomplete from "@mui/material/Autocomplete";
import { Link, useNavigate, useParams } from "react-router-dom";




export default function Dashboard() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [rows, setrows] = useState([]);
  const navigate = useNavigate();
  const { uuid } = useParams();



  useEffect(() => {
    fetch("http://127.0.0.1:8000/blogs/api/blogs/", {
      method : "GET",
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem('token')}`
      }
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.success) {
          return setrows(resp.data);
        } else {
          navigate('/login')
        }
      });
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };


  const Deleteuser = (id) => {
    Swal.fire({
      title: "Are You Sure ?",
      text: "you won't be able to revart this.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "blue",
      cancelButtonColor: "red",
      confirmButtonText: "yes, delete it !",
    }).then((result) => {
      if (result.value) {
        deleteApi(id);
      }
    });
  };

  const deleteApi = async (uuid) => {
    const res = await fetch(
      `http://127.0.0.1:8000/blogs/api/blogs/${uuid}/`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    if (res.ok) {
      const updatedRows = rows.filter((row) => row.uuid !== uuid);
      setrows(updatedRows);
      Swal.fire("Deleted", "Your file has been deleted", "success");
    } else {
      Swal.fire("Error", "Failed to delete", "error");
    }
  };


  const filterData = (v) => {
    if (v) {
      setrows([v]);
    } else {
      setrows();
    }
  };


  return (
    <>

    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <Typography
        gutterBottom
        variant="h5"
        component="div"
        sx={{ padding: "25px" }}
      >
        Dashboard
      </Typography>
      <Divider />
      <Box height={10} />
      <Stack direction="row" spacing={2} className="my-2 by-2">
        <Autocomplete
          disablePortal
          style={{marginLeft : "27px"}}
          id="combo-box-demo"
          options={rows}
          sx={{ width: 300}}
          onChange={(e, v) => filterData(v)}
          getOptionLabel={(rows) => rows.title || ""}
          renderInput={(params) => (
            <TextField {...params} size="small" label="search products" />
          )}
        />
        <Typography
          varient="h5"
          component="div"
          sx={{ flexGrow: 2 }}
        ></Typography>
        <Link to = '/write'><Button varient="contained" endIcon={<AddCircleIcon />} >
          Add
        </Button></Link>
      </Stack>
      <Box height={10} />
      <TableContainer sx={{ maxHeight: 300 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="left">
                <h4 style={{marginLeft : "40px"}}>Title</h4>
              </TableCell>
              <TableCell align="left">
                <h4 style={{marginLeft : "90px"}}>Descriptions</h4>
              </TableCell>
              <TableCell align="left">
                <h4 style={{marginLeft : "99px"}}>Image</h4>
              </TableCell>
              <TableCell align="left">
                <h4>Actions</h4>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.uuid}>
                  <TableCell key={row.uuid} align="left">
                    <p style={{marginLeft : "40px"}}>{row.title}</p>
                  </TableCell>
                  <TableCell key={row.uuid} align="left">
                    <p style={{marginLeft : "90px"}}>{row.descriptions}</p>
                  </TableCell>
                  <TableCell key={row.uuid} align="left">
                    <img
                      src={`http://127.0.0.1:8000/${row.image}`}
                      alt=""
                      style={{ height: "18%", width: "18%" , marginLeft : "80px"}}
                    />
                  </TableCell>
                  <TableCell key={row.uuid} align="left">
                    <Stack spacing={2} direction="row"> 
                      <DeleteIcon
                        style={{
                          fontSize: "20px",
                          color: "red",
                          cursor: "pointer",
                          marginLeft : "30px"
                        }}
                        length = {3}
                        classname="cursor-poiner"
                        onClick={() => {
                          Deleteuser(row.uuid);
                        }}
                      ></DeleteIcon>
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
    </>
  );
}
