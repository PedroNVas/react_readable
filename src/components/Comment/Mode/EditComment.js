import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import TextField from '@material-ui/core/es/TextField'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { cancelEditComment, updateComment } from '../../../actions/CommentsActions'
import AvatarCard from '../../Card/AvatarCard'
import SubHeaderCard from '../../Card/SubHeaderCard'
import Creating from '../../Creating/Creating'

const style = {
  card: {
    margin: '3% 0% 0% 40%',
    width: '40%'
  }
}

export class EditComment extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  }

  state = {
    commentBody: null
  }

  static getDerivedStateFromProps (props, state) {
    const {data} = props
    if (state.commentBody === null) {
      return {
        commentBody: data.body
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

    const {data} = this.props
    const {commentBody} = this.state

    return (
      <Card raised={true}
            style={{...style.card, backgroundColor: '#f1f8fd'}}>
        <CardHeader
          avatar={<AvatarCard voteScore={data.voteScore} opacity={0.3} />}
          subheader={<SubHeaderCard author={data.author} timestamp={data.timestamp}
                                    opacity={0.3} />}
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

        <Creating
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelEditComment(data.id)}
          secondButtonText='Edit'
          secondButtonCallback={() => this.props.updateComment(data.id, commentBody)}
          data={data} />
        
      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelEditComment: postId => dispatch(cancelEditComment(postId)),
    updateComment: (postId, commentBody) => dispatch(updateComment(postId, commentBody))
  }
}

export default connect(null, mapDispatchToProps)(EditComment)