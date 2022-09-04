import { Box, Button, CircularProgress, MenuItem, Select, styled } from '@mui/material'
import React, { useState } from 'react'

const Search = (props) => {
      const [loading, setLoading] = useState(false)
      const [jobSearch, setJobSearch] = useState({
            type: "Full time",  
            location: "Remote",
      })

      const handleChange = (e) => {
            setJobSearch((oldState)=> ({
                  ...oldState,
                  [e.target.name]: e.target.value,
            }))
      }

      const search = async () => {
            setLoading(true);
            await props.jobSearchFun(jobSearch);
            setLoading(false)
      }

      const Wrapper = styled(Box)({
            backgroundColor: "#fff",
            display: "flex",
            boxShadow: "0px 1px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            marginBottom: "1.5rem",
            gap: "8px",
            "& > *": {
                  flex: 1,
                  height: "45px",
            },
      })

  return (
    <Wrapper p={2} mt={-5}>
      <Select onChange={handleChange} value={jobSearch.type} name='type' variant='filled' disableUnderline>
            <MenuItem value="Full time">Full time</MenuItem>
            <MenuItem value="Part time">Part time</MenuItem>
            <MenuItem value="Contract">Contract</MenuItem>
      </Select>

      <Select onChange={handleChange} value={jobSearch.location} name='location' variant='filled'  disableUnderline>
            <MenuItem value="Remote">Remote</MenuItem>
            <MenuItem value="In-office">In-office</MenuItem>
      </Select>

      <Button
            onClick={search}
            variant="contained" 
            color='primary' 
            disableElevation
            disabled={loading}
      >
            {
                  loading ? (
                        <CircularProgress size={20} />
                  ) : (
                        "Search"
                  )
            }
      </Button>
    </Wrapper>
  )
}

export default Search