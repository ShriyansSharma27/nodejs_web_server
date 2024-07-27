const whitelist = ['https://www.google.com','https://www.youtube.com'];
const corsOpts = {
    origin: (origin, callback) => {
        if(whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error('Not permissible'));
        }
    },
    optionsSucessStatus: 200
}

module.exports = {corsOpts};