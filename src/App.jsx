import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./auth/pages/Login";
import Register from "./auth/pages/Register";
import AuthLayout from "./auth/AuthLayout";
import Home from "./root/pages/Home";
import RootLayout from "./root/RootLayout";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import About from "./root/pages/About";
import Contact from "./root/pages/Contact";
import "./index.css"
import ProtectedRoutes from "./root/protected-routes";
import ProductSlug from "./root/pages/slug";
import { SeveProduct } from "./root/pages/seveProduct";


function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<ProtectedRoutes />}>

          <Route element={<RootLayout />}>
            <Route index path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="product/:slug" element={<ProductSlug />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/seved-product" element={<SeveProduct />} />
          </Route>

        </Route>

        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="*"
          element={
            <div className="flex mt-60 justify-center">
              <h1 className=" font-bold text-9xl">404</h1>
            </div>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
