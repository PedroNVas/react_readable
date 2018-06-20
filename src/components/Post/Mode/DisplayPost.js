import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deletePost, editPost, voteOnPost } from "../../../actions/PostsActions";
import { categoryLogo } from "../../../utils/AppUtils";
import AvatarCard from "../../Card/AvatarCard";
import SubHeaderCard from "../../Card/SubHeaderCard";
import Actions from "../../Complementary/Actions";
import Vote from "../../Complementary/Vote";

const style = {
  card: {
    margin: "2% 0% 0% 20%",
    width: "60%"
  },
  logo: {
    margin: "25% 0% 0% 0%"
  }
};

export class DisplayPost extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    isDetails: PropTypes.bool.isRequired
  };

  state = {
    showActions: false,
    showVoting: false,
    raised: false
  };

  showActions = () => {
    this.setState({ showActions: !this.state.showActions });
  };

  raiseCard = () => {
    this.setState({ raised: true, showVoting: true });
  };

  unRaiseCard = () => {
    this.setState({ raised: false, showVoting: false });
  };

  render() {

    const { data, isDetails } = this.props;
    const { showVoting, showActions, raised } = this.state;

    const headerAction = (
      <Grid container spacing={8}>
        <Grid item>
          <Link to={`/${data.category}`}>
            {categoryLogo(data.category, 30, style.logo)}
          </Link>
        </Grid>
        <Grid item>
          <Tooltip
            title={!showActions ? "Show actions" : "Hide actions"}
            placement='top'
            enterDelay={100}
            leaveDelay={250}>
            <IconButton onClick={this.showActions}>
              {showActions ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>
          </Tooltip>
        </Grid>
      </Grid>
    );

    const headerTitle = (
      <Typography variant='title'>
        {data.title}
      </Typography>
    );

    const header = (
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
    );

    const numComments = isDetails ? (
      <Typography variant="caption" gutterBottom align="right">
        {`${data.commentCount} comment(s)`}
      </Typography>
    ) : (
      <Link to={`/${data.category}/${data.id}`}>
        <Typography variant="caption" gutterBottom align="right">
          {`${data.commentCount} comment(s)`}
        </Typography>
      </Link>
    );

    const content = (
      <CardContent>
        <Grid container spacing={24} justify='center'>
          <Grid item xs={12} sm={12} style={{ margin: "0% 5% 0% 5%" }}>
            <Typography variant='body1' gutterBottom noWrap={false}>
              {data.body}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12}>
            {numComments}
          </Grid>
        </Grid>
      </CardContent>
    );

    return (
      <div style={{ display: "flex" }}>
        <Card raised={raised}
              onMouseEnter={this.raiseCard}
              onMouseLeave={this.unRaiseCard}
              style={{ ...style.card, backgroundColor: raised ? "#f7f7f7" : "#FFFFFF" }}>

          {header}
          {content}

          <Vote
            type='post'
            showing={showVoting}
            upVoteCallBack={() => this.props.voteOnPost(data.id, "upVote")}
            downVoteCallback={() => this.props.voteOnPost(data.id, "downVote")} />

        </Card>

        <Actions
          showing={showActions}
          isComment={false}
          isDetails={isDetails}
          data={data}
          deleteCallback={() => this.props.deletePost(data.id)}
          editCallback={() => this.props.editPost(data)} />
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    voteOnPost: (postId, voteType) => dispatch(voteOnPost(postId, voteType)),
    deletePost: postId => dispatch(deletePost(postId)),
    editPost: post => dispatch(editPost(post))
  };
};

export default connect(null, mapDispatchToProps)(DisplayPost);