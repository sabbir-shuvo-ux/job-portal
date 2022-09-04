import { Close } from '@mui/icons-material';
import { Dialog, DialogContent, DialogTitle, FilledInput, Grid, Select, MenuItem, Typography, IconButton, styled, Box, DialogActions, Button, CircularProgress } from '@mui/material';
import React, { useState } from 'react';
import classes from '../styles/Jobpost.module.css';


const intiial = {
      title: "",
      type: "Full time",
      companyName: "",
      companyUrl: "",
      location: "Remote",
      link: "",
      description: "",
      skills: [],
}

const JobPost = ( props ) => {
      const [loading, setLoading] = useState(false);
      const [jobDetails, setJobDetails] = useState(intiial);

      const handleChange = (e) => {
          setJobDetails(oldState => ({ ...oldState, [e.target.name]: e.target.value, }))
      }

      const addRevomeFunction = (skill) =>{
            jobDetails.skills.includes(skill) ? setJobDetails((oldState) => ({
                  ...oldState,
                  skills: oldState.skills.filter((s) => s !== skill),
            }))
            :
            setJobDetails((oldState) => ({
                  ...oldState,
                  skills: oldState.skills.concat(skill),
            }))
      }

      const postJobBtn = async () => {

            for(const field in jobDetails){
                  if(typeof jobDetails[field] == "string" && !jobDetails[field]){
                        return;
                  }
            }

            if(!jobDetails.skills.length){
                  return;
            }
            
            setLoading(true);
            await props.postJobs(jobDetails);
            closeModal();
      }

      const closeModal = () => {
            setJobDetails(intiial);
            setLoading(false);
            props.isModalClose();
      }

      const StyledDialogTitle = styled(DialogTitle)({
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
      })

      const skills = ["JavaScript", "Html", "Vue", "PHP", "Firebase", "Node",]
  return (
    <Dialog open={props.modalOpen} fullWidth>
      <StyledDialogTitle>
            <Typography>Post Jobs</Typography>
            <IconButton onClick={closeModal}>
                  <Close />
            </IconButton>
      </StyledDialogTitle>
      <DialogContent>
            <Grid container spacing={2}>
                  <Grid item xs={6}>
                        <FilledInput 
                              placeholder='Job Title *' 
                              fullWidth 
                              disableUnderline 
                              name="title"
                              onChange={handleChange}
                              value={jobDetails.title}
                        />
                  </Grid>

                  <Grid item xs={6}>
                  <Select
                        name="type"
                        onChange={handleChange}
                        value={jobDetails.type}
                        variant='filled'  
                        disableUnderline
                        fullWidth
                  >
                        <MenuItem value="Full time">Full time</MenuItem>
                        <MenuItem value="Part time">Part time</MenuItem>
                        <MenuItem value="Contract">Contract</MenuItem>
                  </Select>
                  </Grid>

                  <Grid item xs={6}>
                        <FilledInput 
                              placeholder='Company name *' 
                              fullWidth 
                              disableUnderline 
                              name="companyName"
                              onChange={handleChange}
                              value={jobDetails.companyName}
                        />
                  </Grid>

                  <Grid item xs={6}>
                        <FilledInput 
                              placeholder='Company Url *' 
                              fullWidth 
                              disableUnderline
                              name="companyUrl"
                              onChange={handleChange}
                              value={jobDetails.companyUrl}
                        />
                  </Grid>

                  <Grid item xs={6}>
                  <Select 
                        variant='filled' 
                        disableUnderline 
                        fullWidth
                        name="location"
                        onChange={handleChange}
                        value={jobDetails.location}
                  >
                        <MenuItem value="Remote">Remote</MenuItem>
                        <MenuItem value="In-office">In-office</MenuItem>
                  </Select>
                  </Grid>

                  <Grid item xs={6}>
                        <FilledInput 
                              placeholder='Job Link *' 
                              fullWidth 
                              disableUnderline 
                              name="link"
                              onChange={handleChange}
                              value={jobDetails.link}
                        />
                  </Grid>

                  <Grid item xs={12}>
                        <FilledInput 
                              placeholder='Describtion *' 
                              fullWidth 
                              disableUnderline 
                              multiline 
                              rows={4} 
                              name="description"
                              onChange={handleChange}
                              value={jobDetails.description}
                        />
                  </Grid>
            </Grid>

            <Box mt={2} display="flex" gap={2}>
                  { skills.map((skill) => (
                              <Box 
                                    className={`${classes.styledBox} ${ jobDetails.skills.includes(skill) && classes.inclued }`} 
                                    onClick={() => addRevomeFunction(skill)} key={skill}
                              > 
                               { skill } 
                              </Box>
                  ))}
            </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <Typography variant='caption' color="red">* Required fields</Typography>
            <Button
                  onClick={postJobBtn}
                  variant='contained' 
                  disableElevation
                  disabled={loading}
            >
                  {
                        loading ? (
                              <CircularProgress color='secondary' size={20} />
                        ) : (
                              "Post job"
                        )
                  }
                  
            </Button>
      </DialogActions>
    </Dialog>
  )
}

export default JobPost