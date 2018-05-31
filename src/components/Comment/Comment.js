import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { deleteComment, downVoteComment, upVoteComment } from '../../actions/CommentsActions'
import { firstLetter, stringifyDate } from '../../utils/AppUtils'
import AdditionalActions from '../AdditionalActions/AdditionalActions'
import Voting from '../Voting/Voting'

const style = {
  card: {
    margin: '1% 0% 0% 40%',
    width: '40%'
  }
}

export class Comment extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  state = {
    showVoting: false,
    raised: false,
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
    const {raised, showVoting} = this.state

    const voteScore = data.voteScore > 0 ? <i className="em-svg em-smile" /> : <i
      className="em em-disappointed"></i>
    const subHeader = `posted by ${data.author} @ ${stringifyDate(data.timestamp)}`

    return (
      <div style={{display: 'flex'}} onMouseEnter={this.raiseCard} onMouseLeave={this.unRaiseCard}>
        <Card raised={raised}
              style={{...style.card, backgroundColor: raised ? '#fffbf0' : '#FFFFFF'}}>
          <CardHeader
            avatar={
              <Avatar>
                {firstLetter(data.author)}
              </Avatar>
            }
            title={data.title}
            subheader={subHeader}
          />

          <CardContent>
            <Typography component="p">
              {data.body}
            </Typography>
          </CardContent>

          <div>
            <Badge badgeContent={data.voteScore} color="primary">
              {voteScore}
            </Badge>
          </div>

          <Voting
            sectionType='comment'
            id={data.id}
            upVote={this.props.upVoteComment}
            downVote={this.props.downVoteComment}
            show={showVoting}
          />
        </Card>

        <AdditionalActions
          showing={showVoting}
          isComment={true}
          id={data.id}
          onDelete={this.deleteComment} />

      </div>

    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upVoteComment: commentId => dispatch(upVoteComment(commentId)),
    downVoteComment: commentId => dispatch(downVoteComment(commentId)),
    deleteComment: commentId => dispatch(deleteComment(commentId))
  }
}

export default connect(null, mapDispatchToProps)(Comment)