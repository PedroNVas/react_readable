import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { cancelEditPost, updatePost } from '../../../actions/PostsActions'
import AvatarCard from '../../Card/AvatarCard'
import HeaderCard from '../../Card/HeaderCard'
import SubHeaderCard from '../../Card/SubHeaderCard'
import Confirm from '../../Complementary/Confirm'

const style = {
  card: {
    margin: '2% 0% 0% 20%',
    width: '60%'
  }
}

export class EditPost extends PureComponent {

  state = {
    postTitle: null,
    postBody: null
  }

  static getDerivedStateFromProps (props, state) {
    const {post} = props.postEditState
    if (state.postBody === null || state.postTitle === null) {
      return {
        postTitle: post.title,
        postBody: post.body
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

    const {post} = this.props.postEditState

    const {postBody, postTitle} = this.state

    const headerTitle = (
      <TextField
        id="title"
        label="Edit title"
        value={postTitle}
        onChange={this.handleChange('postTitle')}
        margin="normal"
        fullWidth
      />
    )

    return (
      <Card raised={true}
            onMouseEnter={this.raiseCard}
            onMouseLeave={this.unRaiseCard}
            style={{...style.card, backgroundColor: '#f1f8fd'}}>
        <HeaderCard
          avatar={<AvatarCard opacity={0.3} voteScore={post.voteScore} />}
          title={headerTitle}
          subHeader={<SubHeaderCard author={post.author} timestamp={post.timestamp}
                                    opacity={0.3} />} />

        <CardContent>
          <Grid container spacing={24} justify='center'>
            <Grid item xs={12} sm={12}>
              <TextField
                id="body"
                label="Edit body"
                value={postBody}
                onChange={this.handleChange('postBody')}
                margin="normal"
                fullWidth
                multiline
              />
            </Grid>
            <Grid item xs={12} sm={12} style={{opacity: 0.3}}>
              <Typography variant="caption" gutterBottom align="right">
                {`${post.commentCount} comment(s)`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <Confirm
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelEditPost()}
          secondButtonText='Edit'
          secondButtonCallback={() => this.props.updatePost(post.id, postTitle, postBody)} />

      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    postEditState: state.postEdit
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelEditPost: () => dispatch(cancelEditPost()),
    updatePost: (postId, postTitle, postBody) => dispatch(updatePost(postId, postTitle, postBody))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPost)