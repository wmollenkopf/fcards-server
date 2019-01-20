# lang-flash-card-server
Server for language learning flash cards.

# Important Note:
As of this version, controllers/flashCards.js is using pretendUserId hard coded user id value until express session is set up.

If pulling this code, make sure to update that hard coded value.

# API Keys
Make sure to create a file called:
process.env

Add the following variables with your own secret key tokens for API Authentication purposes.

# Example process.env file:
DB_USER=your_db_username
DB_PASS=your_db_password
API_SECRET_KEY=your_api_secret_key