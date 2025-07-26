# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Invitation do
  describe 'model creation' do
    context 'with valid attributes' do
      it 'creates a new model' do
        expect { create(:invitation) }.not_to raise_error
      end
    end

    context 'with invalid attributes' do
      it 'validates status inclusion' do
        invitation = build(:invitation, status: 'invalid_status')
        expect(invitation).not_to be_valid
        expect(invitation.errors[:status]).to include('is not included in the list')
      end

      it 'validates uniqueness of participant_id and study_id' do
        invitation = create(:invitation)
        duplicate_invitation = build(:invitation, participant: invitation.participant, study: invitation.study)

        expect(duplicate_invitation).not_to be_valid
        expect(duplicate_invitation.errors[:participant_id]).to include('has already been taken')
      end
    end
  end

  describe 'associations' do
    let(:invitation) { create(:invitation) }

    it 'belongs to participant and researcher through study' do
      expect(invitation.participant).to be_present
      expect(invitation.study).to be_present
      expect(invitation.researcher).to eq(invitation.study.researcher)
    end
  end

  describe 'constants' do
    it 'defines invitation statuses' do
      expect(Invitation::INVITED).to eq('invited')
      expect(Invitation::ACCEPTED).to eq('accepted')
      expect(Invitation::DECLINED).to eq('declined')
      expect(Invitation::INTERESTED).to eq('interested')
      expect(Invitation::NOT_INTERESTED).to eq('not interested')
    end
  end

  describe 'scopes' do
    let!(:invited_invitation) { create(:invitation, status: Invitation::INVITED) }
    let!(:accepted_invitation) { create(:invitation, status: Invitation::ACCEPTED) }
    let!(:interested_invitation) { create(:invitation, status: Invitation::INTERESTED) }
    let!(:declined_invitation) { create(:invitation, status: Invitation::DECLINED) }
    let!(:not_interested_invitation) { create(:invitation, status: Invitation::NOT_INTERESTED) }

    describe '.invited' do
      it 'returns invitations with invited status' do
        expect(described_class.invited).to include(invited_invitation)
        expect(described_class.invited).not_to include(accepted_invitation, interested_invitation, declined_invitation,
                                                       not_interested_invitation)
      end
    end

    describe '.accepted' do
      it 'returns invitations with accepted or interested status' do
        expect(described_class.accepted).to include(accepted_invitation, interested_invitation)
        expect(described_class.accepted).not_to include(invited_invitation, declined_invitation,
                                                        not_interested_invitation)
      end
    end

    describe '.declined' do
      it 'returns invitations with declined or not interested status' do
        expect(described_class.declined).to include(declined_invitation, not_interested_invitation)
        expect(described_class.declined).not_to include(invited_invitation, accepted_invitation, interested_invitation)
      end
    end
  end

  describe '#display_participant_name?' do
    let(:invitation) { create(:invitation, status:) }
    let(:status) { Invitation::ACCEPTED }

    context 'when status is accepted' do
      it 'returns true' do
        expect(invitation.display_participant_name?).to be true
      end
    end

    context 'when status is interested' do
      let(:status) { Invitation::INTERESTED }

      it 'returns true' do
        expect(invitation.display_participant_name?).to be true
      end
    end

    context 'when status is invited' do
      let(:status) { Invitation::INVITED }

      it 'returns false' do
        expect(invitation.display_participant_name?).to be false
      end
    end

    context 'when status is declined' do
      let(:status) { Invitation::DECLINED }

      it 'returns false' do
        expect(invitation.display_participant_name?).to be false
      end
    end
  end

  describe '#as_json' do
    context 'when display_participant_name? is true' do
      let(:invitation) { create(:invitation, status: Invitation::ACCEPTED) }

      it 'includes participant name and email for participants' do
        allow(Current).to receive(:user).and_return(instance_double(User, participant?: true))

        json = invitation.as_json
        expect(json['name']).to eq("#{invitation.participant.first_name} #{invitation.participant.last_name}")
        expect(json['email']).to eq(invitation.participant.email)
      end

      it 'includes participant codename for non-participants' do
        allow(Current).to receive(:user).and_return(instance_double(User, participant?: false))

        json = invitation.as_json
        expect(json['name']).to eq(invitation.participant.codename)
      end
    end

    context 'when display_participant_name? is false' do
      let(:invitation) { create(:invitation, status: Invitation::INVITED) }

      it 'includes participant codename' do
        allow(Current).to receive(:user).and_return(instance_double(User, participant?: false))

        json = invitation.as_json
        expect(json['name']).to eq(invitation.participant.codename)
      end
    end
  end
end
