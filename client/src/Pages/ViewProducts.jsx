import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
import { useEffect } from 'react';
import { Button } from '@mui/material';
import { useState } from 'react';
import { serverUrl } from '../ServerURL';
import { setProductId } from '../Redux/User/Product';
import { useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom'
import Navbar from '../Components/Navbar';
import Popup from '../Components/Popup';

export default function ViewProducts() {

  const [alert,setAlert] =useState(false)
  const [confirm,setConfirm] = useState(false)
 
  const dispatch = useDispatch();
  const navigate=useNavigate()

  const handleConfirm=(e)=>{
    setConfirm(e)
  }
  const columns = [
    // { field: 'id', headerName: 'ID', width: 70 },
    { field: 'name', headerName: 'Name', width: 230 },
    { field: 'expiry', headerName: 'Expiry', width: 230 },
    { field: 'price', headerName: 'Price', width: 230 },
    { field: 'stock', headerName: 'Stock', width: 230 },
    {
      field: 'action',
      width: 330,
      headerName: 'Action',
      sortable: false,
      renderCell: (params) => {
        const handleEdit = () => {
          console.log(params.row._id);

          dispatch(setProductId(params.row._id));
          navigate('/product/edit')
        };

        

        const handleDelete = (e) => {
          // setAlert(true)
        
          // if(confirm){

            axios
              .delete(`${serverUrl}/product/delete?id=${params.row._id}`)
              .then((res) => {
                console.log(res);
  
                setChange(!change)
              })
              .catch((err) => {
                console.log(err);
              });
          };
          // }


        // if (params.row.isBlocked) {
        return (
          <>
            <Button
              style={{ zIndex: '0' }}
              variant='outlined'
              color='success'
              onClick={(e) => {
                handleEdit(e);
              }}
            >
              Edit
            </Button>
            <Button
              style={{ zIndex: '0' }}
              variant='outlined'
              color='error'
              onClick={(e) => {
                handleDelete(e);
              }}
            >
              Delete
            </Button>
          </>
        );
        // } else {

        // }
      },
    },
  ];

  const [products, setProducts] = React.useState();
  const [change, setChange] = useState(true);

  useEffect(() => {
    axios
      .get(`${serverUrl}/products`)
      .then((res) => {
        console.log(res.data.data);
        let response = res.data.data;
        setProducts(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [change]);

  console.log(products);
  return (
    <>  
    <Navbar />
    {alert ? <Popup onChange={handleConfirm} /> :''}
    <div
      style={{
        height: 500,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {products && (
        <DataGrid
          rows={products}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div></>
  );
}
