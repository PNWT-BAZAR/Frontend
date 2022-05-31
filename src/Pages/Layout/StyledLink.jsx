import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLinkCustom = styled(Link)`
  color: inherit;
  text-decoration: inherit;
`;

const StyledLink = (props) => <StyledLinkCustom {...props} />;

export default StyledLink;
