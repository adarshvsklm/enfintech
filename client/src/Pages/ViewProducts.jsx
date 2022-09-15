import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import axios from 'axios';
// import { serverUrl } from '../../../serverUrl';
import { useEffect } from 'react';
import { Button } from '@mui/material';
// import { display } from '@mui/system';
// import { toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { serverUrl } from '../ServerURL';
import { setProductId } from '../Redux/User/Product';
import {useDispatch} from 'react-redux';

export default function ViewProducts() {
    const dispatch = useDispatch()
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
        // const onClick = async ({e,accept}) => {
        //    e.stopPropagation(); // don't select this row after clicking
        //   try {   
        //     if (accept) {
        //       axios
        //         .patch(`${serverUrl}/admin/hotel/accept?id=${params.row._id}`)
        //         .then((res) => {
        //           // toast('UnBlocked User ', { autoClose: 800 });
        //           setBlocked(!blocked);
        //         });
        //     } else {
        //       axios
        //         .patch(`${serverUrl}/admin/hotel/reject?id=${params.row._id}`)
        //         .then((res) => {
        //           // toast('Blocked User ', { autoClose: 800 });
        //           setBlocked(!blocked);
        //         });
        //     }
        //   } catch (err) {
        //     console.log(err);
        //     // toast("Some Error Occured",{autoClose:800})
        //   }
        // };
        const handleEdit =()=>{
            console.log(params.row._id);
            
            dispatch(setProductId(params.row._id))
        }

        const handleDelete =(e)=>{
            axios.delete(`${serverUrl}/${params.row._id}`)
            .then((res)=>{
                console.log(res);
            })
            .catch((err)=>{
                console.log(err);
            })
        }

        // if (params.row.isBlocked) {
        return (
          <>
            <Button
              style={{ zIndex: '0' }}
              variant='outlined'
              color='success'
              onClick={(e)=>{handleEdit(e)}}
            >
              Edit
            </Button>
            <Button
              style={{ zIndex: '0' }}
              variant='outlined'
              color='error'
              onClick={(e)=>{handleDelete(e);}}
            >
              Delete
            </Button>
          </>
        );
        // } else {

        // }
      },
    },

    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 90,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];

  const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
  ];

  const [hotels, setHotels] = React.useState();
  const [blocked, setBlocked] = useState();

  useEffect(() => {
    axios
      .get(`${serverUrl}/products`)
      .then((res) => {
        console.log(res.data.data);
        let response = res.data.data;
        setHotels(response);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [blocked]);

  console.log(hotels);
  return (
    <div
      style={{
        height: 500,
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {hotels && (
        <DataGrid
          rows={hotels}
          columns={columns}
          pageSize={10}
          getRowId={(row) => row._id}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      )}
    </div>
  );
}
