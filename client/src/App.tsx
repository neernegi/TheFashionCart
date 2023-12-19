import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import UserLogin from "./pages/authentication/user/UserLogin";
import UserRegister from "./pages/authentication/user/UserRegister";
import Header from "./components/navbar/Header";
import CreateCategory from "./pages/admin/category/CreateCategory";
import CreateSubCategory from "./pages/admin/category/CreateSubCategory";
import LoginSeller from "./pages/authentication/seller/LoginSeller";
import SellerRegister from "./pages/authentication/seller/SellerRegister";
import CreateProductForm from "./components/productComponent/ProductForm";
import SellerProduct from "./pages/product/SellerProduct";
import CreateBanner from "./pages/admin/banner/CreateBanner";
import ShowAllCategory from "./pages/category/ShowAllCategory";
import CategoryProducts from "./pages/category/CategoryProducts";
import SubcategoryProduct from "./pages/category/SubcategoryProduct";
import ProductDetails from "./pages/product/ProductDetails";
import CartProducts from "./pages/feature/CartProducts";
import SearchProduct from "./pages/product/SearchProduct";
import ConfirmOrder from "./pages/shipping/ConfirmOrder";
import OrderStepper from "./pages/shipping/ShippingStepper";
import OrderSuccess from "./pages/shipping/OrderSuccess";
import FetchAllOrders from "./pages/order/FetchAllOrders";
import AddSellerInfo from "./pages/authentication/seller/AddSellerDetails";
import { useAuth } from "./pages/context/useAuth";
import SellerFetchOrders from "./pages/order/seller/SellerFetchProducts";
import UpdateActiveOrders from "./pages/order/seller/UpdateActiveOrder";
import RegisterStepper from "./pages/authentication/seller/RegisterStepper";
import Dashboard from "./pages/dashboard/Dashboard";
import SignInUpTab from "./pages/authentication/user/SignInUpTab";
import Footer from "./components/Footer";

const App: React.FC = () => {
  const { auth } = useAuth();
  const isAuthenticated = auth?.token;
  console.log(isAuthenticated);

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/user-signInUp-tab" element={<SignInUpTab />} />
        <Route path="/create-Category" element={<CreateCategory />} />
        <Route path="/create-subategory" element={<CreateSubCategory />} />
        <Route path="/create-banner" element={<CreateBanner />} />

        <Route path="/shipping-confirm-order" element={<OrderStepper />} />
        <Route path="/order-shipping/:id" element={<ConfirmOrder />} />
        <Route path="/show-all-category" element={<ShowAllCategory />} />
        <Route path="/cart-products" element={<CartProducts />} />
        <Route path="/serach-products/:keyword" element={<SearchProduct />} />
        <Route path="/add-products" element={<CreateProductForm />} />
        <Route
          path="/fetch-all-get-category-products"
          element={<CategoryProducts />}
        />
        <Route path="/single-product-detail/:id" element={<ProductDetails />} />
        <Route
          path="/fetch-all-get-subcategory-products"
          element={<SubcategoryProduct />}
        />
        <Route path="/seller-products" element={<SellerProduct />} />

        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/login-seller" element={<LoginSeller />} />
        <Route path="/seller-register" element={<SellerRegister />} />
        <Route path="/seller-details" element={<AddSellerInfo />} />

        <Route path="/success" element={<OrderSuccess />} />
        <Route path="/my-orders" element={<FetchAllOrders />} />
        <Route path="/seller-orders" element={<SellerFetchOrders />} />
        <Route path="/active-seller-orders" element={<UpdateActiveOrders />} />
        <Route path="/register-seller-stepper" element={<RegisterStepper />} />
        <Route path="/seller-dashboard" element={<Dashboard />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
