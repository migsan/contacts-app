var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/contactlist', function(req, res) {
    console.log('GET request received');

    person1 = {
        name: 'Chrono',
        email: 'chronolai@email.com',
        number: '(+57) 314-398-5650'
    };

    person2 = {
        name: 'Nikolai',
        email: 'perrolaisoso@email.com',
        number: '(+57) 314-398-5651'
    };

    person3 = {
        name: 'Sam',
        email: 'semuel@email.com',
        number: '(+57) 314-398-5652'
    };

    var contactList = [person1, person2, person3];
    res.json(contactList);
});

app.listen(8888);
console.log('Server up and running in port 8888');
