import Collapse from '@material-ui/core/Collapse'
import FormControl from '@material-ui/core/FormControl'
import FormHelperText from '@material-ui/core/FormHelperText'
import IconButton from '@material-ui/core/IconButton'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import Select from '@material-ui/core/Select'
import Tooltip from '@material-ui/core/Tooltip'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { FaSortAmountAsc, FaSortAmountDesc } from 'react-icons/lib/fa'
import { connect } from 'react-redux'
import { sortPost } from '../../actions/PostsActions'

const style = {
  sorting: {
    textAlign: 'left',
    margin: '0% 20% 0% 20%'
  }
}

export class Sorting extends PureComponent {

  static propTypes = {
    opened: PropTypes.bool.isRequired
  }

  state = {
    sortBy: '',
    orderBy: 'desc'
  }

  orderByIconChange = () => {
    const {sortBy, orderBy} = this.state

    let oppositeOrder

    switch (orderBy) {
      case 'desc':
        oppositeOrder = 'asc'
        this.setState({orderBy: oppositeOrder})
        break

      case 'asc':
        oppositeOrder = 'desc'
        this.setState({orderBy: 'desc'})
        break
    }

    this.props.sortPosts(sortBy, oppositeOrder)
  }

  sortByFormChange = event => {
    this.setState({[event.target.name]: event.target.value})

    this.props.sortPosts(event.target.value, this.state.orderBy)
  }

  orderByIcon = () => {
    const {orderBy} = this.state

    switch (orderBy) {
      case 'asc':
        return <FaSortAmountAsc />

      case 'desc':
      default:
        return <FaSortAmountDesc />
    }
  }

  render () {

    const {opened} = this.props
    const {sortBy, orderBy} = this.state

    const tooltipValue = orderBy === 'asc' ? 'Ascending order' : 'Descending order'

    return (
      <div style={style.sorting}>
        <FormControl>
          <InputLabel htmlFor="sort-by">Sort by</InputLabel>
          <Select
            value={sortBy}
            onChange={this.sortByFormChange}
            inputProps={{
              name: 'sortBy',
              id: 'sort-by',
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            <MenuItem value="voteScore">
              <em>Vote Score</em>
            </MenuItem>
            <MenuItem value='timestamp'>
              <em>Date</em>
            </MenuItem>
          </Select>
          <Collapse in={opened}>
            <FormHelperText>Choose sort setting</FormHelperText>
          </Collapse>
        </FormControl>
        <Tooltip title={tooltipValue} placement='top'>
          <IconButton onClick={this.orderByIconChange}>
            {this.orderByIcon()}
          </IconButton>
        </Tooltip>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    sortPosts: (sortBy, orderBy) => dispatch(sortPost({sortBy, orderBy}))
  }
}

export default connect(null, mapDispatchToProps)(Sorting)