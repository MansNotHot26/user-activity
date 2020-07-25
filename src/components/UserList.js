import React, { useContext } from "react";
import { Typography } from "@material-ui/core";
import { userContext } from "../Context";
import ListItem from "@material-ui/core/ListItem";
import SimpleModal from "../components/Modal";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
    marginBottom: "30px",
  },
  list: {
    display: "flex",
    justifyContent: "center",
    color: "lightseagreen",
    fontWeight: "bold",
    fontSize: "x-large",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    fontSize: "x-large",
    fontWeight: "bold",
    color: "lightseagreen",
  },
}));

const UserList = () => {
  const classes = useStyles();
  const [state, setState] = useContext(userContext);
  const { members } = state;
  const handleOpen = (currentId) => {
    setState({ ...state, open: true, id: currentId });
  };

  return (
    <>
      <Typography className={classes.header} variant="h3">
        User List
      </Typography>
      {members !== null && members !== undefined ? (
        members.map((data) => (
          <ListItem
            key={data.id}
            className={classes.list}
            button
            onClick={() => handleOpen(data.id)}
          >
            {data.real_name}
          </ListItem>
        ))
      ) : (
        <div className={classes.loading}>Loading .....</div>
      )}
      <SimpleModal />
    </>
  );
};

export default UserList;
