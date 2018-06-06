import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComment, editComment, voteOnComment } from '../../../actions/CommentsActions'
import Actions from '../../Actions/Actions'
import AvatarCard from '../../Card/AvatarCard'
import SubHeaderCard from '../../Card/SubHeaderCard'
import Voting from '../../Voting/Voting'

const style = {
  card: {
    margin: '3% 0% 0% 40%',
    width: '40%'
  }
}

export class DisplayComment extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  state = {
    showVoting: false,
    showActions: false,
    raised: false,
  }

  showActions = () => {
    this.setState({showActions: !this.state.showActions})
  }

  raiseCard = () => {
    this.setState({raised: true, showVoting: true})
  }

  unRaiseCard = () => {
    this.setState({raised: false, showVoting: false})
  }

  deleteComment = () => {
    const {id} = this.props.data
    this.props.deleteComment(id)
  }

  render () {

    const {data} = this.props
    const {raised, showVoting, showActions} = this.state

    const headerAction = (
      <Tooltip title={!showActions ? 'Show actions' : 'Hide actions'} placement='top'>
        <IconButton onClick={this.showActions}>
          {showActions ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Tooltip>
    )

    return (
      <div style={{display: 'flex'}}>
        <Card raised={raised}
              onMouseEnter={this.raiseCard}
              onMouseLeave={this.unRaiseCard}
              style={{...style.card, backgroundColor: raised ? '#f7f7f7' : '#FFFFFF'}}>
          <CardHeader
            avatar={<AvatarCard voteScore={data.voteScore} opacity={1} />}
            action={headerAction}
            subheader={<SubHeaderCard author={data.author} timestamp={data.timestamp}
                                      opacity={1} />}
          />

          <CardContent>
            <Typography component="p">
              {data.body}
            </Typography>
          </CardContent>

          <Voting
            sectionType='comment'
            id={data.id}
            show={showVoting}
            voteCallback={this.props.voteOnComment} />
        </Card>

        <Actions
          showing={showActions}
          isComment={true}
          id={data.id}
          deleteCallback={this.deleteComment}
          editCallback={() => this.props.editComment(data.id)} />

      </div>

    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    voteOnComment: (commentId, voteType) => dispatch(voteOnComment(commentId, voteType)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    editComment: commentId => dispatch(editComment(commentId))
  }
}

export default connect(null, mapDispatchToProps)(DisplayComment)