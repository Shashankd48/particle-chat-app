import styled from "styled-components";

const Sidebar = () => {
   return (
      <Container>
         <Header>header</Header>
         <Paragraph>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            voluptatibus nobis in reiciendis voluptate deleniti vero. Eum
            tenetur maiores earum.{" "}
         </Paragraph>
      </Container>
   );
};

export default Sidebar;

const Container = styled.div``;

const Header = styled.div``;

const Paragraph = styled.p`
   font-size: 20px;
`;
