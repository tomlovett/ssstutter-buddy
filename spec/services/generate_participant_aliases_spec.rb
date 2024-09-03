# frozen_string_literal: true

require 'rails_helper'

RSPec.describe GenerateParticipantAliases do

describe "#generate_alias_options" do
	subject(:returned_aliases) { describe_class.generate_alias_options }

	context "with no naming conflicts" do
		it "generates five potential names for the participant" do
				expect(returned_aliases.length).to eq(5)
				expect(returned_aliases.uniq.length).to eq(returned_aliases.length)
		end
	end

	context 'when a naming conflict is found' do
		let(:name_alias) { Faker::BossaNova.artist }

		before do
			# allow(Participant).to receive(:generate_alias_options)
			create(:participant, name_alias:)
		end

		# it 'swaps out the offending value' do
		#
		# end
	end
end
