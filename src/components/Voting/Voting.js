import Divider from '@material-ui/core/Divider'
import Grow from '@material-ui/core/Grow'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import DownVote from '@material-ui/icons/ThumbDown'
import UpVote from '@material-ui/icons/ThumbUp'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

class Voting extends PureComponent {

  static propTypes = {
    sectionType: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    upVote: PropTypes.func.isRequired,
    downVote: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
  }

  render () {

    const {sectionType, id, upVote, downVote, show} = this.props

    const upVoteTitle = `Up vote ${sectionType}`
    const downVoteTitle = `Down vote ${sectionType}`

    return (
      <Grow in={show}>
        <div>
          <Divider inset />
          <Tooltip title={upVoteTitle} placement="bottom">
            <IconButton onClick={() => upVote(id)}>
              <UpVote />
            </IconButton>
          </Tooltip>

          <Tooltip title={downVoteTitle} placement="bottom">
            <IconButton onClick={() => downVote(id)}>
              <DownVote />
            </IconButton>
          </Tooltip>
        </div>
      </Grow>
    )
  }
}

export default Voting