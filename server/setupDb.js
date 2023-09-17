import mysql from 'mysql2/promise';
import { DB_DATABASE, DB_HOST, DB_PASS, DB_USER } from './env.js';
import { hash } from './lib/hash.js';

const DATABASE_RESET = false;

async function setupDb() {
    let connection = await mysql.createConnection({
        host: DB_HOST,
        user: DB_USER,
        password: DB_PASS,
    });

    if (DATABASE_RESET) {
        await connection.execute(`DROP DATABASE IF EXISTS \`${DB_DATABASE}\``);
    }
    
    await connection.execute(`CREATE DATABASE IF NOT EXISTS \`${DB_DATABASE}\``);
    connection.query(`USE \`${DB_DATABASE}\``);

    if (DATABASE_RESET) {

        await rolesTable(connection);
        await usersTable(connection);
        await tokensTable(connection);
        await totalTable(connection);
        await steeringWheelTable(connection);
        await formsTable(connection);

        await generateRoles(connection);
        await generateUsers(connection);
        await generateTotal(connection);
        await generateSteeringWheel(connection);
        // await generateForms(connection);

    }

    return connection;
}

async function usersTable(db) {
    try {
        const sql = `CREATE TABLE users (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        fullname varchar(30) NOT NULL,
                        email varchar(40) NOT NULL,
                        password_hash varchar(128) NOT NULL,
                        role_id int(10) NOT NULL DEFAULT 2,
                        is_blocked int(1) NOT NULL DEFAULT 0,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY role_id (role_id),
                        CONSTRAINT users_ibfk_1 FOREIGN KEY (role_id) REFERENCES roles (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "users" lenteles');
        console.log(error);
        throw error;
    }
}

async function tokensTable(db) {
    try {
        const sql = `CREATE TABLE tokens (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        user_id int(10) NOT NULL,
                        token varchar(36) NOT NULL,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        CONSTRAINT tokens_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "tokens" lenteles');
        console.log(error);
        throw error;
    }

}

async function rolesTable(db) {
    try {
        const sql = `CREATE TABLE roles (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        role varchar(10) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "roles" lenteles');
        console.log(error);
        throw error;
    }
}

async function totalTable(db) {
    try {
        const sql = `CREATE TABLE total (
                    id int(10) NOT NULL AUTO_INCREMENT,
                    title varchar(20) NOT NULL,
                    PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "total" lenteles');
        console.log(error);
        throw error;
    }
}

async function steeringWheelTable(db) {
    try {
        const sql = `CREATE TABLE \`steering-wheel\` (
                        id int(1) NOT NULL AUTO_INCREMENT,
                        side varchar(10) NOT NULL,
                        PRIMARY KEY (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "steering-wheel" lenteles');
        console.log(error);
        throw error;
    }
}

async function formsTable(db) {
    try {
        const sql = `CREATE TABLE forms (
                        id int(10) NOT NULL AUTO_INCREMENT,
                        user_id int(10) NOT NULL,
                        total_id int(10) NOT NULL,
                        title varchar(200) NOT NULL,
                        color varchar(50) NOT NULL,
                        price int(6) unsigned NOT NULL DEFAULT 0,
                        year int(4) unsigned NOT NULL,
                        steering_wheel_id int(1) NOT NULL DEFAULT 0,
                        location varchar(50) NOT NULL,
                        image varchar(100) NOT NULL,
                        created timestamp NOT NULL DEFAULT current_timestamp(),
                        PRIMARY KEY (id),
                        KEY user_id (user_id),
                        KEY total_id (total_id),
                        KEY steering_wheel_id (steering_wheel_id),
                        CONSTRAINT forms_ibfk_1 FOREIGN KEY (user_id) REFERENCES users (id),
                        CONSTRAINT forms_ibfk_2 FOREIGN KEY (steering_wheel_id) REFERENCES \`steering-wheel\` (id),
                        CONSTRAINT forms_ibfk_3 FOREIGN KEY (total_id) REFERENCES total (id)
                    ) ENGINE=InnoDB AUTO_INCREMENT=1 DEFAULT CHARSET=utf8mb4`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sukurti "forms" lenteles');
        console.log(error);
        throw error;
    }
}

async function generateRoles(db) {
    try {
        const sql = `INSERT INTO roles (role) VALUES ('admin'), ('user')`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "roles" lenteles turinio');
        console.log(error);
        throw error;
    }
}

async function generateUsers(db) {
    try {
        const sql = `INSERT INTO users (fullname, email, password_hash, role_id) 
                    VALUES ('Simas Simaitis', 'simas@simas.lt', '${hash('simas@simas.lt')}', 1),
                        ('Tomas Tomaitis', 'tomas@tomas.lt', '${hash('tomas@tomas.lt')}', 1),
                        ('Tadas Tadaitis', 'tadas@tadas.lt', '${hash('tadas@tadas.lt')}', 2),
                        ('Mantas Mantaitis', 'mantas@mantas.lt', '${hash('mantas@mantas.lt')}', 2),
                        ('Andrius Andraitis', 'andrius@andrius.lt', '${hash('andrius@andrius.lt')}', 2)`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "users" lenteles turinio');
        console.log(error);
        throw error;
    }
}

async function generateTotal(db) {
    const total = ['Vilnius', 'Kaunas', 'Klaipeda'];
    try {
        const sql = `INSERT INTO total (title) 
                    VALUES ${total.map(s => `("${s}")`).join(', ')};`;
        console.log(sql);
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "total" lenteles turinio');
        console.log(error);
        throw error;
    }
}

async function generateSteeringWheel(db) {
    const steeringWheelSides = ['left', 'right', 'center', 'none', 'both'];
    try {
        const sql = `INSERT INTO \`steering-wheel\` (side) 
                    VALUES ${steeringWheelSides.map(s => `("${s}")`).join(', ')};`;
        await db.execute(sql);
    } catch (error) {
        console.log('Nepavyko sugeneruoti "streering-wheel" lenteles turinio');
        console.log(error);
        throw error;
    }
}

// async function generateForms(db) {
//     try {
//         const sql = `INSERT INTO users ( title, color, price, year, location, image) 
//                     VALUES  ('Bevardis', 'ruda', '500', '2', 'Vilnius', 'form_1694958687895.png'),
//                             ('Rudis', 'tamsi', '300', '4', 'Kaunas', 'form_1694959071738.png'),
//                             ('Pukis', 'auksine', '700', '1', 'Klaipeda', 'form_1694959287302.png'),
//                             ('Rikis', 'pilka', '100', '3', 'Vilnius', 'form_1694961463643.png')`;
//         await db.execute(sql);
//     } catch (error) {
//         console.log('Nepavyko sugeneruoti "forms" lenteles turinio');
//         console.log(error);
//         throw error;
//     }
// }


export const connection = await setupDb();