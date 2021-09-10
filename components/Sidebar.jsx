import styled from "styled-components";
import { Avatar, IconButton, Button } from "@material-ui/core";
import {
   Chat as ChatIcon,
   MoreVert as MoreVertIcon,
   Search as SearchIcon,
} from "@material-ui/icons";

const Sidebar = () => {
   return (
      <Container>
         <Header>
            <UserAvatar />

            <IconsContainer>
               <IconButton>
                  <ChatIcon />
               </IconButton>

               <IconButton>
                  <MoreVertIcon />
               </IconButton>
            </IconsContainer>
         </Header>

         <Search>
            <SearchIcon />
            <SearchInput placeholder="Search in chats" />
         </Search>

         <SidebarButton>Start a new chat</SidebarButton>

         {/* TODO: List of chats */}
      </Container>
   );
};

export default Sidebar;

const Container = styled.div``;

const Header = styled.div`
   display: flex;
   position: sticky;
   top: 0;
   background-color: #fff;
   z-index: 1;
   justify-content: space-between;
   align-items: center;
   padding: 15px;
   height: 80px;
   border-bottom: 3px solid whitesmoke;
`;

const UserAvatar = styled(Avatar)`
   cursor: pointer;
   :hover {
      opacity: 0.8;
   }
`;

const Search = styled.div`
   display: flex;
   align-items: center;
   padding: 5px;
   border-radius: 2px;
`;

const IconsContainer = styled.div``;

const SearchInput = styled.input`
   outline-width: 0;
   border: none;
   flex: 1;
   margin-left: 5px;
`;

const SidebarButton = styled(Button)`
   width: 100%;
   &&& {
      border-bottom: 2px solid whitesmoke;
      border-top: 2px solid whitesmoke;
   }
`;
