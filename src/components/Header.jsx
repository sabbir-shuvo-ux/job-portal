import { Approval } from '@mui/icons-material';
import { Box, Button, Grid, Typography } from '@mui/material';
import React from 'react';

const Header = ( props ) => {

  return (
      <Box bgcolor="secondary.main" color="white" py={10}>
            <Grid container justifyContent="center">
                  <Grid item xs={10}>
                        <Box display="flex" justifyContent="space-between">
                              <Typography variant='h4'>
                                    Open Job Listing
                              </Typography>
                              <Button 
                                    onClick={props.isModalOpen}
                                    sx={{
                                          display: { xs: "none", md: "block" }, 
                                          bgcolor: "primary.main",
                                          border: "1px solid transparent",
                                          color: "black",
                                          "&:hover": {
                                                      border: "1px solid #18E1D9",
                                                      color: "#18E1D9",
                                                      } 
                                    }} 
                              variant="conatined">Post a job</Button>
                              <Button 
                                    onClick={props.isModalOpen}
                                    sx={{ display: { sm: "block", md: "none" } }} 
                                    variant='contained' disableElevation> <Approval /> </Button>
                        </Box>
                  </Grid>
            </Grid>
      </Box>
      )
}

export default Header