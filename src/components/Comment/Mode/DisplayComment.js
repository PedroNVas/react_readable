import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Typography from "@material-ui/core/Typography";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import {
  deleteComment,
  fetchCommentDetails,
  voteOnComment
} from "../../../actions/CommentsActions";
import AvatarCard from "../../Card/AvatarCard";
import SubHeaderCard from "../../Card/SubHeaderCard";
import Actions from "../../Complementary/Actions";
import Vote from "../../Complementary/Vote";

const style = {
  card: {
    margin: "3% 0% 0% 40%",
    width: "40%"
  }
};

export class DisplayComment extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  state = {
    showVoting: false,
    showActions: false,
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

  deleteComment = commentId => {
    this.props.deleteComment(commentId);
  };

  render () {

    const { data, isLoading } = this.props;
    const { raised, showVoting, showActions } = this.state;

    const headerAction = (
      <Tooltip title={!showActions ? "Show actions" : "Hide actions"} placement='top'>
        <IconButton onClick={this.showActions}>
          {showActions ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Tooltip>
    );

    return (
      <div style={{ display: "flex" }}>
        <Card raised={raised}
              onMouseEnter={this.raiseCard}
              onMouseLeave={this.unRaiseCard}
              style={{ ...style.card, backgroundColor: raised ? "#f7f7f7" : "#FFFFFF" }}>

          <CardHeader
            avatar={
              <AvatarCard voteScore={data.voteScore} opacity={1} />
            }
            action={headerAction}
            subheader={
              <SubHeaderCard author={data.author} timestamp={data.timestamp} opacity={1} />
            }
          />

          <CardContent>
            <Typography component="p">
              {data.body}
            </Typography>
          </CardContent>

          <Vote
            type='comment'
            showing={showVoting}
            upVoteCallBack={() => this.props.voteOnComment(data.id, "upVote")}
            downVoteCallback={() => this.props.voteOnComment(data.id, "downVote")} />
        </Card>

        <Actions
          showing={showActions}
          isComment={true}
          isDetails={false}
          deleteCallback={() => this.deleteComment(data.id)}
          editCallback={() => this.props.fetchCommentDetails(data.id)} />

      </div>

    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    voteOnComment: (commentId, voteType) => dispatch(voteOnComment(commentId, voteType)),
    deleteComment: commentId => dispatch(deleteComment(commentId)),
    fetchCommentDetails: commentId => dispatch(fetchCommentDetails(commentId))
  };
};

export default connect(null, mapDispatchToProps)(DisplayComment);