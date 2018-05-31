import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Modal from '@material-ui/core/Modal'
import Typography from '@material-ui/core/Typography'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { fetchComments } from '../../actions/CommentsActions'
import { deletePost, downVotePost, upVotePost } from '../../actions/PostsActions'
import { firstLetter, stringifyDate } from '../../utils/AppUtils'
import AdditionalActions from '../AdditionalActions/AdditionalActions'
import Comment from '../Comment/Comment'
import Voting from '../Voting/Voting'

const style = {
  card: {
    margin: '2% 0% 0% 20%',
    width: '60%'
  }
}

export class Post extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  state = {
    showContent: false,
    showVoting: false,
    raised: false,
    modalOpen: false
  }

  showContent = () => {
    this.setState({showContent: !this.state.showContent})
  }

  raiseCard = () => {
    this.setState({raised: true, showVoting: true})
  }

  unRaiseCard = () => {
    this.setState({raised: false, showVoting: false})
  }

  deletePost = () => {
    // this.setState({modalOpen: true})

    const {id} = this.props.data
    this.props.deletePost(id)
  }

  closeModal = () => {
    this.setState({modalOpen: false})
  }

  componentWillMount () {
    const {id} = this.props.data
    this.props.fetchComments(id)
  }

  render () {

    const {data, commentsState} = this.props
    const {showContent, showVoting, raised, modalOpen} = this.state

    const expandIcon = showContent ? <ExpandLessIcon /> : <ExpandMoreIcon />
    const voteScore = data.voteScore > 0 ? <i className="em-svg em-smile" /> : <i
      className="em em-disappointed"></i>

    const subHeader = `posted by ${data.author} @ ${stringifyDate(data.timestamp)}`

    return (
      <div>
        <div style={{display: 'flex'}}>
          <Card raised={raised} onMouseEnter={this.raiseCard} onMouseLeave={this.unRaiseCard}
                style={{...style.card, backgroundColor: raised ? '#f2f2f2' : '#FFFFFF'}}>
            <CardHeader
              avatar={
                <Avatar>
                  {firstLetter(data.author)}
                </Avatar>
              }
              action={
                <IconButton onClick={this.showContent}>
                  {expandIcon}
                </IconButton>
              }
              title={data.title}
              subheader={subHeader}
            />
            <Collapse in={showContent} unmountOnExit>
              <CardContent>
                <Typography component="p">
                  {data.body}
                </Typography>
              </CardContent>
            </Collapse>

            <Badge badgeContent={data.voteScore} color="primary">
              {voteScore}
            </Badge>

            <Modal open={modalOpen} onClose={this.closeModal}>
              <span style={{width: '50px', height: '50px'}}>Are you sure?</span>
            </Modal>

            <Voting
              sectionType='post'
              id={data.id}
              upVote={this.props.upVotePost}
              downVote={this.props.downVotePost}
              show={showVoting}
            />

          </Card>

          <AdditionalActions
            showing={showContent}
            isComment={false}
            id={data.id}
            onDelete={this.deletePost} />
          {/*https://material-ui.com/demos/dialogs/ TO DELETE POST*/}
        </div>

        {
          commentsState.comments.get(data.id) &&
          commentsState.comments.get(data.id).map(content => {
            return !content.deleted ? <Comment key={content.id} data={content} /> : null
          })
        }

      </div>

    )
  }
}

const mapStateToProps = state => {
  return {
    commentsState: state.comments,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upVotePost: postId => dispatch(upVotePost(postId)),
    downVotePost: postId => dispatch(downVotePost(postId)),
    fetchComments: postId => dispatch(fetchComments(postId)),
    deletePost: postId => dispatch(deletePost(postId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Post)