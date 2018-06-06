import PropTypes from 'prop-types'
import React, { Component } from 'react'
import CreateComment from './Mode/CreateComment'
import DisplayComment from './Mode/DisplayComment'
import EditComment from './Mode/EditComment'
import LoadingComment from './Mode/LoadingComment'

export class Comment extends Component {

  static propTypes = {
    data: PropTypes.object.isRequired,
    isLoading: PropTypes.bool.isRequired
  }

  render () {

    const {data, isLoading} = this.props

    let commentContent = null

    if (isLoading) {
      commentContent = <LoadingComment data={data} />
    } else if (data.editMode !== undefined && data.editMode) {
      commentContent = <EditComment data={data} />
    } else if (data.createMode !== undefined && data.createMode) {
      commentContent = <CreateComment data={data} />
    }
    else {
      commentContent = <DisplayComment data={data} />
    }

    return commentContent

  }

}

export default Comment
