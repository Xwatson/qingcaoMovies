const BaseRest = require('./rest.js');

module.exports = class extends BaseRest {
    constructor(ctx) {
        super(ctx);
        this.model = this.model('movies');
    }
    async getAction() {
        if (!this.id) {
            return this.fail('id is empty');
        }
        const movie = await this.model.getMovieById(this.id);
        return this.success(movie);
    }
    async indexAction() {
        const where = {};
        if (this.get('status')) {
            where.status = this.get('status');
        }
        const movies = await this.model.getPagingMovies(where, this.get('page') || 1, this.get('size') || this.defaultPageSize);
        return this.success(movies);
    }
    async putAction() {
        const pk = this.modelInstance.pk;
        const data = this.post();
        const batchData = JSON.parse(this.post('batchData') || null);
        delete data[pk];
        if ((!batchData && think.isEmpty(data)) || (batchData && !batchData.length)) {
            return this.fail('data is empty');
        }
        let addRes = null;
        try {
            if (think.isArray(batchData)) {
                addRes = await this.model.batchAddMovie(batchData);
            } else if (think.isObject(data)) {
                addRes = await this.model.add(data);
            }
        } catch (e) {
            return this.fail(e);
        }
        return addRes ? this.success(addRes) : this.fail('添加失败');
    }
};
