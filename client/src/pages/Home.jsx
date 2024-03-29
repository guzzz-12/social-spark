import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/styles";
import Post from "../components/Post";
import Profile from "../components/Profile";
import PostAddOutlined from "@material-ui/icons/PostAddOutlined";

import {connect} from "react-redux";
import {getPosts} from "../redux/actions/dataActions";

const styles = (theme) => ({
  gridContainer: {
    flexDirection: "row",
    padding: "0 24px",
    margin: "0",
    width: "auto",
    [theme.breakpoints.down(1050)]: {
      flexDirection: "column",
      width: "100%"
    }
  },
  userPostsTitle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    margin: "0.5rem 0 1rem 0",

    [theme.breakpoints.down(1050)]: {
      textAlign: "center"
    }
  },
  posts: {
    flexBasis: "66.7%",
    order: 1,
    [theme.breakpoints.down(1050)]: {
      flexGrow: 1,
      order: 2
    }
  },
  profile: {
    flexBasis: "33.3%",
    order: 2,
    [theme.breakpoints.down(1050)]: {
      flexGrow: 1,
      order: 1
    }
  },
  loaderWrapper: {
    minHeight: "10rem",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
})

class Home extends Component {
  
  componentDidMount() {
    document.title = "Social Spark | Home";
  }

  render() {
    const renderPosts = () => {
      if(this.props.data.posts.length === 0 && this.props.data.loading) {
        return (
          <Paper className={this.props.classes.loaderWrapper}>
            <CircularProgress />
          </Paper>
        )
      } else if(this.props.data.posts.length === 0 && !this.props.data.loading) {
        return <Typography variant="h5">No posts found.</Typography>
      }
      return this.props.data.posts.map((post) => {
        return <Post key={post.id} post={post} />
      })
    }

    return (
      <div className={this.props.classes.wrapper}>
        <Grid container spacing={2} className={this.props.classes.gridContainer}>
          <Grid item className={this.props.classes.posts}>
            <hr/>
            <Typography variant="h6" className={this.props.classes.userPostsTitle}>
              <PostAddOutlined fontSize="large" color="primary" style={{marginRight: "10px"}}/>
              <span>Posts</span>
            </Typography>
            {renderPosts()}
          </Grid>
          <Grid item className={this.props.classes.profile}>
            <Profile />
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    data: state.data,
    loading: state.data.loading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getPosts: () => {
      dispatch(getPosts())
    }
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(Home));
