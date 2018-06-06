import PropTypes from 'prop-types'
import React, { PureComponent } from 'react'
import CreatePost from './Mode/CreatePost'
import DisplayPost from './Mode/DisplayPost'
import EditPost from './Mode/EditPost'
import LoadingPost from './Mode/LoadingPost'

class Post extends PureComponent {

  static propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  render () {

    const {data, isLoading} = this.props

    let postContent = null

    if (isLoading) {
      postContent = <LoadingPost data={data} />
    } else if (data.createMode !== undefined && data.createMode) {
      postContent = <CreatePost data={data} />
    } else if (data.editMode !== undefined && data.editMode) {
      postContent = <EditPost data={data} />
    } else {
      postContent = <DisplayPost data={data} />
    }

    return postContent
  }
}

export default Post