import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({
  bigAvatar: {
    width: 200,
    height: 200
  }
});

class RegistrationSummary extends React.Component {
  constructor() {
    super();
    this.state = {
      numOfFarmers: "",
      beer: 0,
      soda: 0,

    };
  }

  componentDidMount() {
    // Get Farmer count
    const farmersRef = firebase.database().ref("stock");
    farmersRef.on("value", snapshot => {
      const farmerCount = snapshot.numChildren();
      this.setState({
        numOfFarmers: farmerCount
      });
    });

    // Get gender count
    const query = firebase
      .database()
      .ref("stock")
      .orderByKey();
    query.on("value", snapshot => {
      let beerCounter = 0;
      let sodaCounter = 0;
      snapshot.forEach(function(childSnapshot) {
        // Verify gender before incrementing by sex
        const isMale = childSnapshot.child("drink").val() === "Beer";

        if (isMale) {
          beerCounter += 1;
        } else {
          sodaCounter += 1;
        }
      });

      this.setState({
        beer: beerCounter,
        soda: sodaCounter
      });

     });


  }
  render() {
    const { classes } = this.props;

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <Card className={classes.card}>
            <CardContent align="center">
              <Typography variant="headline" align="center" color="default">
                Saved Stock Summary
              </Typography>
              <br />
              <Avatar
                alt="Remy Sharp"
                src="/static/images/avatar/farmers.jpeg"
                className={classes.bigAvatar}
              />
              <br />
              <br />
              <Grid container spacing={24}>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Total
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.numOfFarmers}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Beers
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.beer}
                  </Typography>
                </Grid>
                <Grid item xs={4} sm={4}>
                  <Typography variant="title" gutterBottom align="center">
                    Sodas
                  </Typography>
                  <Typography
                    variant="headline"
                    gutterBottom
                    align="center"
                    color="primary"
                  >
                    {this.state.soda}
                  </Typography>
                </Grid>
              </Grid>
              <br />
            </CardContent>
          </Card>
          <br />

          <br />
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(RegistrationSummary);
