'use strict';

const database = require('../database/sujet');

function addApiRoutes(app, config, callback) {
    database(config, sujet  => {
        
        
        app.get('/api/sujet', (req, res) => {
            sujet.find(results => {
                res.json({ data: results });
            });
        });

        app.post('/api/sujet', (req, res) => {
            sujet.add(req.body, id => {
                res.json({ success: Boolean(id) });
            });
        });

        app.all('/api/*', (req, res) => {
            res.json({ error: 404, message: 'Unknown route' });
        });
        
        if (callback) callback();
    });
}

module.exports = {
    addRoutes: addApiRoutes
};