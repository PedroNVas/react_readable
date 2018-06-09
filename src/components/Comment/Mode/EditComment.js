import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/es/TextField'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cancelEditComment, updateComment } from '../../../actions/CommentsActions'
import AvatarCard from '../../Card/AvatarCard'
import SubHeaderCard from '../../Card/SubHeaderCard'
import Confirm from '../../Complementary/Confirm'

const style = {
  card: {
    margin: '3% 0% 0% 40%',
    width: '40%'
  }
}

export class EditComment extends Component {

  state = {
    commentBody: null
  }

  static getDerivedStateFromProps (props, state) {
    const {comment} = props.commentEditState
    if (state.commentBody === null) {
      return {
        commentBody: comment.body
      }
    }
    return null
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    })
  }

  render () {

    const {comment} = this.props.commentEditState
    const {commentBody} = this.state

    return (
      <Card raised={true}
            style={{...style.card, backgroundColor: '#f1f8fd'}}>
        <CardHeader
          avatar={
            <AvatarCard voteScore={comment.voteScore} opacity={0.3} />
          }
          subheader={
            <SubHeaderCard author={comment.author} timestamp={comment.timestamp} opacity={0.3} />
          }
        />

        <CardContent>
          <TextField
            id="body"
            label="Edit body"
            value={commentBody}
            onChange={this.handleChange('commentBody')}
            margin="normal"
            fullWidth
            multiline
          />
        </CardContent>

        <Confirm
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelEditComment()}
          secondButtonText='Edit'
          secondButtonCallback={() => this.props.updateComment(comment.id, commentBody)} />

      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    commentEditState: state.commentEdit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelEditComment: () => dispatch(cancelEditComment()),
    updateComment: (commentId, commentBody) => dispatch(updateComment(commentId, commentBody))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditComment)