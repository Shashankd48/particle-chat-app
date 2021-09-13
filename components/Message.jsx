import { styled } from "@material-ui/styles";

const Message = ({ user, message }) => {
   return (
      <Container>
         <p>{message}</p>
      </Container>
   );
};

export default Message;

const Container = styled.div``;
