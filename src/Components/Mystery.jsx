import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import SnakeImg from '../images/image6.png';
import ClockImg from '../images/image7.png';

export default function Mystery() {
    return (
        <>
            <Typography style={{ margin: 'auto', marginTop: "2%", marginBottom: "2%", width: '90%' }} variant="h4" gutterBottom>
                Mystery BOX
            </Typography>
            <Grid container spacing={2} sx={{ margin: '4%' }}>
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345, marginTop: '6%', marginBottom: '6%' }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image={SnakeImg}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Sanke Game
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href="https://manojdhundhalva.github.io/Snake-Game/">
                                <Button variant="contained">Play Now
                                    <OpenInNewOutlinedIcon />
                                </Button>
                            </a>

                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card sx={{ maxWidth: 345, marginTop: '6%', marginBottom: '6%' }}>
                        <CardMedia
                            component="img"
                            alt="green iguana"
                            image={ClockImg}
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                Clock
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <a href="https://manojdhundhalva.github.io/Clock/">
                                <Button variant="contained">See
                                    <OpenInNewOutlinedIcon />
                                </Button>
                            </a>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        </>
    );
}
