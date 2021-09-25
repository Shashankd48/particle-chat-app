import styled from "styled-components";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";

const Message = ({ user, message }) => {
   const [userLoggedIn] = useAuthState(auth);

   const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

   return (
      <Container>
         <TypeOfMessage>
            {message.message}

            <Timestamp>
               {message.timestamp
                  ? moment(new Date(message.timestamp.toDate())).format("LT")
                  : "..."}
            </Timestamp>
         </TypeOfMessage>
      </Container>
   );
};

export default Message;

const Container = styled.div``;

const MessageElement = styled.p`
   width: fit-content;
   padding: 5px 10px;
   border-radius: 8px;
   margin: 10px;
   min-width: 68px;
   padding-bottom: 26px;
   max-width: 70%;
   position: relative;
   text-align: right;
`;

const Sender = styled(MessageElement)`
   margin-left: auto;
   background-color: #dcf8c6;
`;

const Reciever = styled(MessageElement)`
   background-color: whitesmoke;
   text-align: left;
`;

const Timestamp = styled.div`
   color: gray;
   padding: 10px;
   position: absolute;
   bottom: 0;
   text-align: right;
   right: 0;
   font-size: 10px;
`;
