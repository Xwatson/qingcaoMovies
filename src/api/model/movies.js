module.exports = class extends think.Model {
    async batchAddMovie(movies) {
        if (movies && movies.length) {
            return this.addMany(movies);
        }
        return null;
    }
    async getPagingMovies(where, page, size) {
        return this.where(where).page(page, size).countSelect();
    }
    async getMovieById(id) {
        return this.where({ id: id }).find();
    }
};
