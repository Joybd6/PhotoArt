import Grid from '@mui/material/Grid';
import Cards from './card'
import {useState, useContext, useEffect} from 'react';
import {AuthContext} from './auth-context';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import React from 'react';
import FlashMessage from './flash';

const ContainerPrivate = (props) => {


    const [loading,setLoading] = useState(true);
    const [postData,setPostData] = useState([]);
    const [isError,setIsError] = useState(false);
    const [success,setSuccess] = useState(false);
    const [isErrorData,setIsErrorData] = useState(false);
    // Fetch Information
    const url="http://localhost:8080/api/getMyPost/";
    const deletePostUrl="http://localhost:8080/api/delete/";

    const token = useContext(AuthContext).userInfo.token;

    const fetchOptions = {
        headers: {
            "x-access-token":token
        }
    }

    const fetchOptionsDelete={
        method:"DELETE",
        headers:{
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
            setIsErrorData(true);
        })
    },[])


    //Delete Function

    const deletePost=(postId)=>{
        fetch(deletePostUrl+postId,fetchOptionsDelete)
        .then(response=>{
            if(response.status==200)
            {
                setPostData(prevData=>{
                    const index=prevData.indexOf((d)=>d.id===postId);
                    prevData.splice(index,1);
                    return prevData
                })
                setSuccess(true);
            }
            else
            {
                throw new Error("Got an Error")
            }
        })
        .catch(error=>{
            setIsError(true);
            console.log(error);
        })

    }

    //update like

    const updateLove=(postId)=>{
        console.log("Hello World")
        setPostData(prev=>{
            const index=prev.indexOf(d=>d.id==postId)
            prev[index].liked=!prev[index].liked;
            return prev;
        })
    }

    return (
        <React.Fragment>
            {success&&<FlashMessage message="Deleted" severity="success" open={success} setOpen={setSuccess}/>}
            {isError&&<FlashMessage message="Couldn't Delete" severity="error" open={isError} setOpen={setIsError}/>}
            {loading && <Box sx={{width:'100%'}}><LinearProgress /></Box>}
        <Grid container spacing={2} sx={{pl:20,pr:20,mt:2}}>

            {!isErrorData&&postData.map(dat=>{

                return (
                <Grid item xs={12} sm={6} md={4}>
                    <Cards data={dat} isPublic={false} deletePost={deletePost} handlelike={updateLove}/>
                    </Grid>
                )
            })}
        </Grid>
        </React.Fragment>
    )
}

export default ContainerPrivate;