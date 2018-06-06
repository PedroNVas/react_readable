import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { cancelEditPost, updatePost } from '../../../actions/PostsActions'
import AvatarCard from '../../Card/AvatarCard'
import HeaderCard from '../../Card/HeaderCard'
import SubHeaderCard from '../../Card/SubHeaderCard'
import Creating from '../../Creating/Creating'

const style = {
  card: {
    margin: '2% 0% 0% 20%',
    width: '60%'
  }
}

export class EditPost extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  state = {
    postTitle: null,
    postBody: null
  }

  static getDerivedStateFromProps (props, state) {
    const {data} = props
    if (state.postBody === null || state.postTitle === null) {
      return {
        postTitle: data.title,
        postBody: data.body
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
          avatar={<AvatarCard opacity={0.3} voteScore={data.voteScore} />}
          title={headerTitle}
          subHeader={<SubHeaderCard author={data.author} timestamp={data.timestamp}
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
                {`${data.commentCount} comment(s)`}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <Creating
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelEditPost(data.id)}
          secondButtonText='Edit'
          secondButtonCallback={() => this.props.updatePost(data.id, postTitle, postBody)}
          data={data} />

      </Card>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    cancelEditPost: postId => dispatch(cancelEditPost(postId)),
    updatePost: (postId, postTitle, postBody) => dispatch(updatePost(postId, postTitle, postBody))
  }
}

export default connect(null, mapDispatchToProps)(EditPost)