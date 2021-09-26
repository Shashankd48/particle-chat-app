import { Fragment, useState } from "react";
import {
   Box,
   Button,
   TextField,
   Dialog,
   DialogTitle,
   DialogContent,
   Grid,
   useMediaQuery,
   Alert,
} from "@mui/material";
import Image from "next/image";
import DialogContentText from "@mui/material/DialogContentText";
import WidgetLoading from "./WidgetLoading";

const AddContact = ({ open, onClose, error, addContact }) => {
   const [email, setEmail] = useState("");
   const matches = useMediaQuery("(max-width:600px)");
   const [isLoading, setIsLoading] = useState(false);

   const handleChange = (e) => {
      setEmail(e.target.value);
   };

   const createChat = async () => {
      setIsLoading(true);
      await addContact(email);
      setIsLoading(false);
      setEmail("");
   };

   const AlertContainer = () => {
      return (
         <Box sx={{ mt: 0 }}>
            <Alert severity="error">{error.message}</Alert>
         </Box>
      );
   };

   const MainContent = () => {
      return (
         <Grid container spacing="2">
            <Grid item xs={12} sm={6} md={6}>
               <Box
                  sx={{
                     textAlign: "center",
                  }}
               >
                  <Image
                     src="/add-user.svg"
                     alt="Add new user"
                     width={matches ? 250 : 200}
                     height={matches ? 250 : 200}
                  />
               </Box>
            </Grid>
            <Grid item md={6} sm={6} xs={12}>
               <Box
                  sx={{
                     pt: matches ? 0 : 3,
                     height: "100%",
                  }}
               >
                  {isLoading ? (
                     <WidgetLoading />
                  ) : (
                     <Fragment>
                        <TextField
                           autoFocus
                           margin="dense"
                           id="email"
                           label="Gmail Account"
                           type="email"
                           fullWidth
                           variant="outlined"
                           value={email}
                           onChange={handleChange}
                        />

                        <Box
                           sx={{
                              pt: 4,
                              display: "flex",
                              justifyContent: "flex-end",
                           }}
                        >
                           <Box sx={{ mr: 3 }}>
                              <Button variant="outlined" onClick={onClose}>
                                 Cancel
                              </Button>
                           </Box>
                           <Box>
                              <Button variant="contained" onClick={createChat}>
                                 Continue
                              </Button>
                           </Box>
                        </Box>
                     </Fragment>
                  )}
               </Box>
            </Grid>
         </Grid>
      );
   };

   return (
      <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="sm">
         <DialogTitle>Add Contact</DialogTitle>
         <DialogContent>
            <DialogContentText>
               To subscribe to this website, please enter your gmail account.
            </DialogContentText>
            <Box sx={{ mt: 3 }}>
               {MainContent()}

               {error.isError && <AlertContainer />}
            </Box>
         </DialogContent>
      </Dialog>
   );
};

export default AddContact;
