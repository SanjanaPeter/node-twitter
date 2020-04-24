import React, {Component} from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

class Footer extends Component{
    constructor(props){
        super(props);
        this.state = {
            website: "Node Twitter",
            year: new Date().getFullYear()
        }
    }

    static getInitialProps({req}){

    }

    render(){
        return (
            <Box mt={8}>
                <Typography variant="body2" color="textSecondary" align="center">
                {'Copyright © '}
                <Link color="inherit" href="https://material-ui.com/">
                    {this.state.website}
                </Link>{' '}
                {this.state.year}
                {'.'}
                </Typography>
            </Box>
          );
    }
}

export default Footer;