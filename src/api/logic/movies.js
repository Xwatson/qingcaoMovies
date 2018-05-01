module.exports = class extends think.Logic {
    indexAction() {
        return this.success({
            statusCode: 200,
            actEditHtml: '123'
        });
    }
};
