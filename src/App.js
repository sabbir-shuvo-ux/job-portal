import React, { useEffect, useState } from 'react';
import { Box, Button, CircularProgress, Grid, ThemeProvider } from '@mui/material';
import theme from './theme/theme';
import Header from './components/Header';
import Search from './components/Search';
import JobCard from './components/JobCard';
import JobPost from './components/JobPost';
import { app, firestore } from './firebase/config';
import { Close as CloseBtn } from '@mui/icons-material';
import JobDetails from './components/JobDetails';

const App = () => {

  const [jobData, setJobData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false)
  const [costumeSearch, setCostumeSearch] = useState(false);
  const [viewJobDetails, setViewJobDetails] = useState({});
  const [blankText, setBlankText] = useState("")

  const fetchJobs = async () => {
    setCostumeSearch(false)
    setLoading(true)
    const req = await firestore.collection("jobs").orderBy("postedOn", "desc").get();

    const mainJobs = req.docs.map((job) => ({ ...job.data(), id: job.id, postedOn: job.data().postedOn.toDate() }))

    setJobData(mainJobs);
    setLoading(false)
  }

  const jobSearchFun = async (jobSearch) => {
    setLoading(true);
    setCostumeSearch(true)
    const req = await firestore.collection("jobs")
                .orderBy("postedOn", "desc")
                .where("location", "==", jobSearch.location)
                .where("type", "==", jobSearch.type)
                .get();

    const mainJobs = req.docs.map((job) => ({ ...job.data(), id: job.id, postedOn: job.data().postedOn.toDate() }))

    setJobData(mainJobs);
    setLoading(false);

    if(!jobData.length){
      setBlankText("bangladesh");
    }else{
      setBlankText("");
    }
  }

  const postJobs = async (jobDetails) => {
    await firestore.collection('jobs').add({
      ...jobDetails,
      postedOn: app.firestore.FieldValue.serverTimestamp(),
    })

    fetchJobs()
  }

  useEffect(() => {
    fetchJobs()
  }, [])
  

  return (
    <ThemeProvider theme={theme}>
      <Header isModalOpen={()=> setModalOpen(true)} />
      <JobPost isModalClose={()=> setModalOpen(false)} modalOpen={modalOpen} postJobs={postJobs} />
      <JobDetails job={viewJobDetails} closeModal={()=> setViewJobDetails({})} />
      <Box mb={5}>
        <Grid container justifyContent="center">
          <Grid item xs={10}>
            <Search jobSearchFun={jobSearchFun} />
            {
              loading ? (
                <Box sx={{ display: "flex", justifyContent: "center" }}>
                  <CircularProgress />
                </Box>
              ) : (
                <>
                {
                  costumeSearch && 
                  <Box display="flex" justifyContent="flex-end" my={2}>
                    <Button color='secondary' onClick={fetchJobs}>
                      <CloseBtn fontSize='20px' />
                      Costume Search
                    </Button>
                  </Box>
                }
                
                {
                  jobData.map((job) => (
                    <JobCard open={()=> setViewJobDetails(job)} key={job.id} {...job} />
                  ))
                }
                </>
               
              )
            }  
            <p> {blankText} </p>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  )
}

export default App
