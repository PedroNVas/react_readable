import Avatar from '@material-ui/core/Avatar'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'

class AvatarCard extends PureComponent {

  static propTypes = {
    voteScore: PropTypes.number.isRequired,
    opacity: PropTypes.number.isRequired,
  }

  render () {

    const {voteScore, opacity} = this.props

    return (
      <Avatar style={
        {
          backgroundColor: voteScore > 0 ? '#dcffd1' : '#ffdbd2',
          color: voteScore > 0 ? '#1c8000' : '#830800',
          opacity,
        }
      }>
        {voteScore}
      </Avatar>
    )
  }
}

export default AvatarCard