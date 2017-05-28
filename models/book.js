const Book = sequelize.define('book', {
    id: {
        type: Sequelize.INTEGER
    },
    title: {
        type: Sequelize.STRING
    },
    author: {
        type: Sequelize.STRING
    },
    genre: {
        type: Sequelize.STRING
    },
    first_published: {
        type: Sequelize.INTEGER
    }
});

// force: true will drop the table if it already exists
Book.sync({force: true}).then(function(){
    // Table created
    return Book.create({
        id: 1,
        title: 'The Mists of Avalon',
        author: 'Marion Zimmer Bradley',
        genre: 'Fantasy',
        first_published: 2001
    });
});