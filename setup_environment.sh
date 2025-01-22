#!/bin/bash

# Function to check if a command exists
command_exists() {
  command -v "$1" >/dev/null 2>&1
}

# Function to prompt for PostgreSQL credentials
get_postgres_credentials() {
  read -p "Enter PostgreSQL username: " pg_username
  read -s -p "Enter PostgreSQL password: " pg_password
  echo
}

# Function to test PostgreSQL connection
test_postgres_connection() {
  PGPASSWORD=$pg_password psql -h localhost -U $pg_username -d postgres -c '\q' 2>/dev/null
  return $?
}

# Function to update database.yml
update_database_yml() {
  echo "Updating config/database.yml..."
  cat > config/database.yml << EOL
default: &default
  adapter: postgresql
  encoding: unicode
  pool: <%= ENV.fetch("RAILS_MAX_THREADS") { 5 } %>
  username: $pg_username
  password: $pg_password

development:
  <<: *default
  database: sb_development

test:
  <<: *default
  database: sb_test

production:
  <<: *default
  database: sb_production
EOL
  echo "config/database.yml updated successfully."
}

# ... (previous parts of the script remain unchanged)

# PostgreSQL setup
echo "Setting up PostgreSQL..."
while true; do
  get_postgres_credentials
  if test_postgres_connection; then
    echo "PostgreSQL connection successful."
    update_database_yml
    break
  else
    echo "Failed to connect to PostgreSQL. Please check your credentials."
    read -p "Do you want to try again? (y/n): " retry
    if [[ $retry != [Yy]* ]]; then
      echo "PostgreSQL setup failed. Please set up PostgreSQL manually and run this script again."
      exit 1
    fi
  fi
done

# Install project dependencies
echo "Installing project dependencies..."
bundle install

# Create the database
echo "Creating the database..."
if bin/rails db:create; then
  echo "Database created successfully."
else
  echo "Failed to create the database. Please check your PostgreSQL setup and database.yml configuration."
  echo "You may need to manually create the database. Try running:"
  echo "createdb -U $pg_username sb_development"
  echo "createdb -U $pg_username sb_test"
  echo "Then run this script again."
  exit 1
fi

# Setup the database
echo "Setting up the database..."
if bin/rails db:setup; then
  echo "Database setup completed successfully."
else
  echo "Failed to set up the database. Please check your database configuration and try again."
  exit 1
fi

echo "Environment setup complete!"