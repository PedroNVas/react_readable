import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import DisplayPost from "./Mode/DisplayPost";
import EditPost from "./Mode/EditPost";

class Post extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    isDetails: PropTypes.bool.isRequired
  };

  render () {

    const { data, isDetails, postEdit } = this.props;

    let postContent = null;

    if (!_.isEmpty(postEdit) && postEdit.id === data.id) {
      postContent = <EditPost />;
    } else {
      postContent = <DisplayPost data={data} isDetails={isDetails} />;
    }

    return postContent;
  }
}

const mapStateToProps = state => {
  return {
    postEdit: state.postEdit.post
  };
};

export default connect(mapStateToProps, null)(Post);