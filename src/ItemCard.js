import React, { useState, useEffect } from 'react';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: '100%',
  },
  image: {
    width: '100%',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    backgroundColor: red[500],
  },
}));

export const ItemCard = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const {details} = props;
  console.log(details);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
 
  return (
    <>
    <Card className={classes.root}>
      <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            <img className={classes.image} src={details.GodImageUrl} />
          </Avatar>
        }
        title={<Typography variant='h5'>{details.GodAppTitle}</Typography>}
        subheader={`\u00a5${details.GodPresentPrice}`}
      />
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography variant='h5'>商品名称</Typography>
          <Typography paragraph>{details.GodName}</Typography>
          <Typography variant='h5'>商品价格</Typography>
          <Typography paragraph>{details.GodPresentPrice}</Typography>
          <Typography variant='h5'>商品规格</Typography>
          <Typography paragraph>{details.GodSpecification}</Typography>
          <Typography variant='h5'>商品库存</Typography>
          <Typography paragraph>{details.GodSellStock}</Typography>
          <Typography variant='h5'>商品文案</Typography>
          <Typography paragraph>{details.GodAppDescribe}</Typography>
          <img className={classes.image} src={details.GodImageUrl} />
          <Typography variant='h5'>其他</Typography>
          <Typography paragraph>{`id: ${details.GodId}`}</Typography>
          <Typography paragraph>{`Code: ${details.GodCode}`}</Typography>
          <Typography paragraph>{`Barcode: ${details.GodBarcode}`}</Typography>
          <Typography paragraph>{`Brand: ${details.GodBrand}`}</Typography>
          <Typography paragraph>{`Num: ${details.GodNum}`}</Typography>
          <Typography paragraph>{`Weight: ${details.GodWeight}`}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );

};
