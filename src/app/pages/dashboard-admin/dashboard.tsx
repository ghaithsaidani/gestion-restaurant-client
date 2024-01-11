import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import './dashboard.modules.scss';
import { AddCircleOutline, Delete,ChangeCircle } from '@mui/icons-material';
import { useEffect, useState } from 'react';
import MenuServices from '../../services/menu.services';
import * as signalR from '@microsoft/signalr';
import { ToastContainer, toast } from 'react-toastify';
import {
  PostDialog,
  UpdateDialog,
} from '../../components/generic-dialog/genericDialog';
import NavBar from '../../components/nav-bar/navBar';
import AuthService from '../../services/auth.service';
import { Navigate } from 'react-router-dom';

export const Dashboard = () => {
  const baseUrl: string = import.meta.env.VITE_BASE_URL;
  const mediaUrl: string = baseUrl.split('api')[0];
  const [openFormPost, setOpenFormPost] = useState(false);
  const [openFormUpdate, setOpenFormUpdate] = useState(false);
  const [data, setData] = useState([]);
  const [updateId, setUpdateId] = useState('');
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateType, setUpdateType] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateImage, setUpdateImage] = useState('');

  const handleCloseFormPost = () => {
    setOpenFormPost(false);
  };
  const handleOpenFormPost = () => {
    setOpenFormPost(true);
  };

  const handleCloseFormUpdate = () => {
    setOpenFormUpdate(false);
  };
  const handleOpenFormUpdate = () => {
    setOpenFormUpdate(true);
  };

  const fetchData = () => {
    MenuServices.getAllDishes()
      .then((response) => {
        setData(response);
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    fetchData();
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${baseUrl}updateHub`, { withCredentials: true })
      .build();

    connection.start().then(() => {
      console.log('Connected to SignalR hub');
    });

    connection.on('sendUpdate', (message) => {
      console.log('Received update:', message);
      fetchData();
    });
    return () => {
      connection.stop();
    };
  }, [baseUrl]);

  const handlePost = (title, type, description, image) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('type', type);
    formData.append('description', description);
    formData.append('image', image);
    MenuServices.postDish(formData)
      .then(() => {
        handleCloseFormPost();
        toast.info(`Le ${(type as string).toLowerCase()} a été ajouter !`, {
          position: 'bottom-left',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = (id, title, type, description, image) => {
    const formData = new FormData();
    if (title)
      formData.append('title', title);
    if(type)
      formData.append('type', type);
    if(description)
      formData.append('description', description);
    if (typeof image != 'string' && image) {
      formData.append('image', image);
    }
    MenuServices.putDish(id, formData)
      .then(() => {
        handleCloseFormUpdate();
        toast.info(`Le ${(type as string).toLowerCase()} a été modifier !`, {
          position: 'bottom-left',
          autoClose: 4000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
      })
      .catch((err) => console.log(err));
  };

  if(!AuthService.isAuth())
  {
    return <Navigate to={"/auth"} replace={true}/>
  }
  return (
    
    <>
    <NavBar />
    <Box
      display={'flex'}
      height={'100vh'}
      className={'login-box'}
      marginTop={100}
    >
      <PostDialog
        openState={openFormPost}
        onClose={handleCloseFormPost}
        handleSubmit={handlePost}
      />
      <UpdateDialog
        openState={openFormUpdate}
        onClose={handleCloseFormUpdate}
        id={updateId}
        title={updateTitle}
        type = {updateType}
        description={updateDescription}
        image={updateImage}
        handleSubmit={handleUpdate}

      />
      
      <Grid container spacing={50} justifyContent="center">
        {/* looped item begin */}
        {data.map((value, index) => {
          return (
            <Grid item key={index}>
              <Card sx={{ width: 360 }}>
                <CardMedia
                  component="img"
                  alt="green iguana"
                  
                  image={mediaUrl + value.image}
                  sx={{height:200,width:360}}
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {value.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {value.description}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    startIcon={<ChangeCircle />}
                    onClick={() => {
                      handleOpenFormUpdate();
                      setUpdateId(value.id)
                      setUpdateTitle(value.title)
                      setUpdateType(value.type)
                      setUpdateDescription(value.description)
                      setUpdateImage(value.image)
                    }}
                  >
                    Update
                  </Button>
                  <Button
                  color='error'
                  startIcon={<Delete />}
                    size="small"
                    onClick={() => {
                      MenuServices.deleteDish(value.id).then((response) => {
                        toast.info(
                          `Le ${(
                            value.type as string
                          ).toLowerCase()} a été supprimer !`,
                          {
                            position: 'bottom-left',
                            autoClose: 4000,
                            hideProgressBar: true,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            theme: 'colored',
                          }
                        );
                      });
                    }}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}

        {/* looped item ends */}
        <Button
          variant="contained"
          startIcon={<AddCircleOutline />}
          style={{ position: 'fixed', bottom: 20, right: 25 }}
          onClick={handleOpenFormPost}
        >
          Ajouter
        </Button>
      </Grid>
      <ToastContainer />
    </Box>
    </>
  );
};
