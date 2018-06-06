import Card from '@material-ui/core/Card'
import CircularProgress from '@material-ui/core/CircularProgress'
import Grid from '@material-ui/core/Grid'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const style = {
  card: {
    margin: '3% 0% 0% 40%',
    width: '40%'
  }
}

export class LoadingComment extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  render () {

    return (
      <Card raised={true} style={style.card}>
        <Grid container spacing={24} justify='center'>

          <Grid item xs={12} sm={12}>
            <CircularProgress />
          </Grid>
        </Grid>

      </Card>
    )
  }
}

export default LoadingComment