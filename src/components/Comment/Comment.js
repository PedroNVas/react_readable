import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import DisplayComment from "./Mode/DisplayComment";
import EditComment from "./Mode/EditComment";

export class Comment extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  render () {

    const { data, isLoading, commentEditState } = this.props;

    let commentContent = null;

    if (!_.isEmpty(commentEditState.comment) && commentEditState.comment.id === data.id) {
      commentContent = <EditComment />;
    }
    else {
      commentContent = <DisplayComment data={data} isLoading={isLoading} />;
    }

    return commentContent;

  }
}

const mapStateToProps = state => {
  return {
    commentEditState: state.commentEdit
  };
};

export default connect(mapStateToProps, null)(Comment);
