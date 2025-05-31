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

### Environment Configuration

Apply local ENV changes to `config/_env.rb`. This file is gitignored and changes will not be committed to version control.

Add your email to the admin list by setting:

```ruby
ENV['ADMIN_EMAILS'] = 'your.email@example.com, another.email@example.com'
```

This will give you local access to the admin pages. You can add multiple emails by separating them with commas.

### To run the app:

`bundle`
`rake db:setup`
`rails s`

Run `rake seed:dev` to seed the database with dummy data.
