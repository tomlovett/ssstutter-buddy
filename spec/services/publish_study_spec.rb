# frozen_string_literal: true

require 'rails_helper'

RSpec.describe PublishStudy do
  let(:study) { create(:study, location_type: Study::DIGITAL) }
  let(:service) { described_class.new(study:) }

  describe '#call' do
    describe 'validating study fields' do
      context 'when required fields are missing' do
        context 'when title is missing' do
          before { study.update(title: nil) }

          it { expect(service.call).to include('Title is required') }
        end

        context 'when short_desc is missing' do
          before { study.update(short_desc: nil) }

          it { expect(service.call).to include('Short desc is required') }
        end

        context 'when long_desc is missing' do
          before { study.update(long_desc: nil) }

          it { expect(service.call).to include('Long desc is required') }
        end

        context 'when methodologies is missing' do
          before { study.update(methodologies: nil) }

          it { expect(service.call).to include('Methodologies is required') }
        end

        context 'when total_hours is missing' do
          before { study.update(total_hours: nil) }

          it { expect(service.call).to include('Total hours is required') }
        end

        context 'when total_sessions is missing' do
          before { study.update(total_sessions: nil) }

          it { expect(service.call).to include('Total sessions is required') }
        end

        context 'when total_sessions is less than 1' do
          before { study.update(total_sessions: -1) }

          it { expect(service.call).to include('Total sessions must be 1 or greater') }
        end

        context 'when remuneration is missing' do
          before { study.update(remuneration: nil) }

          it { expect(service.call).to include('Remuneration is required') }
        end
      end

      describe 'location validation' do
        context 'when location_type is hybrid and location is empty' do
          let(:study) { create(:study, :hybrid) }

          before { study.update(location: nil) }

          it { expect(service.call).to include('Location is required for hybrid or in-person studies') }
        end

        context 'when location_type is in_person and location is empty' do
          let(:study) { create(:study, :in_person) }

          before { study.update(location: nil) }

          it { expect(service.call).to include('Location is required for hybrid or in-person studies') }
        end

        context 'when location_type is digital' do
          let(:study) { create(:study, :digital) }

          context 'when location is nil' do
            before { study.update(location: nil) }

            it 'returns an empty array' do
              expect(service.call).to eq([])
            end
          end

          context 'when location is present' do
            before { study.update(location: create(:location)) }

            it 'returns an array containing the error message' do
              expect(service.call).to include('If a study is digital, it should not have a location')
            end
          end
        end
      end

      describe 'timeline validation' do
        context 'when total_sessions is greater than 1 and duration is missing' do
          before { study.update(total_sessions: 2, duration: '') }

          it 'returns an array containing the error message' do
            expect(service.call).to include('Study duration must be set if there are multiple sessions')
          end
        end

        context 'when total_sessions is 1 and duration is missing' do
          before { study.update(total_sessions: 1, duration: '') }

          it 'returns an array containing the error message' do
            expect(service.call).to eq([])
          end
        end
      end

      describe 'age range validation' do
        context 'when min_age and max_age are not present' do
          before { study.update(min_age: nil, max_age: nil) }

          it 'ereturns an empty array' do
            expect(service.call).to eq([])
          end
        end

        context 'when min_age is greater than max_age and max_age is not 0' do
          before { study.update(min_age: 20, max_age: 18) }

          it 'returns an array containing the error message' do
            expect(service.call).to include('Minimum age cannot be greater than maximum age')
          end
        end

        context 'when min_age is greater than max_age and max_age is 0' do
          before { study.update(min_age: 20, max_age: 0) }

          it 'ereturns an empty array' do
            expect(service.call).to eq([])
          end
        end
      end
    end
  end

  describe 'changing study status' do
    context 'when the study is already active' do
      let(:study) { create(:study, :digital, :active) }

      it 'does not change the study status' do
        expect(service.call).to eq([])
      end
    end

    context 'when the study has not been published before' do
      let(:study) { create(:study, :digital, :draft) }

      it 'publishes the study' do
        expect(service.call).to eq([])
        expect(study.reload.published_at).to be_present
      end
    end

    context 'when the study has been published but was paused' do
      context 'when paused_at is set' do
        let(:study) { create(:study, :digital, :paused) }

        it 'resumes the study' do
          expect(service.call).to eq([])
          expect(study.reload.paused_at).to be_nil
          expect(study.reload.published_at).to be_present
        end
      end
    end
  end

  describe 'setting the email list' do
    let(:mailer_double) { instance_double(ParticipantMailer, new_study_alert: instance_double(ActionMailer::MessageDelivery, deliver_later: true)) }

    before { allow(ParticipantMailer).to receive(:with).and_return(mailer_double) }

    context 'when the study has existing connections' do
      let!(:fresh_participant) { create(:participant, birthdate: 20.years.ago) }
      let(:existing_connection_participant) { create(:participant) }

      before { create(:connection, participant: existing_connection_participant, study:) }

      it 'excludes the existing connection participants from the email list' do
        expect { service.call }.to change(Invitation, :count).by(1)

        expect(ParticipantMailer).to have_received(:with).with(
          study:, participant: fresh_participant
        )
        expect(ParticipantMailer).not_to have_received(:with).with(
          study:, participant: existing_connection_participant
        )
        expect(Invitation.first.participant).to eq(fresh_participant)
      end
    end

    context 'when the study has existing invitations' do
      let!(:fresh_participant) { create(:participant, birthdate: 20.years.ago) }
      let(:existing_invitation_participant) { create(:participant) }

      before { create(:invitation, participant: existing_invitation_participant, study:) }

      it 'excludes the existing invitation participants from the email list' do
        expect { service.call }.to change(Invitation, :count).by(1)

        expect(ParticipantMailer).to have_received(:with).with(
          study:, participant: fresh_participant
        )
        expect(ParticipantMailer).not_to have_received(:with).with(
          study:, participant: existing_invitation_participant
        )
      end
    end

    context 'when age restrictions are present' do
      let!(:fresh_participant) { create(:participant, birthdate: 20.years.ago) }
      let!(:young_participant) { create(:participant, birthdate: 10.years.ago) }

      context 'when min_age is present' do
        let(:study) { create(:study, :digital, min_age: 18) }

        it 'excludes participants under the minimum age from the email list' do
          expect { service.call }.to change(Invitation, :count).by(1)

          expect(ParticipantMailer).to have_received(:with).with(
            study:, participant: fresh_participant
          )
          expect(ParticipantMailer).not_to have_received(:with).with(
            study:, participant: young_participant
          )
        end
      end

      context 'when max_age is present' do
        let!(:fresh_participant) { create(:participant, birthdate: 20.years.ago) }
        let(:study) { create(:study, :digital, min_age: nil, max_age: 35) }
        let!(:elderly_participant) { create(:participant, birthdate: 60.years.ago) }

        it 'excludes participants over the maximum age from the email list' do
          expect { service.call }.to change(Invitation, :count).by(2)

          expect(ParticipantMailer).to have_received(:with).with(
            study:, participant: young_participant
          )
          expect(ParticipantMailer).to have_received(:with).with(
            study:, participant: fresh_participant
          )
          expect(ParticipantMailer).not_to have_received(:with).with(
            study:, participant: elderly_participant
          )
        end
      end
    end

    context 'with different location types' do
      let!(:baltimorean) { create(:participant, location: baltimore) }
      let!(:bel_air_ean) { create(:participant, location: bel_air) }
      let!(:masshole) { create(:participant, location: somerville) }
      let(:baltimore) do
        create(:location, city: 'Baltimore', state: 'MD', country: 'US', latitude: 39.2904, longitude: -76.6122)
      end
      let(:bel_air) do
        create(:location, city: 'Bel Air', state: 'MD', country: 'US', latitude: 39.5359, longitude: -76.3483)
      end
      let(:somerville) do
        create(:location, city: 'Somerville', state: 'MA', country: 'US', latitude: 42.3876, longitude: -71.0995)
      end

      context 'when location_type is in_person' do
        let(:study) { create(:study, :in_person, location: baltimore) }

        before do
          study.location.update(latitude: baltimore.latitude, longitude: baltimore.longitude)
        end

        it 'only invites local participants' do
          expect { service.call }.to change(Invitation, :count).by(2)

          expect(ParticipantMailer).to have_received(:with).with(
            study:, participant: baltimorean
          )
          expect(ParticipantMailer).to have_received(:with).with(
            study:, participant: bel_air_ean
          )
          expect(ParticipantMailer).not_to have_received(:with).with(
            study:, participant: masshole
          )
        end
      end

      context 'when location_type is digital' do
        let(:study) { create(:study, :digital) }

        it 'invites all participants' do
          expect { service.call }.to change(Invitation, :count).by(3)

          expect(ParticipantMailer).to have_received(:with).with(
            study:, participant: baltimorean
          )
          expect(ParticipantMailer).to have_received(:with).with(
            study:, participant: bel_air_ean
          )
          expect(ParticipantMailer).to have_received(:with).with(
            study:, participant: masshole
          )
        end
      end

      context 'when location_type is hybrid' do
        let(:study) { create(:study, :hybrid, location: baltimore) }

        it 'invites all participants' do
          expect { service.call }.to change(Invitation, :count).by(3)

          expect(ParticipantMailer).to have_received(:with).with(
            study:, participant: baltimorean
          )
        end
      end
    end
  end
end
