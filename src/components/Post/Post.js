import Avatar from '@material-ui/core/Avatar'
import Badge from '@material-ui/core/Badge'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Collapse from '@material-ui/core/Collapse'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { deletePost, downVotePost, upVotePost } from '../../actions/PostsActions'
import { firstLetter, stringifyDate } from '../../utils/AppUtils'
import AdditionalActions from '../AdditionalActions/AdditionalActions'
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
    const {id} = this.props.data
    this.props.deletePost(id)
  }

  render () {

    const {data} = this.props
    const {showContent, showVoting, raised} = this.state

    const expandIcon = showContent ? <ExpandLessIcon /> : <ExpandMoreIcon />
    const voteScore = data.voteScore > 0 ? <i className="em-svg em-smile" /> : <i
      className="em em-disappointed"></i>

    const subHeader = `posted by ${data.author} @ ${stringifyDate(data.timestamp)}`

    return (
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
          category={data.category}
          id={data.id}
          onDelete={this.deletePost} />
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    upVotePost: postId => dispatch(upVotePost(postId)),
    downVotePost: postId => dispatch(downVotePost(postId)),
    deletePost: postId => dispatch(deletePost(postId))
  }
}

export default connect(null, mapDispatchToProps)(Post)