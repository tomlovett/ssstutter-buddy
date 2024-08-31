# frozen_string_literal: true

class Study < ApplicationRecord
  belongs_to :primary_researcher, class_name: 'Researcher'
end
