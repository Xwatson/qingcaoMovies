const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
    async moviesAction() {
        return this.success({
            statusCode: 200,
            actEditHtml: '123'
        });
    }
};
