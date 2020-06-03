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
CircularProgress
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search';
import {makeStyles} from '@material-ui/core/styles'
import axios from 'axios';


const useStyles = makeStyles(theme => ({

    search:{
        display: "block",
        marginTop:theme.spacing(15),
        width:"50%",
        marginLeft:"auto",
        marginRight:"auto",
        [theme.breakpoints.down("sm")]:{
            width:"100%",
            marginTop: theme.spacing(10)
        }

    },
    result:{
        marginTop: "1rem"
    },
    resultCard:{
        width: "50%",
        marginLeft:"auto",
        marginRight: "auto",
        marginTop: "2rem",
        [theme.breakpoints.down("sm")]:{
            width:"98%"
        }
    },
    loading:{
        position:"relative",
        color:"#000000",
        
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

    const myip = async () =>  {

        const ip =  await axios.get("https://api.ipify.org/")
        
        setIp(ip.data);
     }
     myip();

     const search = async () =>{ 
        setLoading(true);
         try{

         const ipval = ipaddr ? ipaddr : ip
         console.log(ipval)
         setIp(ipval)
         const ipdata = await axios.get("https://geo.ipify.org/api/v1?apiKey=at_TEsM4Gy16IK4mzYfr8gcyAuw6wHgK&ipAddress="+ipval)
         setCountry(ipdata.data.location.country)
         setISP(ipdata.data.isp)
         setCity(ipdata.data.location.city)
         setRegion(ipdata.data.location.region)
        setLoading(false);

        }
        catch(error){
            // if(error.stat)
            console.log("INVALID IP")
        }
     }

     const handleChange = (e) => {
        let value = e.target.value
        console.log(value)
        let reg = new RegExp("[0-9.]")
        if(reg.test(value) || value===''){
            setipaddr(value)
        }
 
     }

    return (
        <>
            
            <TextField
            className={classes.search}
            variant="outlined" 
            label="ip search"
            required
            placeholder={ip}  
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
            {
                Loading && <CircularProgress className={classes.loading}/> 
            }
            
            <Box className={classes.result}>   
            

            <Card className={classes.resultCard}>
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        IP Address: <strong> {ipaddr} </strong>
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Country: {Country}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        ISP: {ISP}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        Region: {Region}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom>
                        City: {City}
                    </Typography>

                    
                </CardContent>
                <CardActions>
                        <Button>
                            open maps
                        </Button>
                </CardActions>
            </Card>
            </Box>
            


        </>
    )
}

export default Searchbar
