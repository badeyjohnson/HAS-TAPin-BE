# HAS-TAP-BE
H&amp;S Tap app backend repo

### Links-to-other-repos
- [HAS-TAPin-FE-App](https://github.com/badeyjohnson/HAS-TAPin-FE-App) 
- [HAS-TAPin-FE-Desktop](https://github.com/badeyjohnson/HAS-TAPin-FE-Desktop)

## Table of Contents :book:

1.  [Getting Started](#Getting-Started)
2.  [Links to other repos](#Links-to-other-repos)
3.  [Built With](#Built-With)
4.  [Versioning](#Versioning)
5.  [Authors](#Authors)
6.  [License](#license)
7.  [Acknowledgments](#Acknowledgments)

## Getting-Started :running:

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

Folder structure below :open_file_folder:

```
 ├── models/
 │  └──── xx.js
 ├── routes/
 │  └──── xx.js
 ├─── node_modules/
 ├─── controllers/
 │  └──── xx.js
 ├─── ultis/
 │  └──── ultils.js
 ├─── erros/
 │  └──── index.js
 ├─── spec/
 │  └──── app.spec.js
 │  └──── ultils.spec.js
 ├─── db/
 │  └──── connection.js <-- node-postrgres connection configuration
 │  └──── seeds
 │    └──── seed.sql
 │  └──── migrations
 │    └──── xx.js
 │  └──── test-data
 │    └──── ...-data
 │  └──── dev-data
 │    └──── ...-data
 │  └──── setup.sql <-- database creation
 ├── app.js
 ├── listen.js
 ├── knexfile.js <-- database info (port/host/database name)
 ├── .gitignore
 ├── package-lock.json
 ├── prettierrc
 ├── .eslintrc.js <-- style formmatter
 ├── Procfile
 ├── README.md
```

### Running mySQL database

1. Set up MySQL database [download](https://dev.mysql.com/downloads/mysql/8.0.html) MySQL. You will need to sign up for an Oracle account to do this. Follow the installation instructions. The password required within the installation will be the password for the root access to MySQL. 

2. Add mysql to the PATH,
```bash
export PATH=${PATH}:/usr/local/mysql/bin/ 

source ~/.zshrc 
```

3. You may also want to create a non-root user with privileges for the connection

4. Create a knexfile.js using the `example-knexfile.js` as a template.

5. In terminal,
`npm run setup-dbs` to set up the databases, 
`npm run seed-test` to set up seed the test database.

## Built-With

- [Express](https://expressjs.com/) - The web framework used
- [Postgresql](https://www.postgresql.org/) - Open source relational database TBC
- [Knex](Knex.js) - SQL Query Builder

## Contributing

Please see [contributors](https://github.com/badeyjohnson/HAS-TAPin-BE/graphs/contributors) on this project for more information.

## Versioning

[GitHub](https://github.com/) for versioning. For the versions available, see the [tags on this repository](https://github.com/badeyjohnson/HAS-TAPin-BE/network/dependencies).

## Authors

- **Tish Richardson**  - [LRR1993](https://github.com/LRR1993)
- **Ben Adey-Johnson** 
- **Martin Tattersal** 

## License
MIT

## Acknowledgments

- Northcoders :smile: :stuck_out_tongue: :star2:
