import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/es/CardContent'
import CardHeader from '@material-ui/core/es/CardHeader'
import Grid from '@material-ui/core/es/Grid'
import TextField from '@material-ui/core/es/TextField'
import Typography from '@material-ui/core/es/Typography'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { cancelAddNewPost, createPost } from '../../../actions/PostsActions'
import AvatarCard from '../../Card/AvatarCard'
import Confirm from '../../Complementary/Confirm'

const style = {
  card: {
    margin: '2% 0% 0% 20%',
    width: '60%'
  }
}

export class CreatePost extends PureComponent {

  state = {
    postTitle: null,
    postBody: null,
    postAuthor: null,
    postCategory: null
  }

  static getDerivedStateFromProps (props, state) {
    if (state.postTitle === null || state.postBody === null ||
      state.postAuthor === null || state.postCategory === null) {

      let postCategory = ''

      if (props.postCreateState.post.category !== undefined) {
        postCategory = props.postCreateState.post.category
      }

      return {
        postTitle: '',
        postBody: '',
        postAuthor: '',
        postCategory
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

    const {post} = this.props.postCreateState
    const {postTitle, postBody, postAuthor, postCategory} = this.state

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
                  label="Post author"
                  value={postAuthor}
                  onChange={this.handleChange('postAuthor')}
                  margin="normal"
                />
              </Grid>
            </Grid>
          }
          title={
            <Grid container spacing={8}>
              <Grid item xs={12} sm={12} style={{display: 'flex'}}>
                <TextField
                  id="title"
                  label="Post Title"
                  value={postTitle}
                  onChange={this.handleChange('postTitle')}
                  margin="normal"
                  fullWidth
                  multiline
                />
              </Grid>
            </Grid>
          }
        />

        <CardContent>
          <TextField
            id="body"
            label="Post body"
            value={postBody}
            onChange={this.handleChange('postBody')}
            margin="normal"
            fullWidth
            multiline
          />
          <TextField
            id="category"
            label="Post category"
            value={postCategory}
            onChange={this.handleChange('postCategory')}
            margin="normal"
            fullWidth
            multiline
          />
        </CardContent>

        <Confirm
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelAddNewPost()}
          secondButtonText='Create'
          secondButtonCallback={() =>
            this.props.createPost(post.id, postTitle, postBody, postAuthor, postCategory)} />

      </Card>
    )
  }
}

const mapStateToProps = state => {
  return {
    postCreateState: state.postCreate
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelAddNewPost: () => dispatch(cancelAddNewPost()),
    createPost: (postId, postTitle, postBody, postAuthor, postCategory) => dispatch(createPost(postId, postTitle, postBody, postAuthor, postCategory))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost)