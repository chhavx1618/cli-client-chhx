#!/usr/bin/env node

const axios = require('axios');
const { Command } = require('commander');

// Dynamic import for `chalk`
(async () => {
  const chalk = (await import('chalk')).default;

  // Define colors and styles
  const info = chalk.blue;
  const success = chalk.green;
  const error = chalk.red;
  const header = chalk.cyan.bold;

  // Create a new Command instance
  const program = new Command();

  // Display a welcome message
  function showWelcomeMessage() {
       console.log(chalk.cyan(`


        _          _ _         _ 
        | |__   ___| | | ___   | |
        | '_ \ / _ \ | |/ _ \  | |
        | | | |  __/ | | (_) | |_|
        |_| |_|\___|_|_|\___/  (_)
        
        
        
        Welcome to CLI-api-client!

        A simple tool for making HTTP requests from the command line.

        INSTRUCTIONS - 
        To use this tool, run the following command - 
        npx cli-client [http method] [url] [additional parameters]
        
        Made by Chhax1618 ✍(◔◡◔)
         `));     
    console.log();
  }

  program
    .version('1.0.0')
    .description('CLI tool to make HTTP requests')
    .action(() => {
      showWelcomeMessage();
      program.help();
    });

  // GET command
  program
    .command('get <url>')
    .description('Send a GET request')
    .option('-H, --headers <headers>', 'Request headers in JSON format')
    .action(async (url, options) => {
      try {
        console.log(header('Sending GET request to: ') + info(url));

        
      const headers = cmdOptions.headers ? JSON.parse(cmdOptions.headers) : {};
      if (options.token) {
        headers['Authorization'] = `Bearer ${options.token}`;
      }

      const response = await axios.get(url, { headers });
      
        console.log(success(`Status: ${response.status}`));
        console.log(success('Response: '));
        console.log(response.data);
      } catch (error) {
        console.error(error(`Error: ${error.message}`));
      }
    });

  // POST command
  program
    .command('post <url>')
    .description('Send a POST request')
    .option('-d, --data <data>', 'Request body in JSON format')
    .option('-H, --headers <headers>', 'Request headers in JSON format')
    .action(async (url, options) => {
      try {
        console.log(header('Sending POST request to: ') + info(url));

        const response = await axios.post(url, options.data ? JSON.parse(options.data) : {}, {
          headers: options.headers ? JSON.parse(options.headers) : {},
        });

        console.log(success(`Status: ${response.status}`));
        console.log(success('Response: '));
        console.log(response.data);
      } catch (error) {
        console.error(error(`Error: ${error.message}`));
      }
    });

    //DELETE command
    program
    .command('delete <url>')
    .description('Send a DELETE request')
    .option('-H, --headers <headers>', 'Request headers in JSON format')
    .action(async (url, options) => {
      try {
        console.log(header('Sending DELETE request to: ') + info(url));

        const response = await axios.delete(url, {
          headers: options.headers ? JSON.parse(options.headers) : {},
        });

        console.log(success(`Status: ${response.status}`));
        console.log(success('Response: '));
        console.log(response.data);
      } catch (error) {
        console.error(error(`Error: ${error.message}`));
      }
    });

    // PUT command
    program
  .command('put <url>')
  .description('Send a PUT request')
  .option('-d, --data <data>', 'Request body in JSON format')
  .option('-H, --headers <headers>', 'Request headers in JSON format')
  .action(async (url, options) => {
    try {
      console.log(header('Sending PUT request to: ') + info(url));

      const response = await axios.put(url, options.data ? JSON.parse(options.data) : {}, {
        headers: options.headers ? JSON.parse(options.headers) : {},
      });

      console.log(success(`Status: ${response.status}`));
      console.log(success('Response: '));
      console.log(response.data);
    } catch (err) {
      // Fix: use console.error() directly
      console.error(`Error: ${err.message}`);
    }
  });

  //PATCH command
  program
  .command('patch <url>')
  .description('Send a PATCH request')
  .option('-d, --data <data>', 'Request body in JSON format')
  .option('-H, --headers <headers>', 'Request headers in JSON format')
  .action(async (url, options) => {
    try {
      console.log(header('Sending PATCH request to: ') + info(url));

      const response = await axios.patch(url, options.data ? JSON.parse(options.data) : {}, {
        headers: options.headers ? JSON.parse(options.headers) : {},
      });

      console.log(success(`Status: ${response.status}`));
      console.log(success('Response: '));
      console.log(response.data);
    } catch (err) {
      console.error(`Error: ${err.message}`);
    }
  });


  // Parse command-line arguments
  program.parse(process.argv);
})();

//put, post, get, delete, patch are currently succesfully working