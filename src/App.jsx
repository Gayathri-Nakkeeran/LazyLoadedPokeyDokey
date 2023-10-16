import './App.css';

import { BrowserRouter, Routes, Route} from "react-router-dom";

import ProductList from './pages/productList.jsx';
import ProductDescription from './pages/productDescription.jsx';
function App() {
  
  return (
    <BrowserRouter>
      <Routes>
          <Route path='/' element={<ProductList/>}/>       
          <Route path='/details/:id' element={<ProductDescription/>}/>      
      </Routes>
    </BrowserRouter>
  )
}

export default App
