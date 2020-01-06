'use strict';

const chalk = require('chalk');
const crypto = require('crypto');

const MongoClient = require('mongodb').MongoClient;
const COLLECTION_NAME = 'sujetdiscussion';

function printFailure(err) {
    console.error(chalk.red.bold('Error'), chalk.grey(err));
}

function findSubject(db) {
    return callback => {
        db.collection(COLLECTION_NAME).find({}).toArray((err, results) => {
            if (err) printFailure(err);
            callback(err ? [] : results);
        });
    }
}

function countSubject(db) {
    return callback => {
        db.collection(COLLECTION_NAME).find({}).count((err, count) => {
            if (err) printFailure(err);
            callback(err ? -1: count);
        });
    };
}

function addSubject(db) {
    return (entry, callback) => {
        if (!entry) entry = {};
        var subject = {
            name: entry.name || '',
        };


        var salt = [String(new Date()), subject.name].join('|');
        subject._id = crypto.createHash('md5').update(salt).digest('hex');
        
        db.collection(COLLECTION_NAME).insertOne(subject, (err, response) => {
            if (err) {
                printFailure(err);
                return callback(null);
            }
            var result = response.ops[0];
            callback(result._id);
        });
    };
}


function removeAllSubject(db) {
    return callback => {
        db.collection(COLLECTION_NAME).deleteMany({}, (err, count) => {
            if (err) printFailure(err);
            callback(count);
        });
    }
}

function removeSubject(db) {
    return (id, callback) => {
        callback();
    };
}

module.exports = (config, callback) => {
    if (!config.silent) console.log(chalk.cyan.bold('Connecting'), `to mongo uri="${config.dbUri}", db="${config.dbName}"`);
    const client = new MongoClient(config.dbUri, { useUnifiedTopology: true});
 
    client.connect(err => {
        if (err) {
            console.error(chalk.red.bold('Error'), 'ne peut pas ouvrir Mongodb:', chalk.grey(err));
            process.exit(1);
        }
        if (!config.silent) console.log(chalk.green.bold('Connected'), 'to mongo');
        
        const db = client.db(config.dbName);
 
        callback({
            find: findSubject(db),
            count: countSubject(db),
            add: addSubject(db),
			remove: removeSubject(db),
            removeAll: removeAllSubject(db)
        });
    });

};
