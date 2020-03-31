import express from "express";
import hbs from 'express-handlebars';

const app = express();

app.set('views', __dirname + '/views');
app.engine('handlebars', hbs({
    helpers: { json: (context) => JSON.stringify(context) }
}));
app.set('view engine', 'handlebars');

app.use('/public', express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('office.handlebars', {
        layout: false,
        title: "BUTTON",
        infos: [
            {name: "a"},
            {name: "b"},
            {name: "c"},
        ]
    });
});

const port = 3001;

app.listen(port, () => console.log(`🚀 App listening on port ${port}!`));