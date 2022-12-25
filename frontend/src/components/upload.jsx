import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { TextField } from '@mui/material'
import {Container} from '@mui/material'
import {Paper} from '@mui/material'
import { Typography } from '@mui/material'
import {Button} from '@mui/material'
import {useState} from 'react';
import {AuthContext} from './auth-context';
import { useContext } from 'react'
import FlashMessage from './flash';
const Upload = () => {

    const userData=useContext(AuthContext);
    const [image,setImage] = useState("");
    const [title,setTitle] =  useState("");
    const [success,setSuccess] = useState(false);
    const [isError,setIsError] = useState(false);
    const handleSubmit=(e) => {
        e.preventDefault();
        const token=userData.userInfo.token;
        console.log(token);
        console.log(image);
        console.log(title);
        if(image) {
            const url="http://localhost:8080/api/upload"
            const formData= new FormData();
            formData.append("uploaded-image",image);
            formData.append("title",title);

            const fetchOptions=  {
                method:"POST",
                headers: {
                    "x-access-token": token
                },
                body:formData
            }

            fetch(url,fetchOptions)
            .then(response=>{
                if(response.status==200)
                {
                    setSuccess(true);
                    return response.json();
                }
                else
                {
                    throw new Error("Got an Error");
                }
            })
            .then(json=>console.log(json))
            .catch(e=>{
                console.log(e);
                setIsError(true);
            })
        }
        else
        {
            console.log("File should be selected");
        }
    }

    const handleOnChange=(e)=>
    {
        setImage(e.target.files[0]);
    }

    const handleTitle= (e) => {
        setTitle(e.target.value);
    }

    return(
        <Box>
            {success&& (<FlashMessage message="Successfully Uploaded" severity="success" open={success} setOpen={setSuccess} />)}
            {isError &&(<FlashMessage message="Upload Failed" severity="error" open={isError} setOpen={setIsError} />)}
            <Container sx={{mt:2,maxWidth:500}} >
                <Paper sx={{px:5,py:5}}>
                    <Typography variant="h3" sx={{mb:3}}>
                        Upload
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidation sx={{maxWidth:800}}>
                        <TextField id="title" sx={{mb:5}} onChange={handleTitle} name="title" label="Title of Your Photo Or Any Thought" variant="standard" fullWidth required/>
                        <Grid container spacing={12}>
                            <Grid item xs={12} sm={4}>
                                <input
                                accept="image/*"
                                name="uploaded-image"
                                style={{ display: 'none' }}
                                id="uploaded-image"
                                type="file"
                                multiple
                                onChange={handleOnChange}
                                required
                                />
                                <label htmlFor="uploaded-image">
                                    <Button variant="raised" component="span">
                                        Choose File
                                    </Button>
                                </label> 
                            </Grid>
                            <Grid item xs={12} sm={8} zeroMinWidth>
                                <Typography variant="overline" noWrap>
                                    {image.name}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Upload
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    )
}


export default Upload;