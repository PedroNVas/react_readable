import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/es/CardContent'
import CardHeader from '@material-ui/core/es/CardHeader'
import Grid from '@material-ui/core/es/Grid'
import TextField from '@material-ui/core/es/TextField'
import Typography from '@material-ui/core/es/Typography'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { cancelAddNewPost, createPost } from '../../../actions/PostsActions'
import AvatarCard from '../../Card/AvatarCard'
import Creating from '../../Creating/Creating'

const style = {
  card: {
    margin: '2% 0% 0% 20%',
    width: '60%'
  }
}

export class CreatePost extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

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

      if (props.data.category !== undefined) {
        postCategory = props.data.category
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

    const {data} = this.props
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

        <Creating
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelAddNewPost(data.id)}
          secondButtonText='Create'
          secondButtonCallback={() => this.props.createPost(data.id, postTitle, postBody, postAuthor, postCategory)}
          data={data} />

      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelAddNewPost: postId => dispatch(cancelAddNewPost(postId)),
    createPost: (postId, postTitle, postBody, postAuthor, postCategory) => dispatch(createPost(postId, postTitle, postBody, postAuthor, postCategory))
  }
}

export default connect(null, mapDispatchToProps)(CreatePost)