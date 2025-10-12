release: bundle && yarn && bundle exec rails db:migrate && bundle exec rails deploy:log
web: bundle exec rails server -p $PORT
worker: bundle exec solid_queue start
