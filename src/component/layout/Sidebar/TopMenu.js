import React, { useState } from "react";
import List from "@mui/material/List";
import { Link } from "react-router-dom";
import {ListItem,Box} from "@mui/material";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { menu } from "./TopMenuData";
import { hasChildren } from "../../../utils/hasChildren";

export default function TopMenu() {
  return menu.map((item, key) => <MenuItem key={key} item={item} />);
}

const MenuItem = ({ item }) => {
  const Component = hasChildren(item) ? MultiLevel : SingleLevel;
  return <Component item={item} />;
};

const SingleLevel = ({ item }) => {
  return (
    <Link to={`/${item.link}`} className="routerLink">
    <ListItem button>
        <ListItemIcon >{item.icon}</ListItemIcon>
      <Link to={`/${item.link}`} className="routerLink">
        <ListItemText primary={item.title} />
      </Link>
    </ListItem>
    </Link>

  );
};

const MultiLevel = ({ item }) => {
  const { items: children } = item;
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };

  return (
    <React.Fragment>
      <ListItem  onClick={handleClick}>
        <ListItemIcon >{item.icon}</ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List sx={{ ml: 2 }} component="div" disablePadding>
          {children.map((child, key) => (
            <MenuItem key={key} item={child} />
          ))}
        </List>
      </Collapse>
    </React.Fragment>
  );
};
