import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Collapse from "@material-ui/core/Collapse";
import Divider from "@material-ui/core/Divider";
import FormControlLabel from "@material-ui/core/es/FormControlLabel/FormControlLabel";
import FormGroup from "@material-ui/core/es/FormGroup/FormGroup";
import Switch from "@material-ui/core/es/Switch/Switch";
import Typography from "@material-ui/core/es/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Paper from "@material-ui/core/Paper";
import RefreshIcon from "@material-ui/icons/Refresh";
import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCategories } from "../../actions/CategoriesActions";
import { capitalize, categoryLogo } from "../../utils/AppUtils";
import Sort from "../Complementary/Sort";

const style = {
  title: {
    fontFamily: "'Raleway', regular",
    fontSize: "35px",
    textAlign: "center",
    margin: "13% 0% 0% 0%"
  },
  fontStyle: {
    fontFamily: "'Raleway', regular",
    fontSize: "20px"
  },
  logo: {
    margin: "7% 0% 0% 0%"
  },
  logoText: {
    textAlign: "center"
  },
  paper: {
    textAlign: "center",
    margin: "2% 10% 0% 10%"
  },
  button: {
    display: "inline-grid",
    margin: "0% 5% 0% 5%"
  },
  input: {
    width: "80%",
    padding: "15px",
    margin: "0% 10% 2% 10%",
    display: "inline-block",
    border: "2px solid #ccc",
    borderRadius: "5px",
    boxSizing: "border-box",
    fontSize: "20px",
    fontFamily: "'Raleway', regular",
    outline: "none"
  }
};

export class Categories extends PureComponent {

  static propTypes = {
    fetchCategories: PropTypes.func.isRequired
  };

  state = {
    selectedCategory: "all",
    fadeOpen: false,
    query: ""
  };

  handleSwitch = () => {
    this.setState({ fadeOpen: !this.state.fadeOpen });
  };

  handleInputChange = (e) => {
    const { value } = e.target;
    this.setState({ query: value });
  };

  componentDidMount () {
    this.props.fetchCategories();
  }

  render () {

    const { categoriesState } = this.props;
    const { categories, success, loading, failed } = categoriesState;

    const { selectedCategory, fadeOpen, query } = this.state;

    const appTitle = (
      <Grid item xs={12} sm={2}>
        <Link to='/' style={{ textDecoration: "none", color: "#1d1508" }}>
          <h1 style={style.title}>Readable</h1>
        </Link>
      </Grid>
    );

    let content = null;

    if (failed) {
      content = (
        <Grid container spacing={24} justify='center'>
          {appTitle}

          <Grid item xs={12} sm={8}>
            <Paper style={style.paper}>
              <h1 style={style.fontStyle}>Couldn't load categories</h1>
              <IconButton onClick={() => window.location.reload()}>
                <RefreshIcon />
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
      );
    } else if (loading) {
      content = (
        <Grid container spacing={24} justify='center'>
          {appTitle}

          <Grid item xs={12} sm={8}>
            <Paper style={style.paper}>
              <CircularProgress />
            </Paper>
          </Grid>
        </Grid>
      );
    } else if (success) {

      content = (
        <div>
          <Grid container spacing={24} justify='center'>
            {appTitle}

            <Grid item xs={12} sm={8}>
              <Paper style={style.paper}>
                <Collapse in={fadeOpen} unmountOnExit>
                  <Typography variant='body2' gutterBottom style={style.fontStyle}>
                    Categories
                  </Typography>
                </Collapse>
                <Button style={style.button}
                        onClick={() => this.setState({ selectedCategory: "all" })}
                        component={Link} to="/">
                  {categoryLogo("all", 50, null)}
                  <Collapse in={fadeOpen}>
                    <p>All</p>
                  </Collapse>
                </Button>
                {categories.map(category => {
                  const routeTo = `/${category.path}`;
                  return (
                    <Button key={category.name}
                            style={style.button}
                            onClick={() => this.setState({ selectedCategory: category.name })}
                            component={Link} to={routeTo}>
                      {categoryLogo(category.name, 50, null)}
                      <Collapse in={fadeOpen}>
                        <p>{category.name}</p>
                      </Collapse>
                    </Button>
                  );
                })}
              </Paper>
            </Grid>

            <Grid item xs={12} sm={2}>
              <div style={style.logoText}>
                {categoryLogo(selectedCategory, 70, style.logo)}
                <Collapse in={fadeOpen}>
                  <h4 style={style.fontStyle}>{`${capitalize(selectedCategory)} selected`}</h4>
                </Collapse>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={24} justify='center' style={{ margin: "1% 0% 0% 0%" }}>
            <Grid item xs={12} sm={2}>
              <Sort opened={fadeOpen} />
            </Grid>
            <Grid item xs={12} sm={8} style={{ textAlign: "center" }}>
              <input
                type='text'
                placeholder='Search by author, post and comment key words'
                value={query}
                onChange={this.handleInputChange}
                style={style.input}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Switch
                      checked={fadeOpen}
                      onChange={this.handleSwitch}
                      color="primary"
                    />
                  }
                  label={fadeOpen ? "Dense" : "Compact"}
                />
              </FormGroup>
            </Grid>
          </Grid>

          <Divider inset />
        </div>
      );
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    categoriesState: state.categories
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
