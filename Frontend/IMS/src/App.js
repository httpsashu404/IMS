import './App.css';
import Navbar from './components/Navbar';
import Products from './components/Products';
import InsertProduct from './components/InsertProduct'
import UpdateProduct from './components/UpdateProduct';

import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';




function App() {
  return (
    <div className="App">
      <Navbar title="IMS APPLICATION" about="About"></Navbar>

      <Router>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/insertproduct" element={<InsertProduct />} />
          <Route path="/updateproduct/:id" element={<UpdateProduct />} />
        </Routes>

      </Router>


    </div>
  );
}

export default App;
