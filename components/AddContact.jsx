import { useState } from "react";
import {
   Box,
   Button,
   TextField,
   Dialog,
   DialogTitle,
   DialogContent,
   Grid,
   colors,
   useMediaQuery,
} from "@mui/material";
import Image from "next/image";
import DialogContentText from "@mui/material/DialogContentText";

const AddContact = ({ open, handleClose, title }) => {
   const [email, setEmail] = useState("");
   const matches = useMediaQuery("(max-width:600px)");

   console.log("log: matches", matches);

   const handleChange = (e) => {
      setEmail(e.target.value);
   };

   return (
      <Dialog open={open} onClose={handleClose} fullWidth={true} maxWidth="sm">
         <DialogTitle>Add Contact</DialogTitle>
         <DialogContent>
            <DialogContentText>
               To subscribe to this website, please enter your gmail account.
            </DialogContentText>
            <Box sx={{ mt: 3 }}>
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
                           pt: 3,
                           height: "100%",
                        }}
                     >
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

                        <Box sx={{ pt: 3, textAlign: "right" }}>
                           <Button
                              variant="contained"
                              // size="small"
                           >
                              Continue
                           </Button>
                        </Box>
                     </Box>
                  </Grid>
               </Grid>
            </Box>
         </DialogContent>
      </Dialog>
   );
};

// <DialogActions>
//             <Button onClick={handleClose}>Cancel</Button>
//             <Button onClick={handleClose}>Subscribe</Button>
//          </DialogActions>

export default AddContact;
