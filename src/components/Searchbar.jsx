import React , { useState } from 'react'
import {
TextField,
IconButton,
InputAdornment,
Typography,
Box,
CardContent,
Card,
CardActions,
Button,
CircularProgress,
Dialog,
DialogTitle,
DialogContent,
DialogActions,
CardActionArea
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios';
import Maps from './Maps';


const useStyles = makeStyles(theme => ({

    search:{
        display: "block",
        marginTop:theme.spacing(5),
        width:"50%",
        marginLeft:"auto",
        marginRight:"auto",
        [theme.breakpoints.down("sm")]:{
            width:"100%",
            marginTop: theme.spacing(5)
        }

    },
    result:{
        marginTop: "1rem",
        display:"flex",
        flexDirection:"column",
        alignItems:"center"
    },
    resultCard:{
        width: "50%",
        marginLeft:"auto",
        marginRight: "auto",
        marginTop: "4rem",
        [theme.breakpoints.down("sm")]:{
            width:"98%"
        }
    },
    loading:{
        position: "relative",
        color:"#000000",
        marginTop:"1rem",
        
        
    },
    mapbtn:{
        background:"#f6f6f6",
        "&:hover": {
            background: "#ececec"
        }
    }
}))

 

const Searchbar = () => {
    const classes = useStyles();
    const [ip, setIp] = useState('');
    const [Country, setCountry] = useState('');
    const [ISP, setISP] = useState('');
    const [Region, setRegion] = useState('');
    const [City, setCity] = useState('');
    const [Loading, setLoading] = useState(false);
    const [ipaddr , setipaddr] = useState('');
    const [open, setOpen] = useState(false);
    const [Location, setLocation] = useState([]);
    const [Openmap, setOpenmap] = useState(false);
    const [LocationAvailable, setLocationAvailable] = useState(false);
    const myip = async () =>  {

        const ip =  await axios.get("https://api.ipify.org/")
        
        setIp(ip.data);
        //setipaddr(ip.data)
        
     }
     myip();

     const search = async () =>{ 
        setLoading(true);
         try{

         const ipval = ipaddr ? ipaddr : ip
         console.log(ipval)
         setipaddr(ipval)
         const ipdata = await axios.get("https://geo.ipify.org/api/v1?apiKey=at_TEsM4Gy16IK4mzYfr8gcyAuw6wHgK&ipAddress="+ipval)
         console.log(ipdata)
         setCountry(ipdata.data.location.country)
         setISP(ipdata.data.isp)
         setCity(ipdata.data.location.city)
         setRegion(ipdata.data.location.region)
         console.log(ipdata.data.location.lng)
        setLocation([ipdata.data.location.lat, ipdata.data.location.lng])
         setLocationAvailable(true)
         setLoading(false);

        }
        catch(error){
            // if(error.stat)
            console.log("INVALID IP")
            setOpen(true)
            setLoading(false);
            setipaddr('');
            setCountry('');
            setISP('');
            setCity('');
            setRegion('');
            setLocationAvailable(false);
            setLocation([])

        }
     }

     const handleChange = (e) => {
         e.preventDefault();
         
        let value = e.target.value
        console.log(value)
        let reg = new RegExp("[0-9.]")
        if(reg.test(value) || value===''){
            setipaddr(value)
        }
 
     }
     const handleClose =() =>{
         setOpen(false)
     }

    const handleOpenMap = () => {
        setOpenmap(true)
    }

    return (
        <>
            <Typography 
            align="center" 
            style={{marginTop:"100px"}}
            variant="h6"
            >
                Your present IP Address is : {ip}
            </Typography>
                <br/>
            <Typography variant="body2" align="center">
                Geo-Locate any IP address by searching below
            </Typography>

            <TextField
            className={classes.search}
            variant="outlined" 
            label="ip search"
            required
            placeholder={"present ip: "+ip}
            value = {ipaddr}         
            fullWidth
            onChange= {(e) => {handleChange(e)}}
            InputProps={{
                endAdornment: (
                  <InputAdornment>
                    <IconButton onClick= {search}>
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
            <Box className={classes.result}>
            {
                Loading && <CircularProgress className={classes.loading}/> 
            }
            
               
            

            <Card className={classes.resultCard}>
                <CardActionArea>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        IP Address: <strong> {ipaddr} </strong>
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Country: </strong> {Country}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        <strong>ISP: </strong> {ISP}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        <strong>Region: </strong> {Region}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        <strong>City: </strong> {City}
                    </Typography>

                    
                </CardContent>
                </CardActionArea>
                <CardActions>
                    
                    <Button 
                    className={classes.mapbtn}
                    disabled={!LocationAvailable}
                    onClick={handleOpenMap}
                    >
                        open maps
                    </Button>
                </CardActions>
            </Card>
            {
                Openmap && 
                <Maps location = {Location}
                />
            }
            </Box>
            
            
            <Dialog
            open={open}
            onClose={handleClose}
            >
                <DialogTitle>
                    ERROR
                </DialogTitle>
                <DialogContent>
                    Please enter a valid IP address
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>
                         Retry
                    </Button>
                </DialogActions>

            </Dialog>

        </>
    )
}

export default Searchbar
