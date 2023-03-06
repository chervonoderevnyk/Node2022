// -- EVENT --
// const event = require('node:events');
//
// const eventEmitter = new event();
//
// eventEmitter.on('click', ()=>{
//   console.log('Click click click');
// });
//
// eventEmitter.emit('click')
//
// eventEmitter.emit('click')
// eventEmitter.emit('click')
// eventEmitter.emit('click')
//
// eventEmitter.once('clickAndDie', ()=>{
//   console.log("I'm gonna die after being called");
// })
// console.log(eventEmitter.eventNames());
//
// eventEmitter.emit('clickAndDie');
//
// eventEmitter.emit('clickAndDie');
// eventEmitter.emit('clickAndDie');
// eventEmitter.emit('clickAndDie');
// eventEmitter.emit('clickAndDie');
//
// console.log(eventEmitter.eventNames());


// -- STREAMS --
// const fs = require('fs');
// const path = require("path");
//
// const readStream = fs.createReadStream(path.join('test', 'text3.txt'));
// const writeStream = fs.createWriteStream(path.join('test', 'text2.txt'))

// read, write, duplex, transform --- types of streams !!!

// readStream.on('data', (chunk) => {
//   writeStream.write(chunk);
// });

// const handleError = () => {
//   console.error('ERROR!!!');
//   readStream.destroy();
//   writeStream.end('ERROR WHILE READING FILE');
// }
//
// readStream
//   .on('error', handleError)
//   .pipe(writeStream)
//   .on('error', handleError);

// -- EXPRESS --

const express = require('express');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

const users = [
    {
        name: 'Oleh',
        age: 19,
        gender: 'male'
    },
    {
        name: 'Anton',
        age: 22,
        gender: 'female'
    },
    {
        name: 'Anya',
        age: 25,
        gender: 'female'
    },
    {
        name: 'Ielizavetta',
        age: 35,
        gender: 'female'
    },
    {
        name: 'Cocos',
        age: 70,
        gender: 'mixed'
    }
]

app.get('/users', (req, res)=>{
    res.json(users);
});

app.get('/users/:userId', (req, res)=>{
    const { userId } = req.params;
    const user = users[+userId];

    res.json(user);
});

app.post('/users', (req, res)=>{
    const body = req.body;
    users.push(body);

    res.status(201).json({
        message: 'User created!'
    })
})


app.put('/users/:userId', (req, res)=>{
    const { userId } = req.params;
    const updatedUser = req.body;

    users[+userId] = updatedUser;

    res.status(200).json({
        message: 'User updated',
        data: users[+userId]
    })
})

app.delete('/users/:userId', (req, res)=>{
    const { userId } = req.params;

    users.splice(+userId, 1);

    res.status(200).json({
        message: 'User deleted',
    })
})





app.get('/welcome', (req, res)=>{
    res.send('WELCOME');
});


const PORT = 5100;

app.listen(PORT, ()=>{
    console.log(`Server has started on PORT ${PORT} 🚀🚀🚀`);
});
