import Grid from '@mui/material/Grid';
import Cards from './card'
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from './auth-context';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import React from 'react';

const ContainerPublic = (props) => {


    const [loading,setLoading] = useState(true);
    const [postData,setPostData] = useState([]);
    const [isError,setIsError] = useState(false);

    // Fetch Information
    const url="http://localhost:8080/api/publicPost";
    const deletePostUrl="http://localhost:8080/api/delete/";

    const token = useContext(AuthContext).userInfo.token;

    const fetchOptions = {
        headers: {
            "x-access-token":token
        }
    }

    //Fetch Data

    useEffect(()=>{
        console.log(url)
        fetch(url,fetchOptions)
        .then((response)=>{
            if(response.status!=200)
            {
                throw new Error("Couldn't load data from the server");
            }
            else
            return response.json();
        })
        .then(json=>{
            console.log(json)
            setPostData(json);
            setLoading(false);
        })
        .catch(error=>{
            console.log("Hello Kitty");
            console.log(error);
            setLoading(false);
            setIsError(true);
        })
    },[])


    //Delete Function

    const deletePost=(postId,setSuccess,setError)=>{
        fetch(deletePostUrl+postId,fetchOptions)
        .then(response=>{
            if(response.status==200)
            {
                setSuccess(true);
                setPostData(prevData=>{
                    const index=prevData.indexOf((d)=>d.id===postId);
                    prevData.splice(index,1);
                    return {PostData:prevData};
                })
            }
        })
        .catch(error=>{
            setError(true);
            console.log(error);
        })

    }

    return (
        <React.Fragment>
            {loading && <Box sx={{width:'100%'}}><LinearProgress /></Box>}
        <Grid container spacing={2} sx={{pl:20,pr:20,mt:2}}>

            {!isError&&postData.map(dat=>{

                return (
                <Grid item xs={12} sm={6} md={4}>
                    <Cards data={dat} isPublic={true} deletePost={deletePost} />
                    </Grid>
                )
            })}
        </Grid>
        </React.Fragment>
    )
}

export default ContainerPublic;