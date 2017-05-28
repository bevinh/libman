const Patron = sequelize.define('patron', {
    id: {
        type: Sequelize.INTEGER
    },
    first_name: {
        type: Sequelize.STRING
    },
    last_name: {
        type: Sequelize.STRING
    },
    address: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING
    },
    library_id: {
        type: Sequelize.STRING
    },
    zip_code: {
        type: Sequelize.INTEGER
    }
});

// force: true will drop the table if it already exists
Patron.sync({force: true}).then(function(){
    // Table created
    return Patron.create({
        id: 1,
        first_name: 'John',
        last_name: 'Hancock',
        address: '401 W Washington St. Washington D.C.',
        email: 'johnhancock7@gmail.com',
        library_id: 'MLL1001',
        zip_code: '47909'
    });
});