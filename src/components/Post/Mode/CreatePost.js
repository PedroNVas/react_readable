import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/es/CardContent";
import CardHeader from "@material-ui/core/es/CardHeader";
import FormControl from "@material-ui/core/es/FormControl";
import Grid from "@material-ui/core/es/Grid";
import InputLabel from "@material-ui/core/es/InputLabel";
import MenuItem from "@material-ui/core/es/MenuItem/MenuItem";
import Select from "@material-ui/core/es/Select";
import TextField from "@material-ui/core/es/TextField";
import Typography from "@material-ui/core/es/Typography";
import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { cancelAddNewPost, createPost } from "../../../actions/PostsActions";
import { categoryLogo } from "../../../utils/AppUtils";
import AvatarCard from "../../Card/AvatarCard";
import LoadingCard from "../../Card/LoadingCard";
import Confirm from "../../Complementary/Confirm";
import FailedAction from "../../Complementary/FailedAction";

const style = {
  card: {
    margin: "2% 0% 3% 20%",
    width: "60%"
  }
};

export class CreatePost extends PureComponent {

  state = {
    postTitle: null,
    postBody: null,
    postAuthor: null,
    postCategory: null,
    showing: null
  };

  static getDerivedStateFromProps (props, state) {
    if (state.postTitle === null || state.postBody === null ||
      state.postAuthor === null || state.postCategory === null) {

      let postCategory = "react";

      if (props.postCreateState.post.category !== undefined) {
        postCategory = props.postCreateState.post.category;
      }

      return {
        postTitle: "",
        postBody: "",
        postAuthor: "",
        postCategory,
        showing: true
      };
    }
    return null;
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  render () {

    const { postCreateState } = this.props;
    const { post, success, loading, failed } = postCreateState;

    const { postTitle, postBody, postAuthor, postCategory, showing } = this.state;

    const actionHeader = (
      <FormControl style={{ margin: "12% 0% 0% 0%" }}>
        <InputLabel htmlFor="category">Category</InputLabel>
        <Select
          value={postCategory}
          onChange={this.handleChange("postCategory")}
          inputProps={{
            name: "postCategory",
            id: "category"
          }}
        >
          <MenuItem value="react">
            {categoryLogo("react", 30, null)}
          </MenuItem>
          <MenuItem value="redux">
            {categoryLogo("redux", 30, null)}
          </MenuItem>
          <MenuItem value="udacity">
            {categoryLogo("udacity", 30, null)}
          </MenuItem>
        </Select>
      </FormControl>
    );

    const header = (
      <CardHeader
        avatar={
          <AvatarCard voteScore={0} opacity={0.3} />
        }
        subheader={
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12} style={{ display: "flex" }}>
              <Typography variant='body2' style={{ margin: "5% 3% 0% 0%" }}>
                {`posted by `}
              </Typography>
              <TextField
                id="author"
                label="Author"
                value={postAuthor}
                onChange={this.handleChange("postAuthor")}
                margin="normal"
              />
            </Grid>
          </Grid>
        }
        title={
          <Grid container spacing={8}>
            <Grid item xs={12} sm={12}>
              <TextField
                id="title"
                label="Title"
                value={postTitle}
                onChange={this.handleChange("postTitle")}
                margin="normal"
                fullWidth
                multiline
              />
            </Grid>
          </Grid>
        }
        action={
          actionHeader
        }
      />
    );

    const body = (
      <CardContent>
        <TextField
          id="body"
          label="Body"
          value={postBody}
          onChange={this.handleChange("postBody")}
          margin="normal"
          fullWidth
          multiline
        />
      </CardContent>
    );

    const createPost = (
      <Card
        raised={true}
        style={{ ...style.card, backgroundColor: "#f8fdf6" }}>

        {header}
        {body}

        <Confirm
          firstButtonText='Cancel'
          firstButtonCallback={() => this.props.cancelAddNewPost()}
          secondButtonText='Create'
          secondButtonCallback={() =>
            this.props.createPost(post.id, postTitle, postBody, postAuthor, postCategory)} />

      </Card>
    );

    let content = null;

    if (failed) {
      content = (
        <div style={{ display: "flex" }}>
          {createPost}
          <FailedAction
            isShowing={showing}
            message="Couldn't create the post"
            dismissCallback={() => {
              this.setState({ showing: false });
              this.props.cancelAddNewPost();
            }}
            retryCallback={() => this.props.createPost(post.id, postTitle, postBody, postAuthor, postCategory)} />
        </div>
      );
    } else if (loading) {
      content = (
        <LoadingCard content='Creating post ...' backgroundColor="#f8fdf6"
                     cardStyle={style.card} />
      );
    } else if (success) {
      content = createPost;
    } else {
      content = createPost;
    }

    return content;
  }
}

const mapStateToProps = state => {
  return {
    postCreateState: state.postCreate
  };
};

const mapDispatchToProps = dispatch => {
  return {
    cancelAddNewPost: () => dispatch(cancelAddNewPost()),
    createPost: (postId, postTitle, postBody, postAuthor, postCategory) => dispatch(createPost(postId, postTitle, postBody, postAuthor, postCategory))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CreatePost);