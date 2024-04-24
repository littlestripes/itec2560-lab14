module.exports = (sequelize, DataTypes) => {
    // define the columns of the table
    const Student = sequelize.define('Student', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                notEmpty: true
            }
        },
        starID: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                notEmpty: true
            }
        },
        present: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    });

    // and create the table in the db
    Student.sync({ force: false }).then( () => {
        console.log('Synced student table');
    });

    return Student;
};
