import Config from './../config/config';
const PRODUCTION_SERVER = Config.PRODUCTION_SERVER_STATUS;

var options = {
    useNewUrlParser: true, 
    useUnifiedTopology: true 
}

var uri = (PRODUCTION_SERVER == true)?'mongodb://localhost/node_twitter':'mongodb://localhost/node_twitter';

module.exports = {
    'uri': uri,
    'options': options
};
