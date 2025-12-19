# frozen_string_literal: true

module RequestSpecHelper
  def json
    JSON.parse(response.body)
  end

  def sign_in(user)
    # Create a session for the user
    session = user.sessions.create!(
      user_agent: 'RSpec Test',
      ip_address: '127.0.0.1'
    )

    # Set the Current model to use this session
    Current.session = session

    # Mock the Session model to return our session when queried
    # This avoids allow_any_instance_of and works with the real authentication flow
    allow(Session).to receive(:find_by).with(id: anything).and_return(session)

    # Ensure Current.user returns the correct user
    allow(Current).to receive(:user).and_return(user)

    session
  end

  def sign_out
    # Clear the session cookie
    cookies.delete(:session_id)

    # Clear the Current model
    Current.session = nil

    # Remove the stub on Current.user that was set by sign_in
    allow(Current).to receive(:user).and_return(nil)
  end
end
