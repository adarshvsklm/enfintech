import logo from './logo.svg';
import './App.css';
import AddProducts from './Pages/AddProducts';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ViewProducts from './Pages/ViewProducts';
import EditProduct from './Pages/EditProduct';

function App() {
  
  return (
    <div  >
      {/* <AddProducts /> */}
      <Router>
        <Routes>
          <Route >
             <Route path='/product/add' element={<AddProducts />} />             
             <Route path='/products' element={<ViewProducts />} />             
             <Route path='/product/edit' element={<EditProduct />} />             
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
