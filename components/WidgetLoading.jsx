import { CircularProgress } from "@mui/material";
import styled from "styled-components";

const WidgetLoading = () => {
   return (
      <Container>
         <CircularProgress />
      </Container>
   );
};
export default WidgetLoading;

const Container = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
   min-height: 150px;
   height: 100%;
   width: 100%;
   background: #f4f6f8;
`;
