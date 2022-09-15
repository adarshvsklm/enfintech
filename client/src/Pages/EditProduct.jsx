import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import axios from 'axios';
import { serverUrl } from '../ServerURL';
import { Button } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import { useEffect } from 'react';
import {useSelector} from 'react-redux'


function EditProduct() {
  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));
  const [form, setForm] = useState();

  const [stock, setStock] = React.useState('');
 const {ProductId} = useSelector((state)=>state.Product)
 console.log(ProductId,'kkkkkkkkkkkkkk')

// useEffect(()=>{
//     // axios.get()
//     // console.log(ProductId,'sdkfjhksdfj');
// },[])

 
(function fetchData(){
   axios.get(`${serverUrl}/product/details?id=${ProductId}`)
   .then((res)=>{
    let formData=res.data.data
    setForm({...formData})
    console.log(res.data.data);
   })
   .catch((err)=>{
    console.log(err);
   }) 
}())


  const handleStockChange = (event) => {
    // setAge(event.target.value);
    setForm({ ...form, stock: event.target.value });
  };

  const handleChange = (newValue) => {
    // setValue(newValue);
    setForm({ ...form, expiry: newValue });
  };

  const handleSubmit = () => {
    axios
      .post(`${serverUrl}/product/add`, { ...form })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };


  return (
    <div sx={{ textAlign: 'center' }}>
      <h3>Add Product</h3>
      <TextField
        id='standard-basic'
        label='Name'
        variant='standard'
        onChange={(e) => {
          setForm({ ...form, name: e.target.value });
        }}
      />
      <br />
      {/* <TextField id='standard-basic' label='Date' variant='standard' /><br /> */}
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Stack spacing={3} sx={{ width: '50%', alignItems: 'center' }}>
          <DesktopDatePicker
            label='Date desktop'
            inputFormat='MM/DD/YYYY'
            value={value}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
          />
        </Stack>
      </LocalizationProvider>
      <TextField
        id='standard-basic'
        label='Price'
        variant='standard'
        onChange={(e) => {
          setForm({ ...form, price: e.target.value });
        }}
      />
      <br />
      {/* <TextField
        id='standard-basic'
        label='Stock'
        variant='standard'
        onChange={(e) => {
          setForm({ ...form, stock: e.target.value });
        }}
      /> */
      
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Stock</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={stock}
          label="Stock"
          onChange={handleStockChange}
        >
          <MenuItem value={'inStock'}>InStock</MenuItem>
          <MenuItem value={'outOfStock'}>Out of Stock</MenuItem>
         </Select>
      </FormControl>
      
      }
      <br />
      <Button variant='contained' onClick={handleSubmit}>
        ADD PRODUCT
      </Button>
    </div>
  );
}

export default EditProduct;
