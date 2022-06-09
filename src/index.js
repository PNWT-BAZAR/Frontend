import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MenuItemContextProvider } from "./shared/contexts/MenuItemContext";
import reportWebVitals from "./reportWebVitals";
import Cart from "./Pages/Cart/Cart";
import LoginRegister from "./Pages/LoginAndRegister/LoginRegisterContainer";
import Layout from "./Pages/Layout/Layout";
import AddProduct from "./Pages/Admin/AddProduct";
import AdminLayout from "./Pages/Admin/AdminLayout";
import Dashboard from "./Pages/Admin/Dashboard";
import ProductsList from "./Pages/Admin/ProductsList";
import UsersList from "./Pages/Admin/UsersList";
import OrdersList from "./Pages/Admin/OrdersList";
import ProductView from "./Pages/Product/ProductView";
import Home from "./Pages/Home/Home";
import CategoryView from "./Pages/Category/CategoryView";
import CategoriesList from "./Pages/Admin/CategoriesList";
import SubcategoriesList from "./Pages/Admin/SubcategoriesList";
import OrderView from "./Pages/Admin/OrderView";
import NewLogin from "./Pages/LoginAndRegister/NewLogin";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* <App /> */}
    <MenuItemContextProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Layout>
                <Home />
              </Layout>
            }
          />
          <Route
            path="/product/:id"
            element={
              <Layout>
                <ProductView />
              </Layout>
            }
          />
          <Route
            path="/form"
            element={
              <Layout>
                <NewLogin />
              </Layout>
            }
          />
          <Route
            path="/category/:id"
            element={
              // <Layout>
              <CategoryView />
              // </Layout>
            }
          />
          <Route
            path="/login"
            element={
              <Layout>
                <LoginRegister />
              </Layout>
            }
          />
          <Route
            path="/cart"
            element={
              <Layout>
                <Cart />
              </Layout>
            }
          />
          <Route
            path="/admin"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          ></Route>
          <Route
            path="/admin/dashboard"
            element={
              <AdminLayout>
                <Dashboard />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/products"
            element={
              <AdminLayout>
                <ProductsList />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/products/:id"
            element={
              <AdminLayout>
                <AddProduct />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/products/addproduct"
            element={
              <AdminLayout>
                <AddProduct />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminLayout>
                <UsersList />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/orders"
            element={
              <AdminLayout>
                <OrdersList />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/orders/:id"
            element={
              <AdminLayout>
                <OrderView />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminLayout>
                <CategoriesList />
              </AdminLayout>
            }
          />
          <Route
            path="/admin/subcategories"
            element={
              <AdminLayout>
                <SubcategoriesList />
              </AdminLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </MenuItemContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
