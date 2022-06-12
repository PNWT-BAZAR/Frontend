import React, { useEffect } from "react";
import styled from "styled-components";
import { useData } from "../../shared/contexts/MenuItemContext";
import StyledLink from "./StyledLink";
import { COLORS } from "../values/colors";

const DropdownContainer = styled.div`
  width: 40%;
  height: auto;
  min-height: 100px;
  display: flex;
  wrap: flex-wrap;
  justify-content: center;
  position: absolute;
  top: -1px;
  z-index: 3;
  border: 1px solid grey;
  border-top: none;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  opacity: 1;
  background-color: white;
  box-shadow: rgba(149, 157, 165, 0.2) 10px 20px 24px;
  cursor: pointer;
  overflow: auto;
  transition: all 0.5s ease;
  transform: translateY(-0px);
`;

const List = styled.ul`
  margin: 20px;
  padding: 0px;
  width: 700px;
  height: auto;
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  @media (max-width: 600px) {
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: auto;
  }
`;

const ListItem = styled.div`
  margin: 7px;
`;

const Dropdown = (props) => {
  const { data, setValues } = useData();
  const subcategories = data?.subcategories;

  useEffect(() => {}, [data]);

  return (
    <DropdownContainer
      onMouseEnter={() => {
        setValues({ showDropdown: true });
      }}
      onMouseLeave={() => {
        setValues({ showDropdown: false });
      }}
    >
      <List>
        {subcategories &&
          subcategories?.map((subcategory) => {
            return [
              <StyledLink
                key={subcategory?.id}
                onClick={() => {
                  setValues({ showDropdown: false });
                }}
                to={{
                  pathname: `/category`,
                  search:
                    "?categoryId=" +
                    data?.category?.id +
                    "&subcategoryId=" +
                    subcategory?.id,
                }}
              >
                <ListItem>
                  <i>{subcategory.name}</i>
                </ListItem>
              </StyledLink>,
            ];
          })}
      </List>
    </DropdownContainer>
  );
};

export default Dropdown;
