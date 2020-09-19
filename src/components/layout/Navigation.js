import Collapse from '@material-ui/core/Collapse';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {
  AccountBalanceWallet,
  Class,
  Create,
  ExpandLess,
  ExpandMore,
  Home,
  InsertChart,
  Payment,
  PostAdd,
  Search,
  TableChart,
} from '@material-ui/icons';
import { makeStyles } from '@material-ui/styles';
import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    background: theme.palette.common.navBackgroundColor,
    color: theme.palette.common.navColor,
    padding: 0,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  iconColor: {
    color: theme.palette.common.navColor,
  },
  navigation: {
    position: 'fixed',
    top: '4rem',
    background: theme.palette.common.navBackgroundColor,
    height: '100%',
    width: theme.outline.navigationWidth,
    overflowX: 'hidden',
  },
}));
const Navigation = () => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <div className={classes.navigation}>
      <List component='nav' aria-labelledby='nested-list-subheader' className={classes.root}>
        <ListItem button component={Link} to='/' selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <Home className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary='Dashboard' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/admission' selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <Create className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary='New Addmission' />
        </ListItem>
        <Divider /  >
        <ListItem
          button
          component={Link}
          to='/search-student'
          selected={selectedIndex === 2}
          onClick={(event) => handleListItemClick(event, 2)}
        >
          <ListItemIcon>
            <Search className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary='Search Student' />
        </ListItem>
        <Divider />
        <ListItem
          button
          component={Link}
          to='/fee-details'
          selected={selectedIndex === 3}
          onClick={(event) => handleListItemClick(event, 3)}
        >
          <ListItemIcon>
            <TableChart className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary='Fee Details' />
        </ListItem>
        <Divider />
        <ListItem button component={Link} to='/set-fees' selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
          <ListItemIcon>
            <InsertChart className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary='Set Fees' />
        </ListItem>
        <Divider />
        <ListItem
          button
          selected={selectedIndex === 5}
          onClick={(event) => {
            handleListItemClick(event, 5);
            handleClick();
          }}
        >
          <ListItemIcon>
            <PostAdd className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary='Add' />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout='auto' unmountOnExit>
          <List component='div' disablePadding>
            <ListItem
              button
              component={Link}
              to='/add-class'
              className={classes.nested}
              selected={selectedIndex === 6}
              onClick={(event) => handleListItemClick(event, 6)}
            >
              <ListItemIcon>
                <Class className={classes.iconColor} />
              </ListItemIcon>
              <ListItemText primary='Class' />
            </ListItem>
          </List>
        </Collapse>
        <Divider />
        <ListItem
          button
          component={Link}
          to='/check-payments'
          selected={selectedIndex === 7}
          onClick={(event) => handleListItemClick(event, 7)}
        >
          <ListItemIcon>
            <Payment className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary='Check Payments' />
        </ListItem>
        <Divider />
        <ListItem
          button
          component={Link}
          to='/check-dues'
          selected={selectedIndex === 8}
          onClick={(event) => handleListItemClick(event, 8)}
        >
          <ListItemIcon>
            <AccountBalanceWallet className={classes.iconColor} />
          </ListItemIcon>
          <ListItemText primary='Check Dues' />
        </ListItem>
        <Divider />
      </List>
    </div>
  );
};

export default Navigation;
