import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ChevronLeft from '@material-ui/icons/ChevronLeft'
import ChevronRight from '@material-ui/icons/ChevronRight'
import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, editPost, voteOnPost } from '../../../actions/PostsActions'
import { categoryLogo } from '../../../utils/AppUtils'
import Actions from '../../Actions/Actions'
import AvatarCard from '../../Card/AvatarCard'
import SubHeaderCard from '../../Card/SubHeaderCard'
import Voting from '../../Voting/Voting'

const style = {
  card: {
    margin: '2% 0% 0% 20%',
    width: '60%'
  }
}

export class DisplayPost extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
  }

  state = {
    showActions: false,
    showVoting: false,
    raised: false,
  }

  showActions = () => {
    this.setState({showActions: !this.state.showActions})
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
    const {showVoting, showActions, raised} = this.state

    const headerAction = (
      <div>
        <Link to={`/${data.category}`} style={{margin: '10% 0% 0% 0%'}}>
          {categoryLogo(data.category, 30)}
        </Link>
        <Tooltip title={!showActions ? 'Show actions' : 'Hide actions'} placement='top'>
          <IconButton onClick={this.showActions}>
            {showActions ? <ChevronLeft /> : <ChevronRight />}
          </IconButton>
        </Tooltip>
      </div>
    )

    const headerTitle = (
      <Typography variant='title'>
        {data.title}
      </Typography>
    )

    return (
      <div style={{display: 'flex'}}>
        <Card raised={raised}
              onMouseEnter={this.raiseCard}
              onMouseLeave={this.unRaiseCard}
              style={{...style.card, backgroundColor: raised ? '#f7f7f7' : '#FFFFFF'}}>
          <CardHeader
            avatar={
              <AvatarCard voteScore={data.voteScore} opacity={1} />
            }
            action={headerAction}
            title={headerTitle}
            subheader={
              <SubHeaderCard author={data.author} timestamp={data.timestamp} opacity={1} />
            }
          />

          <CardContent>
            <Grid container spacing={24} justify='center'>
              <Grid item xs={12} sm={12}>
                <Typography variant='body1' gutterBottom style={{margin: '0% 5% 0% 5%'}}>
                  {data.body}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={12}>
                <Link to={`/${data.category}/${data.id}`}>
                  <Typography variant="caption" gutterBottom align="right">
                    {`${data.commentCount} comment(s)`}
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </CardContent>

          <Voting
            sectionType='post'
            id={data.id}
            voteCallback={this.props.voteOnPost}
            show={showVoting} />

        </Card>

        <Actions
          showing={showActions}
          isComment={false}
          category={data.category}
          id={data.id}
          deleteCallback={this.deletePost}
          editCallback={() => this.props.editPost(data.id)} />

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    voteOnPost: (postId, voteType) => dispatch(voteOnPost(postId, voteType)),
    deletePost: postId => dispatch(deletePost(postId)),
    editPost: postId => dispatch(editPost(postId))
  }
}

export default connect(null, mapDispatchToProps)(DisplayPost)