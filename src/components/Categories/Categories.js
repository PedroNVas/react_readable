import Button from '@material-ui/core/Button'
import CircularProgress from '@material-ui/core/CircularProgress'
import Collapse from '@material-ui/core/Collapse'
import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import SubjectIcon from '@material-ui/icons/Subject'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import _ from 'underscore'
import { fetchCategories } from '../../actions/CategoriesActions'
import react from '../../static/images/react.png'
import redux from '../../static/images/redux.png'
import udacity from '../../static/images/udacity.png'
import Sorting from '../Sorting/Sorting'
import './Categories.css'

const style = {
  title: {
    fontFamily: '\'Tangerine\', cursive',
    textAlign: 'center',
    margin: '1% 0% 0% 0%'
  },
  logo: {
    textAlign: 'center',
  },
  paper: {
    textAlign: 'center',
    margin: '2% 10% 0% 10%'
  },
  button: {
    display: 'inline-grid',
    margin: '0% 5% 0% 5%',
  },
}

export class Categories extends PureComponent {

  static propTypes = {
    fetchCategories: PropTypes.func.isRequired,
  }

  state = {
    selectedCategory: '',
    fadeOpen: false
  }

  openFade = _.debounce(() => {
    this.setState({fadeOpen: true})
  }, 150)

  closeFade = _.debounce(() => {
    this.setState({fadeOpen: false})
  }, 150)

  renderCategoryLogo = (category, height, animate) => {
    const pixelHeight = `${height}px`
    switch (category) {
      case 'react':
        return animate ? <img src={react} height={pixelHeight} className='logo' /> : <img
          src={react} height={pixelHeight} />

      case 'redux':
        return animate ? <img src={redux} height={pixelHeight} className='logo' /> : <img
          src={redux} height={pixelHeight} />

      case 'udacity':
        return animate ? <img src={udacity} height={pixelHeight} className='logo' /> : <img
          src={udacity} height={pixelHeight} />

      case 'all':
        return animate ? <SubjectIcon style={{fontSize: (height - 5)}} className='logo' /> :
          <SubjectIcon style={{fontSize: (height - 5)}} />

      default:
        return <SubjectIcon style={{fontSize: (height - 5)}} className='logo' />
    }
  }

  componentDidMount () {
    this.props.fetchCategories()
  }

  render () {

    const {categoriesState} = this.props
    const {categories, success, loading, failed} = categoriesState

    const {selectedCategory, fadeOpen} = this.state

    let content = null

    if (failed) {
      content = (
        <Paper style={style.paper}>
          <h3>Couldn't load categories</h3>
          <i className="em-svg em-cry" />
        </Paper>
      )
    } else if (loading) {
      content = (
        <Paper style={style.paper}>
          <p>Loading</p>
          <CircularProgress />
        </Paper>
      )
    } else if (success) {

      content = (
        <div onMouseEnter={this.openFade} onMouseLeave={this.closeFade}>
          <Grid container spacing={24} justify='center'>
            <Grid item xs={12} sm={2} style={style.title}>
              <h1>Readable</h1>
            </Grid>

            <Grid item xs={12} sm={8}>
              <Paper style={style.paper}>
                <Button style={style.button}
                        onClick={() => this.setState({selectedCategory: 'all'})}
                        component={Link} to="/">
                  {this.renderCategoryLogo('all', 50, false)}
                  <Collapse in={fadeOpen}>
                    <p>All</p>
                    <p>Categories</p>
                  </Collapse>
                </Button>
                {categories.map(category => {
                  const routeTo = `/${category.path}`
                  return (
                    <Button key={category.name}
                            style={style.button}
                            onClick={() => this.setState({selectedCategory: category.name})}
                            component={Link} to={routeTo}>
                      {this.renderCategoryLogo(category.name, 50, false)}
                      <Collapse in={fadeOpen}>
                        <p>{category.name}</p>
                      </Collapse>
                    </Button>
                  )
                })}
              </Paper>
            </Grid>

            <Grid item xs={12} sm={2}>
              <div style={style.logo}>
                {this.renderCategoryLogo(selectedCategory, 70, true)}
                <Collapse in={fadeOpen} unmountOnExit>
                  Current Category
                </Collapse>
              </div>
            </Grid>
          </Grid>

          <Grid container spacing={24} justify='center'>
            <Grid item xs={12} sm={6}>
              <Sorting opened={fadeOpen} />
            </Grid>
            <Grid item xs={12} sm={6} style={{textAlign: 'center'}}>
              <input />
            </Grid>
          </Grid>

          <Divider inset />

        </div>
      )
    }

    return content
  }
}

const mapStateToProps = state => {
  return {
    categoriesState: state.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    fetchCategories: () => dispatch(fetchCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories)
