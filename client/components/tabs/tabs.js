import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Markdown from './Markdown';
import { withStyles } from '@material-ui/styles';

const withStyles = theme => ({
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
});

class Tabs extends Component{

    constructor(props){
        super(props);
        this.state = {
            posts: {},
            title: "Technology"
        }
    }
    render(){
        const { classes } = this.props;
        const { posts, title } = this.props;   

        return (
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                {title}
              </Typography>
              <Divider />
              {posts.map((post) => (
                <Markdown className={classes.markdown} key={post.substring(0, 40)}>
                  {post}
                </Markdown>
              ))}
            </Grid>
          );  
    }
}

export default withStyles(styles)(Tabs)