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

class Voting extends PureComponent {

  static propTypes = {
    sectionType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    voteCallback: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
  }

  render () {

    const {sectionType, id, show, voteCallback} = this.props

    const upVoteTitle = `Up vote ${sectionType}`
    const downVoteTitle = `Down vote ${sectionType}`

    return (
      <Grow in={show}>
        <div>
          <Divider inset />
          <Grid container spacing={24} justify='center'>
            <Grid item xs={12} sm={6} style={style.iconButton}>
              <Tooltip title={upVoteTitle} placement="right" >
                <IconButton onClick={() => voteCallback(id, 'upVote')} >
                  <UpVote />
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item xs={12} sm={6} style={style.iconButton}>
              <Tooltip title={downVoteTitle} placement="left">
                <IconButton onClick={() => voteCallback(id, 'downVote')}>
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

export default Voting