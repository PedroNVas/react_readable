import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

import { getDate, getTime } from '../../utils/AppUtils'

class SubHeaderCard extends PureComponent {

  static propTypes = {
    author: PropTypes.string.isRequired,
    timestamp: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
  }

  render () {

    const {author, timestamp, opacity} = this.props

    return (
      <Grid container spacing={8} style={{opacity}}>
        <Grid item xs={12} sm={12}>
          <Typography variant='body2' gutterBottom>
            {`posted by ${author}`}
          </Typography>
          <Typography variant="caption" gutterBottom>
            {` on ${getDate(timestamp)} @ ${getTime(timestamp)}`}
          </Typography>
        </Grid>
      </Grid>
    )
  }
}

export default SubHeaderCard