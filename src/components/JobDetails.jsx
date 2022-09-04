import { Close } from '@mui/icons-material'
import { styled, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography, Box } from '@mui/material'
import React from 'react';

const StyledGrid = styled(Grid)(({theme}) => ({
      color: "white",
      backgroundColor: "#0B0B15",
      margin: theme.spacing(0.5),
      padding: theme.spacing(0.75),
      borderRadius: "5px",
      fontWeight: "600",
})) 

const JobDetails = (props) => {
  return (
      <Dialog open={!!Object.keys(props.job).length} fullWidth>
            <DialogTitle display="flex" justifyContent="space-between" alignItems="center">
                  <Typography>{props.job.title} @{props.job.companyName}</Typography>
                  <IconButton onClick={props.closeModal}>
                        <Close />
                  </IconButton>
            </DialogTitle>
            <DialogContent>
                  <Box mb={2} display="flex">
                        <Typography fontWeight={600}>Company Name : </Typography>
                        &nbsp;
                        <Typography fontWeight={400}> {props.job.companyName}</Typography>
                  </Box>

                  <Box mb={2} display="flex">
                        <Typography fontWeight={600}>Job type : </Typography>
                        &nbsp;
                        <Typography fontWeight={400}> {props.job.type}</Typography>
                  </Box>

                  <Box mb={2} display="flex">
                        <Typography fontWeight={600}>Description : </Typography>
                        &nbsp;
                        <Typography fontWeight={400}> {props.job.description}</Typography>
                  </Box>

                  <Grid container spacing={2}>
                        {
                              props.job.skills && 
                              props.job.skills.map((singleSkill) => (
                                    <StyledGrid 
                                          item 
                                          key={singleSkill}
                                    > {singleSkill} </StyledGrid>
                              ))
                        }
                  </Grid>
            </DialogContent>
      </Dialog>
  )
}

export default JobDetails