import Divider from '@material-ui/core/Divider'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DownVote from '@material-ui/icons/ThumbDown'
import UpVote from '@material-ui/icons/ThumbUp'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

const style = {
  iconButton: {
    textAlign: 'center',
  }
}

class Vote extends PureComponent {

  static propTypes = {
    type: PropTypes.string.isRequired,
    showing: PropTypes.bool.isRequired,
    upVoteCallBack: PropTypes.func.isRequired,
    downVoteCallback: PropTypes.func.isRequired,
  }

  render () {

    const {type, showing, upVoteCallBack, downVoteCallback} = this.props

    const upVoteTitle = `Up vote ${type}`
    const downVoteTitle = `Down vote ${type}`

    return (
      <Grow in={showing}>
        <div>
          <Divider inset />
          <Grid container spacing={24} justify='center'>
            <Grid item xs={12} sm={6} style={style.iconButton}>
              <Tooltip title={upVoteTitle} placement="right">
                <IconButton onClick={() => upVoteCallBack()}>
                  <UpVote />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item xs={12} sm={6} style={style.iconButton}>
              <Tooltip title={downVoteTitle} placement="left">
                <IconButton onClick={() => downVoteCallback()}>
                  <DownVote />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </div>
      </Grow>
    )
  }
}

export default Vote