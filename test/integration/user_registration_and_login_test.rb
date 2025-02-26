require 'test_helper'

class UserRegistrationAndLoginTest < ActionDispatch::IntegrationTest
  test 'register new user, login, and delete user' do
    valid_attributes = {
      email: 'test@example.com',
      password: 'password123',
      password_confirmation: 'password123',
      first_name: 'Test',
      last_name: 'User'
    }

    # Register a new user
    post '/signup', params: { user: valid_attributes }
    assert_response :created
    assert_not_nil JSON.parse(@response.body)['token']

    # Attempt to log in with the new user
    post '/auth/login', params: { email: valid_attributes[:email], password: valid_attributes[:password] }
    assert_response :ok
    assert_not_nil JSON.parse(@response.body)['token']

    # Delete the user from the database
    user = User.find_by(email: valid_attributes[:email])
    assert_not_nil user
    user.destroy
    assert_nil User.find_by(email: valid_attributes[:email])
  end

  test 'register new user with OmniAuth' do
    OmniAuth.config.test_mode = true
    OmniAuth.config.mock_auth[:google_oauth2] = OmniAuth::AuthHash.new({
                                                                         provider: 'google_oauth2',
                                                                         uid: '123456',
                                                                         info: {
                                                                           email: 'test@example.com',
                                                                           first_name: 'Test',
                                                                           last_name: 'User'
                                                                         }
                                                                       })

    get '/auth/google_oauth2/callback'
    assert_response :success
    assert_not_nil JSON.parse(@response.body)['token']

    user = User.find_by(email: 'test@example.com')
    assert_not_nil user
    assert_equal 'Test', user.first_name
    assert_equal 'User', user.last_name

    user.destroy
    assert_nil User.find_by(email: 'test@example.com')
  end
end
