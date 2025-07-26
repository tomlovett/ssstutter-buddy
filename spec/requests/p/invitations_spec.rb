# frozen_string_literal: true

require 'rails_helper'

RSpec.describe 'P::InvitationsController' do
  let(:participant) { create(:participant) }
  let(:researcher) { create(:researcher) }
  let(:study) { create(:study, researcher:) }

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
            expect do
              post '/p/invitations', params:
            end.to change(Connection, :count).by(1)
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
            expect do
              post '/p/invitations', params:
            end.not_to change(Connection, :count)

            expect(invitation.reload.status).to eq(Invitation::DECLINED)
          end

          it 'does not enqueue a connection email' do
            expect do
              post '/p/invitations', params:
            end.not_to have_enqueued_mail(ConnectionMailer, :new_connection)
          end
        end
      end

      context 'when the existing invitation has a "declined" status' do
        let!(:invitation) { create(:invitation, study:, participant:, status: Invitation::DECLINED) }

        context 'with a positive/interested response' do
          let(:status) { Invitation::INTERESTED }

          it 'creates a connection record and sends a new connection email' do
            expect do
              post '/p/invitations', params:
            end.to change(Connection, :count).by(1)
                                             .and have_enqueued_mail(ConnectionMailer, :new_connection)

            expect(invitation.reload.status).to eq(Invitation::INTERESTED)

            expect(Connection.last.status).to eq(Connection::CONNECTED)
            expect(Connection.last.participant_id).to eq(participant.id)
            expect(Connection.last.study_id).to eq(study.id)
          end
        end

        context 'with a negative/disinterested response' do
          let(:status) { Invitation::DECLINED }
          let(:status_explanation) { 'This study gives me the ick.' }

          it 'updates the invitation record and does not trigger connection behavior' do
            expect do
              post '/p/invitations', params:
            end.not_to change(Connection, :count)

            expect(invitation.reload.status).to eq(Invitation::DECLINED)
            expect(invitation.status_explanation).to eq(status_explanation)
          end

          it 'does not enqueue a connection email' do
            expect do
              post '/p/invitations', params:
            end.not_to have_enqueued_mail(ConnectionMailer, :new_connection)
          end
        end
      end
    end

    context 'without an existing Invitation record' do
      context 'with a positive/interested response' do
        it 'creates a connection record and sends a new connection email' do
          expect do
            post '/p/invitations', params:
          end.to change(Connection, :count).by(1)
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
          expect do
            post '/p/invitations', params:
          end.to change(Invitation, :count).by(1)

          expect(Invitation.last.status).to eq(Invitation::DECLINED)
        end

        it 'does not enqueue a connection email' do
          expect do
            post '/p/invitations', params:
          end.not_to have_enqueued_mail(ConnectionMailer, :new_connection)
        end
      end
    end
  end
end
