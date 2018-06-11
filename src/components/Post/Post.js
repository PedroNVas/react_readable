import PropTypes from "prop-types";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import _ from "underscore";
import DisplayPost from "./Mode/DisplayPost";
import EditPost from "./Mode/EditPost";

class Post extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isDetails: PropTypes.bool.isRequired
  };

  render () {

    const { data, isLoading, isDetails, postEditState } = this.props;

    let postContent = null;

    if (!_.isEmpty(postEditState.post) && postEditState.post.id === data.id) {
      postContent = <EditPost />;
    } else {
      postContent = <DisplayPost data={data} isDetails={isDetails} />;
    }

    return postContent;
  }
}

const mapStateToProps = state => {
  return {
    postEditState: state.postEdit
  };
};

export default connect(mapStateToProps, null)(Post);