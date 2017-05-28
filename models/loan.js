const Loan = sequelize.define('loan', {
    id: {
        type: Sequelize.INTEGER
    },
    book_id: {
        type: Sequelize.INTEGER
    },
    patron_id: {
        type: Sequelize.INTEGER
    },
    loaned_on: {
        type: Sequelize.DATE
    },
    return_by: {
        type: Sequelize.DATE
    },
    returned_on: {
        type: Sequelize.DATE
    }
});

// force: true will drop the table if it already exists
Loan.sync({force: true}).then(function(){
    // Table created
    return Loan.create({
        id: 1,
        book_id: 1,
        patron_id: 1,
        loaned_on: 2017-05-20,
        return_by: 2017-06-20
    });
});