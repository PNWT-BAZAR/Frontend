import { dummyCategories } from "../../sampleItems/dummyCategories";
import { useState, useEffect } from "react";
import { useData } from "../../shared/contexts/MenuItemContext";
import { COLORS } from "../values/colors";
import styled from "styled-components";
import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import API from "../../api/API";
import StyledLink from "./StyledLink";

const Navbar = () => {
  const [fetchedCategories, setFetchedCategories] = useState();
  const { data, setValues } = useData();
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    const fetchNavCategories = async () => {
      const params = new URLSearchParams([["isPublic", true]]);
      const result = await API.get(`categories`, { params });

      setFetchedCategories(dummyCategories);
    };
    fetchNavCategories();
  }, []);

  // useEffect(() => {
  //   if (searchInput === undefined || searchInput === "") {
  //     // setValues({ ...data, showSearchDropdown: false });
  //     return;
  //   }
  //   // const delayDebounceFn = setTimeout(() => {
  //   //   console.log(searchInput);
  //   //   // setValues({ ...data, showSearchDropdown: true });
  //   //   const fetchSearchedProducts = async () => {
  //   //     const params = new URLSearchParams([
  //   //       ["title", searchInput],
  //   //       ["pageSize", 10],
  //   //       ["pageNumber", 1],
  //   //     ]);
  //   //     const result = await API.get("Products/GetSearchedProducts", {
  //   //       params,
  //   //     });
  //   //     console.log(result?.data);
  //   //     setSearchedProducts(result?.data?.data);
  //   //   };
  //   //   fetchSearchedProducts();
  //   // }, 500);

  //   // return () => clearTimeout(delayDebounceFn);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [searchInput]);

  const Container = styled.div`
    background-color: ${COLORS.primaryColor};
    width: 100%;
  `;

  const ColumnWrapper = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    position: relative;
  `;

  const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 80px;
    @media (max-width: 800px) {
      flex-direction: column;
    }
  `;

  const Left = styled.div`
    flex: 1;
  `;

  const LogoContainer = styled.div``;

  const Logo = styled.h1`
    text-weight: bold;
    display: inline;
    background-color: ${COLORS.primaryColor};
    color: black;
    font-size: 40px;
    cursor: pointer;
    margin-left: 50px;
    &:hover {
      color: white;
    }
    @media (max-width: 800px) {
      margin-left: 0px;
    }
  `;

  const Center = styled.div`
    flex: 1;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
  `;

  const SearchContainer = styled.div`
    border: 0.5px solid gray;
    display: flex;
    align-items: center;
    padding: 5px;
    width: 500px;
    background-color: white;
    @media (max-width: 800px) {
      margin: 10px;
      width: 350px;
    }
  `;

  const Input = styled.input`
    border: none;
    width: 100%;
    &:focus {
      outline: none;
    }
    placeholder: "What are you looking for?";
  `;

  const Right = styled.div`
    flex: 1;
    display: flex;
    padding-right: 30px;
    justify-content: flex-end;
  `;

  const CategoriesNavigation = styled.div`
    display: flex;
    color: white;
    align-items: center;
    justify-content: center;
    height: 45px;
    overflow-x: auto;
    overflow-y: auto;
    &::-webkit-scrollbar {
      display: none;
    }
    @media (max-width: 1000px) {
      justify-content: flex-start;
      width: 100%;
    }
  `;

  const MenuItem = styled.div`
    font-size: 18px;
    text-align: center;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    align-text: center;
    &:hover {
      color: black;
    }
    height: 40px;
    padding: 0px 10px 0px 10px;
    @media (max-width: 1000px) {
      height: 50px;
    }
  `;

  return (
    <Container>
      <ColumnWrapper>
        <Wrapper>
          <Left>
            <LogoContainer>
              <StyledLink to="/">
                <Logo>BAZÁR</Logo>
              </StyledLink>
            </LogoContainer>
          </Left>
          <Center>
            <SearchContainer>
              <Input
                // onChange={(e) => setSearchInput(e.target.value)}
                placeholder="What are you looking for?"
              ></Input>
              <SearchIcon
                style={{ color: "gray", fontSize: 16, cursor: "pointer" }}
              ></SearchIcon>
            </SearchContainer>
          </Center>
          <Right>
            <StyledLink to="/login">
              <Button variant="text" sx={{ color: "black" }}>
                LOGIN/REGISTER
              </Button>
            </StyledLink>
            <StyledLink to="/cart">
              <ShoppingCartOutlinedIcon sx={{ color: "black" }} />
            </StyledLink>
          </Right>
        </Wrapper>

        <hr style={{ color: "white", width: "99%" }}></hr>
        <CategoriesNavigation>
          {dummyCategories &&
            dummyCategories.map((category) => {
              return (
                <MenuItem
                  // onMouseEnter={() => {
                  //   setValues({ showDropdown: true, category: category });
                  // }}
                  // onMouseOut={() => {
                  //   setValues({ showDropdown: false });
                  // }}
                  key={category.id}
                >
                  {category.name}
                </MenuItem>
              );
            })}
        </CategoriesNavigation>
      </ColumnWrapper>
    </Container>
  );
};

export default Navbar;
