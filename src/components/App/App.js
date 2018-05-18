import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { fetchAllCategories } from '../../actions/CategoriesActions'
import './App.css'

export class App extends Component {

  static propTypes = {
    populateCategories: PropTypes.func.isRequired,
  }

  componentDidMount () {
    this.props.populateCategories()
  }

  render () {

    const {categoriesState} = this.props
    const {categories, success, loading, failed, failReason} = categoriesState

    console.log('CATEGORIES', categories)
    console.log('SUCCESS', success)
    console.log('LOADING', loading)
    console.log('FAILED', failed)
    console.log('FAILED REASON', failReason)

    return (
      <div>
        {categories.map(e => <li key={e.name}>{e.name} and {e.path}</li>)}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    categoriesState: state.categories,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    populateCategories: () => dispatch(fetchAllCategories()),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
