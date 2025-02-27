# README

## to prepare your evniroment

you can install manually


NodeJS,
postgres
Rails


### the database can be managed through Homebrew and Rails commands

If you have Homebrew


`brew install postgresql@15`
`brew services start postgresql@15`

### for ubuntu there is a an auto setup

sudo chmod +x setup_environment.sh
./setup_environment.sh


### To run the app:

`bundle`
`rake db:setup`
`rails s`


Run `rake seed:dev` to seed the database with dummy data.
