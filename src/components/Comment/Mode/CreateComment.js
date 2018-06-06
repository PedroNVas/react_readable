import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/es/CardContent'
import CardHeader from '@material-ui/core/es/CardHeader'
import Grid from '@material-ui/core/es/Grid'
import TextField from '@material-ui/core/es/TextField'
import Typography from '@material-ui/core/es/Typography'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { cancelAddNewComment, createComment } from '../../../actions/CommentsActions'
import AvatarCard from '../../Card/AvatarCard'
import Creating from '../../Creating/Creating'

const style = {
  card: {
    margin: '3% 0% 0% 40%',
    width: '40%'
  }
}

export class CreateComment extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  state = {
    commentAuthor: null,
    commentBody: null
  }

  static getDerivedStateFromProps (props, state) {
    if (state.commentAuthor === null) {
      return {
        commentAuthor: '',
        commentBody: ''
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
    const {commentAuthor, commentBody} = this.state

    return (
      <Card raised={true} style={style.card}>
        <CardHeader
          avatar={<AvatarCard voteScore={0} opacity={0.3} />}
          subheader={
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} style={{display: 'flex'}}>
                <Typography variant='body2' gutterBottom>
                  {`posted by `}
                </Typography>
                <TextField
                  id="author"
                  label="Comment author"
                  value={commentAuthor}
                  onChange={this.handleChange('commentAuthor')}
                  margin="normal"
                />
              </Grid>
            </Grid>
          }
        />

        <CardContent>
          <TextField
            id="body"
            label="Comment body"
            value={commentBody}
            onChange={this.handleChange('commentBody')}
            margin="normal"
            fullWidth
            multiline
          />
        </CardContent>

        <Creating
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelAddNewComment(data.id)}
          secondButtonText='Create'
          secondButtonCallback={() => this.props.createComment(data.id, commentBody, commentAuthor, data.parentId)}
          data={data} />

      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelAddNewComment: commentId => dispatch(cancelAddNewComment(commentId)),
    createComment: (commentId, commentBody, commentAuthor, postId) => dispatch(createComment(commentId, commentBody, commentAuthor, postId))
  }
}

export default connect(null, mapDispatchToProps)(CreateComment)