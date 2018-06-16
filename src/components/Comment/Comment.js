import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import DisplayComment from "./Mode/DisplayComment";
import EditComment from "./Mode/EditComment";

export class Comment extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired
  };

  render () {

    const { data, commentEdit } = this.props;

    let commentContent = null;

    if (!_.isEmpty(commentEdit) && commentEdit.id === data.id) {
      commentContent = <EditComment />;
    }
    else {
      commentContent = <DisplayComment data={data} />;
    }

    return commentContent;

  }
}

const mapStateToProps = state => {
  return {
    commentEdit: state.commentEdit.comment
  };
};

export default connect(mapStateToProps, null)(Comment);
