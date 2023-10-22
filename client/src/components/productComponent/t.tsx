import React, { ChangeEvent, useEffect, useState } from "react";
import {
  Container,
  Box,
  TextField,
  Button,
  Autocomplete,
  Grid,
  Input,
} from "@mui/material";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Category, fetchCategories } from "../../redux/features/categorySlice";
import {
  SubCategory,
  fetchSubCategories,
} from "../../redux/features/subCategorySlice";
import { createProduct } from "../../redux/features/productSlice";

interface CreateProductProps {
  name: string;
  price: number | null;
  description: string;
  brand: string;
  stock: number | null;
}

const CreateProductForm: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null
  );
  const [selectedSubCategory, setSelectedSubCategory] =
    useState<SubCategory | null>(null);
  const [subcategoriesOptions, setSubcategoriesOptions] = useState<
    SubCategory[]
  >([]);

  const [createProduct, setCreateProduct] = useState<CreateProductProps>({
    name: "",
    price: null,
    description: "",
    brand: "",
    stock: null,
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | undefined>();
  const dispatch = useAppDispatch();
  const categories = useAppSelector((state) => state.category.categories);
  const subcategories = useAppSelector(
    (state) => state.subCategory.subCategories
  );

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedAvatar = event.target.files![0];
    setAvatar(selectedAvatar);

    // Create a preview URL for the selected avatar
    const previewUrl = URL.createObjectURL(selectedAvatar);
    setAvatarPreview(previewUrl);
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateProduct((prevUser) => ({ ...prevUser, name: event.target.value }));
  };
  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateProduct((prevUser) => ({ ...prevUser, name: event.target.value }));
  };
  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCreateProduct((prevUser) => ({ ...prevUser, name: event.target.value }));
  };
  const handleBrandChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateProduct((prevUser) => ({ ...prevUser, name: event.target.value }));
  };
  const handleStockChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreateProduct((prevUser) => ({ ...prevUser, name: event.target.value }));
  };

  const handleCategoryChange = (newValue: Category | null) => {
    setSelectedCategory(newValue);

    if (newValue) {
      const selectedCategorySubcategories = newValue.subCategories || [];
      setSubcategoriesOptions(selectedCategorySubcategories);
      setSelectedSubCategory(null);
    } else {
      setSubcategoriesOptions([]);
    }
  };

  const handleCreateProduct = (e:React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
   formData.set("name",createProduct.name)
   formData.set("price",createProduct.price)
   formData.set("description",createProduct.description)
   formData.set("brand",createProduct.brand)
   formData.set("stock",createProduct.stock)
   formData.set("category",categories)
   formData.set("stock",createProduct.stock)
    formData.set("avatar", avatar || "");
    };

    dispatch(createProduct());
  };
