# fcards-server
Server for using flash cards to help study phrases/words/text.

Please note, this project is still currently in development as a personal project, and am currently working on polishing up the code, this README.md etc in my spare time.

# API Keys
Make sure to create a file called:
process.env

Add the following variables with your own secret key tokens for API Authentication purposes.

# Example process.env file:

```bash
DB_HOST_SOCKET=your_db_host_or_socket
DB_USER=your_db_username
DB_PASS=your_db_password
API_SECRET_KEY=your_api_secret_key
```

You may also need
PORT=3000 depending on your hosting environment.
