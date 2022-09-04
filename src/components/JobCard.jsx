import { Box, Button, Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { differenceInMinutes } from 'date-fns';

const JobCard = (props) => {

      const Wrapper = styled(Box)({
            border:"1px solid #e8e8e8",
            cursor: "pointer",
            padding: "2rem",
            transition: "0.2s",
            "&:hover": {
                  borderLeft: "6px solid #4d64e4",
                  boxShadow: "0 5px 25px rgba(0,0,0, 0.1)"
            }
      });

      const StyledTypography = styled(Typography)({
            display: "inline-block",
            backgroundColor: "#18E1D9",
            fontSize: "0.875rem",
            padding: "0.2rem 0.775rem",
            borderRadius: "0.25rem",
      })

      const StyledGrid = styled(Grid)(({theme}) => ({
            color: "white",
            backgroundColor: "#0B0B15",
            margin: theme.spacing(0.5),
            padding: theme.spacing(0.75),
            borderRadius: "5px",
            fontWeight: "600",
      })) 

  return (
    <Wrapper>
      <Grid container alignItems="center">
            <Grid item xs>
                  <Typography variant='h6' fontWeight={600}> { props.title } </Typography>
                  <StyledTypography 
                        color="inherit" 
                        sx={{ textDecoration: "none" }} 
                        component="a" variant='subtitle2' 
                        href={ props.companyUrl }
                        target="_blank"
                  >
                        { props.companyName } 
                  </StyledTypography>
            </Grid>
            <Grid item container xs>
                  { 
                        props.skills.map((skill) => (
                          <StyledGrid item key={skill}>
                              {skill}
                          </StyledGrid>    
                        ))
                  }
            </Grid>
            <Grid item container direction="column" alignItems="flex-end" gap="8px" xs>
                  <Grid item>
                        <Typography variant="caption">
                              { differenceInMinutes(Date.now(), props.postedOn) } min ago | { props.type } | {props.location}
                        </Typography>
                  </Grid>
                  <Grid item>
                        <Button 
                              onClick={props.open}
                              variant='outlined' 
                              sx={{
                                    color: "black",
                                    borderColor: "black",
                                    borderRadius: "18px",
                                    "&:hover": {
                                          color: "#18E1D9",
                                    }
                        }}>Check</Button>
                  </Grid>
            </Grid>
      </Grid>
    </Wrapper>
  )
}

export default JobCard