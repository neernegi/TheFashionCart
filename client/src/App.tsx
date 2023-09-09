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
import RequestQC from "./pages/qcStatus/RequestQC";
import CreateBanner from "./pages/admin/banner/CreateBanner";
import ShowAllCategory from "./pages/category/ShowAllCategory";
import CategoryProducts from "./pages/category/CategoryProducts";
import SubcategoryProduct from "./pages/category/SubcategoryProduct";
import ProductDetails from "./pages/product/ProductDetails";


const App: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/user-login" element={<UserLogin />} />
        <Route path="/create-Category" element={<CreateCategory />} />
        <Route path="/create-subategory" element={<CreateSubCategory />} />
        <Route path="/create-banner" element={<CreateBanner />} />
        <Route path="/show-all-category" element={<ShowAllCategory />} />
        <Route path="/add-listing" element={<CreateProductForm />} />
        <Route path="/fetch-all-get-category-products" element={<CategoryProducts />} />
        <Route path="/single-product-detail/:id" element={<ProductDetails />} />
        <Route path="/fetch-all-get-subcategory-products" element={<SubcategoryProduct />} />
        <Route path="/seller-products" element={<SellerProduct />} />
        <Route path="/requestQC" element={<RequestQC />} />
        <Route path="/user-register" element={<UserRegister />} />
        <Route path="/login-seller" element={<LoginSeller />} />
        <Route path="/seller-register" element={<SellerRegister />} />
      </Routes>
    </>
  );
};

export default App;
