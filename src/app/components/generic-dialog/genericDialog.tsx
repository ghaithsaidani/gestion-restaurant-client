import { CloudUpload } from '@mui/icons-material';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';


const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
export const PostDialog = ({ openState, onClose, handleSubmit }) => {
  const [title, setTitle] = useState(null);
  const [type, setType] = useState(null);
  const [description, setDescription] = useState(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState(' ' as string);
  const [typeError,setTypeError] = useState(false)

  const handleClose = () => {
    onClose();
    setTitle(null);
    setType(null);
    setDescription(null);
    setImage(null);
    setImageName(' ');
  };

  return (
    <Dialog open={openState} onClose={handleClose}>
      <DialogTitle>Ajouter un Plat</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pour ajouter un nouveau plat , remplir tout les champs de cette
          formulaire s'il vous plait.
        </DialogContentText>
        <TextField
          style={{ maxWidth: 300 }}
          autoFocus
          margin="dense"
          id="name"
          label="Titre"
          type="text"
          fullWidth
          variant="standard"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          error={title===''}
          helperText = {title==='' ? "Entrer le titre s'il vous plait !":''}
        />
        <Box sx={{ maxWidth: 200, marginTop: 20, marginBottom: 20 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              
            >
              <MenuItem value={'Plat'}>Plat</MenuItem>
              <MenuItem value={'Boisson'}>Boisson</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {typeError && type == null && <FormHelperText error = {typeError} >Selectionner le type s'il vous plait</FormHelperText>}
        <TextField
          style={{ minWidth: 300 }}
          id="outlined-textarea"
          label="Description"
          placeholder="Description"
          multiline
          onChange={(e) => setDescription(e.target.value)}
          error={description===''}
          helperText = {description==='' ? "Entrer la description s'il vous plait !":''}
        />
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUpload />}
          style={{ marginTop: 20 }}
        >
          Upload Image
          <VisuallyHiddenInput
            type="file"
            onChange={(e) => {
              setImage(e.target.files[0]);
              setImageName(e.target.files[0].name);
            }}
          />
          <InputLabel id="demo-simple-select-label" sx={{ marginLeft: 10 }}>
            {imageName}
          </InputLabel>
        </Button>
        {image == null && typeError && <FormHelperText error = {typeError} >Selectionner l'image s'il vous plait</FormHelperText>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={() => {
          if(image != null && title != null && title !== '' && description != null && description !== '' && type != null)
          {
            handleSubmit(title, type, description, image)
          }else{
            setTypeError(true)
          }
          

          }}>
          Ajouter
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export const UpdateDialog = ({
  openState,
  onClose,
  id,
  title,
  type,
  description,
  image,
  handleSubmit,
}) => {
  const [updateTitle, setUpdateTitle] = useState('');
  const [updateType, setUpdateType] = useState('');
  const [updateDescription, setUpdateDescription] = useState('');
  const [updateImage, setUpdateImage] = useState('');
  const [imageName, setImageName] = useState('');
  const handleClose = () => {
    onClose();
    setUpdateTitle('');
    setUpdateType('');
    setUpdateDescription('');
    setUpdateImage('');
    setImageName('');
  };

  useEffect(() => {
    if (openState) {
      setUpdateTitle(title);
      setUpdateType(type);
      setUpdateDescription(description);
      setUpdateImage(image);
      setImageName('');
    }
  }, [openState, title, type, description, image, handleSubmit]);

  return (
    <Dialog open={openState} onClose={handleClose}>
      <DialogTitle>Modifer le Plat </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Pour Modifer un plat , remplir les champs que vous voulez modifier
          s'il vous plait.
        </DialogContentText>
        <TextField
          style={{ maxWidth: 300 }}
          autoFocus
          margin="dense"
          id="name"
          label="Titre"
          type="text"
          fullWidth
          variant="standard"
          value={updateTitle}
          onChange={(e) => setUpdateTitle(e.target.value as string)}
        />
        <Box sx={{ maxWidth: 200, marginTop: 20, marginBottom: 20 }}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              value={updateType}
              onChange={(e) => setUpdateType(e.target.value as string)}
            >
              <MenuItem value={'Plat'}>Plat</MenuItem>
              <MenuItem value={'Boisson'}>Boisson</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <TextField
          style={{ minWidth: 300 }}
          id="outlined-textarea"
          label="Description"
          placeholder="Description"
          multiline
          value={updateDescription}
          onChange={(e) => setUpdateDescription(e.target.value as string)}
        />
        <Button
          component="label"
          variant="outlined"
          startIcon={<CloudUpload />}
          style={{ marginTop: 20 }}
        >
          Upload Image
          <VisuallyHiddenInput
          
            type="file"
            onChange={(e) => {
              setUpdateImage(e.target.files[0]);
              setImageName(e.target.files[0].name as string);
            }}
          />
          <InputLabel id="demo-simple-select-label" sx={{ marginLeft: 10 }}>
            {imageName}
          </InputLabel>
        </Button>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          onClick={() =>
            handleSubmit(
              id,
              updateTitle,
              updateType,
              updateDescription,
              updateImage
            )
          }
        >
          Modifier
        </Button>
      </DialogActions>
    </Dialog>
  );
};
