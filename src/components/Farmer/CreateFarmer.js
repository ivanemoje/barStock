import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import InputMask from "react-input-mask";
import Button from "@material-ui/core/Button";

import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import firebase from "../common/firebase";

const styles = theme => ({});


const drinks = [
  {
    value: "Beer",
    label: "Beer"
  },
  {
    value: "Soda",
    label: "Soda"
  }
];

const lookup = {
  Beer: [
    { id: "1", text: "Nile Special" },
    { id: "2", text: "Club" },
    { id: "3", text: "Nile Gold" },
    { id: "4", text: "Guiness" },
    { id: "5", text: "Castle Lager" }
  ],
  Soda: [
    { id: "1", text: "Mirinda Berry" },
    { id: "2", text: "Mirinda Orange" },
    { id: "3", text: "Coca Cola" },
    { id: "4", text: "Sprite" },
    { id: "5", text: "Coca Cola Zero" },
    { id: "6", text: "Pepsi" },
    { id: "7", text: "Stoney" },
    { id: "8", text: "Krest" },
    { id: "9", text: "Rock Boom" },
    { id: "10", text: "Soda 2" },
    { id: "11", text: "Soda 3" }
  ]
};

class CreateFarmer extends React.Component {
  constructor() {
    super();
    this.state = {


      drink: "",
      brand: "",
      
      matureTrees: "",
      immatureTrees: "",
      hectarage: "",

      dataValue: "Beer"
    };
  }

  capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  onChangeDrink = e => {
    this.setState({
      dataValue: e.target.value,
      drink: e.target.value,
      brand: ""
    });
    console.log(e.target.value);
  };

  onChange = e => {
    /*
          Because we named the inputs to match their
          corresponding values in state, it's
          super easy to update the state
        */
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();

    // get our form data out of state
    const farmer = {
      // firstname: this.capitalize(this.state.firstname),
      // lastname: this.capitalize(this.state.lastname),

      drink: this.state.drink,
      brand: this.state.brand,

      matureTrees: this.state.matureTrees,
      immatureTrees: this.state.immatureTrees,
      hectarage: this.state.hectarage,
      created: new Date().toLocaleString("en-GB", {
        timeZone: "Africa/Maputo"
      })
    };

    console.log(farmer);

    //Save farmer module
    const farmersRef = firebase.database().ref("farmers");

    farmersRef.push(farmer);
    this.setState({
      // firstname: "",
      // lastname: "",

      drink: "",
      brand: "",

      matureTrees: "",
      immatureTrees: "",
      hectarage: ""
    });
  };

  render() {
    const {
      // firstname,
      // lastname,
      matureTrees,
      immatureTrees,
      hectarage
    } = this.state;

    const { dataValue } = this.state;
    const options = lookup[dataValue];

    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <br />

          <Typography variant="headline" align="left" color="inherit">
            Details
          </Typography>

          <Grid container spacing={24}>
           
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="drink"
                select
                name="drink"
                value={this.state.drink}
                onChange={this.onChangeDrink}
                label="Drink"
                fullWidth
                helperText="Please select drink"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {drinks .map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="brand"
                select
                name="brand"
                value={this.state.brand}
                onChange={this.onChange}
                label="Brand"
                fullWidth
                helperText="Please select the Brand"
                InputLabelProps={{
                  shrink: true
                }}
              >
                {options.map(option => (
                  <MenuItem key={option.id} value={option.text}>
                    {option.text}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={12}>
              <Typography variant="headline" align="left" color="inherit">
                Stock History and Status
              </Typography>
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="matureTrees"
                name="matureTrees"
                value={matureTrees}
                onChange={this.onChange}
                label="Number of mature trees"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="immatureTrees"
                name="immatureTrees"
                value={immatureTrees}
                onChange={this.onChange}
                label="Number of immature trees"
                helperText="(below 3 years)"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={6} sm={6}>
              <TextField
                required
                id="hectarage"
                name="hectarage"
                value={hectarage}
                onChange={this.onChange}
                label="Hectarage under cultivation"
                helperText="(Enter in Acres)"
                type="number"
                fullWidth
                autoComplete="off"
              />
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                color="secondary"
              >
                Save Stock
              </Button>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

export default withStyles(styles)(CreateFarmer);
