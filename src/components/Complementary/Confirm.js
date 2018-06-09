import Button from '@material-ui/core/es/Button'
import Grid from '@material-ui/core/es/Grid'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

class Confirm extends PureComponent {

  static propTypes = {
    firstButtonText: PropTypes.string.isRequired,
    firstButtonCallback: PropTypes.func.isRequired,

    secondButtonText: PropTypes.string.isRequired,
    secondButtonCallback: PropTypes.func.isRequired,
  }

  render () {

    const {firstButtonText, firstButtonCallback, secondButtonText, secondButtonCallback} = this.props

    return (
      <Grid container spacing={24}>
        <Grid item xs={12} sm={12}>
          <Button variant='raised' color="secondary"
                  onClick={() => firstButtonCallback()}>
            {firstButtonText}
          </Button>
          <Button variant='raised' color="primary"
                  onClick={() => secondButtonCallback()}>
            {secondButtonText}
          </Button>
        </Grid>
      </Grid>
    )
  }
}

export default Confirm