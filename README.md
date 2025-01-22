# README

## to prepare your evniroment
you can install manually 

NodeJS,
Postgre
Rails

### for ubuntu there is a an auto setup
sudo chmod +x setup_environment.sh
./setup_environment.sh


To run the app:

`bundle`
`rake db:setup`
`rails s`

You will need to have `postgres` running locally. If you have Homebrew, `brew install postgresql@15 && brew services run postgresql@15`

Run `rake seed:dev` to seed the database with dummy data.
