#communicating btwn client and server using Eventemitter architecture




# Server.js

const EventEmitter = require('events');

class Server extends EventEmitter {
      constructor(client) { // pass a client object in constructor
        super();
        this.tasks = {}; //a empty object
        this.taskId = 1; 
        process.nextTick(() => {                // to defer the ist 'response' , code in nexttick
          this.emit(
            'response',
            'Type a command (help to list commands)'
          );
        });
        //  client.emit('command', command, args) : from client.js
        client.on('command', (command, args) => {
          switch (command) {
          case 'help':
          case 'add':
          case 'ls':
          case 'delete':
            this[command](args);
            break;
          default:
            this.emit('response', 'Unknown command...');
          }
        });
      }

  tasksString() {
    return Object.keys(this.tasks).map(key => {
      return `${key}: ${this.tasks[key]}`;
    }).join('\n');
  }

  help() {
    this.emit('response', `Available Commands:
  add task
  ls
  delete :id`
    );
  }
  add(args) {
    this.tasks[this.taskId] = args.join(' ');
    this.emit('response', `Added task ${this.taskId}`); //after adding emit the response 
    this.taskId++;
  }
  ls() {
    this.emit('response', `Tasks:\n${this.tasksString()}`);
  }
  delete(args) {
    delete(this.tasks[args[0]]);
    this.emit('response', `Deleted task ${args[0]}`);
  }
}

//recieve client object and return a new server object

module.exports = (client) => new Server(client); // export this function




#client.js


const EventEmitter = require('events');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const client = new EventEmitter();
const server = require('./server')(client); // pass the client object to the function inside server.js

server.on('response', (resp) => {
  process.stdout.write('\u001B[2J\u001B[0;0f');
  process.stdout.write(resp);
  process.stdout.write('\n\> ');
});

let command, args;
//event 'line'
rl.on('line', (input) => {
  [command, ...args] = input.split(' ');
  client.emit('command', command, args);
});








