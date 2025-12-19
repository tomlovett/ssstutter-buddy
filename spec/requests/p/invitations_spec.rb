# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'P::InvitationsController' do
  let(:participant) { create(:participant) }
  let(:study) { create(:study) }

  let(:status) { Invitation::INTERESTED }
  let(:status_explanation) { nil }
  let(:params) do
    {
      participant_id: participant.id,
      study_id: study.id,
      status:,
      status_explanation:
    }
  end

  before { sign_in(participant.user) }

  describe 'POST /p/invitations' do
    context 'with an existing Invitation record' do
      context 'when the existing invitation has an "invited" status' do
        let!(:invitation) { create(:invitation, participant:, study:, status: Invitation::INVITED) }

        context 'with a positive/interested response' do
          it 'creates a connection record and sends a new connection email' do
            expect { post '/p/invitations', params: }.to change(Connection, :count).by(1)
              .and have_enqueued_mail(ConnectionMailer, :new_connection)

            expect(invitation.reload.status).to eq(Invitation::INTERESTED)

            expect(Connection.last.status).to eq(Connection::CONNECTED)
            expect(Connection.last.participant_id).to eq(participant.id)
            expect(Connection.last.study_id).to eq(study.id)
          end
        end

        context 'with a negative/disinterested response' do
          let(:status) { Invitation::DECLINED }

          it 'updates the invitation record and does not trigger connection behavior' do
            expect { post '/p/invitations', params: }.not_to change(Connection, :count)

            expect(invitation.reload.status).to eq(Invitation::DECLINED)
          end

          it 'does not enqueue a connection email' do
            expect { post '/p/invitations', params: }.not_to have_enqueued_mail(ConnectionMailer, :new_connection)
          end
        end
      end

      context 'when the existing invitation has a "declined" status' do
        let!(:invitation) { create(:invitation, study:, participant:, status: Invitation::DECLINED) }

        context 'with a positive/interested response' do
          let(:status) { Invitation::INTERESTED }

          it 'creates a connection record and sends a new connection email' do
            expect { post '/p/invitations', params: }.to change(Connection, :count).by(1)
              .and have_enqueued_mail(ConnectionMailer, :new_connection)

            expect(invitation.reload.status).to eq(Invitation::INTERESTED)

            expect(Connection.last.status).to eq(Connection::CONNECTED)
            expect(Connection.last.participant_id).to eq(participant.id)
            expect(Connection.last.study_id).to eq(study.id)
          end
        end

        context 'with a negative/disinterested response' do
          let(:status) { Invitation::DECLINED }

          it 'updates the invitation record and does not trigger connection behavior' do
            expect { post '/p/invitations', params: }.not_to change(Connection, :count)

            expect(response).to be_successful
            expect(invitation.reload.status).to eq(Invitation::DECLINED)
          end
        end
      end
    end

    context 'without an existing Invitation record' do
      context 'with a positive/interested response' do
        it 'creates a connection record and sends a new connection email' do
          expect { post '/p/invitations', params: }.to change(Connection, :count).by(1)
            .and have_enqueued_mail(ConnectionMailer, :new_connection)

          expect(Invitation.last.status).to eq(Invitation::INTERESTED)

          expect(Connection.last.status).to eq(Connection::CONNECTED)
          expect(Connection.last.participant_id).to eq(participant.id)
          expect(Connection.last.study_id).to eq(study.id)
        end
      end

      context 'with a negative/disinterested response' do
        let(:status) { Invitation::DECLINED }

        it 'creates an invitation record with a declined status' do
          expect { post '/p/invitations', params: }.to change(Invitation, :count).by(1)

          expect(Invitation.last.status).to eq(Invitation::DECLINED)
        end

        it 'does not enqueue a connection email' do
          expect { post '/p/invitations', params: }.not_to have_enqueued_mail(ConnectionMailer, :new_connection)
        end
      end
    end

    context 'when sent as an anonymous user' do
      before { sign_out }

      let(:email) { Faker::Internet.email }
      let(:params) do
        {
          study_id: study.id,
          status: Invitation::INTERESTED,
          anonymous: true,
          first_name: Faker::Name.first_name,
          last_name: Faker::Name.last_name,
          email:,
          send_new_studies_emails: true
        }
      end

      context 'when an existing registered user is attached to that email' do
        let!(:user) { create(:user, :participant, email:) }

        context 'with an existing invitation' do
          before { create(:invitation, participant: user.participant, study:, status: Invitation::INTERESTED) }

          it 'does nothing but returns success' do
            expect { post '/p/invitations', params: }.not_to change(Invitation, :count)

            expect(response).to have_http_status(:success)
          end
        end

        context 'without an existing invitation' do
          it 'rejects the request with a 401' do
            expect { post '/p/invitations', params: }.not_to change(Invitation, :count)

            expect(response).to have_http_status(:unauthorized)
          end
        end
      end

      context 'with an existing provisional user' do
        let!(:user) { create(:user, :provisional, :participant, email:) }

        before { user.participant.update(weekly_digest_opt_out: true) }

        it 'creates a invitation, connection and sends the connection email' do
          expect { post '/p/invitations', params: }.to change(Invitation, :count).by(1)
            .and change(Connection, :count).by(1)
            .and have_enqueued_mail(ConnectionMailer, :new_connection)

          expect(Invitation.last.status).to eq(Invitation::INTERESTED)
          expect(Connection.last.status).to eq(Connection::CONNECTED)
          expect(Connection.last.participant_id).to eq(user.participant.id)
          expect(Connection.last.study_id).to eq(study.id)
        end

        it 'updates the provisional user\'s weekly digest opt-out status' do
          post '/p/invitations', params: params

          expect(user.participant.reload.weekly_digest_opt_out).to be_falsey
        end
      end

      context 'without an existing provisional user' do
        it 'creates a provisional user and a connection record and sends a new connection email' do
          # One is created by test infrastructure, the other is the provisional user
          expect { post '/p/invitations', params: }.to change(User, :count).by(2)
            .and change(Participant, :count).by(1)
            .and change(Invitation, :count).by(1)
            .and change(Connection, :count).by(1)
            .and have_enqueued_mail(ConnectionMailer, :new_connection)

          provisional_user = User.last
          expect(provisional_user.email).to eq(email)
          expect(provisional_user.participant).to be_present
          expect(Connection.last.participant_id).to eq(provisional_user.participant.id)
        end

        it 'successfully interprets the send_new_studies_emails parameter' do
          post '/p/invitations', params: params

          expect(Participant.last.weekly_digest_opt_out).to be_falsey
        end
      end
    end
  end
end
