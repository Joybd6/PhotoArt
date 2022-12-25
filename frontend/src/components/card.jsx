import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {AuthContext} from './auth-context';
import {useContext} from 'react';
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function Cards(props) {

  const token = useContext(AuthContext).userInfo.token;
  //Url Defination
  const imageUrl="http://localhost:8080/api/getImage/"
  const loveImageUrl="http://localhost:8080/api/like/"
  const accessToggleUrl="http://localhost:8080/api/toggleAccess/"
  const [expanded, setExpanded] = React.useState(false);

  const [loved,setLoved] = React.useState(!!props.data.liked);
  const [isPublic,setIsPublic] = React.useState(!!props.data.access);

  const fetchOptions={
    method:"POST",
    headers: {
      "x-access-token":token
    }
  }

  const handleLove=()=>{
    fetch(loveImageUrl+props.data._id,fetchOptions)
    .then(response=>{
      if(response.status==200)
      {
        setLoved(prev=>!prev);
      }
      else
      {
        throw new Error("Got an Error");
      }
    }).catch(e=>{
      console.log(e);
    })
  }

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleDelete=()=>
  {
    props.deletePost(props.data._id);
  }

  const dates= new Date(props.data.date);
  const monthName=dates.toLocaleString("en-US", { month: "long" });


  return (
    <Card sx={{minWidth:250}}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {props.data.name.charAt(0)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={props.data.name}
        subheader={monthName+" "+dates.getDay().toString()+", "+dates.getFullYear().toString()}
      />
      <CardMedia
        component="img"
        height="194"
        image={imageUrl+token+"/"+props.data._id}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {props.data.title}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={handleLove} aria-label="add to favorites">
          {!loved&&<FavoriteIcon />}
          {loved&&<FavoriteIcon sx={{color:red[500]}}/>}
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        {!props.isPublic && (<IconButton onClick={handleDelete} aria-label="delete forever" ><DeleteForeverIcon color="action"/></IconButton>)}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
    </Card>
  );
}
