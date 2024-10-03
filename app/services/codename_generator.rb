# frozen_string_literal: true

GENERATORS = [
  Faker::Adjective.positive,
  Faker::Ancient.primordial,
  Faker::Ancient.titan,
  Faker::Ancient.hero,
  Faker::Artist.name,
  Faker::Beer.hop,
  Faker::Coffee.blend_name,
  Faker::Color.color_name,
  Faker::Compass.ordinal,
  Faker::Construction.heavy_equipment,
  Faker::Dessert.variety,
  Faker::Emotion.adjective,
  Faker::Food.ingredient,
  Faker::Food.spice,
  Faker::Food.sushi,
  Faker::Food.vegetables,
  Faker::Science.element,
  Faker::Space.galaxy,
  Faker::Space.moon,
  Faker::Space.constellation,
  Faker::Tea.variety
].freeze

class CodenameGenerator
  attr_accessor :codenames

  def initialize
    @codenames = []
  end

  def run
    5.times { |_i| @codenames << generate_codename }

    check_for_collisions

    @codenames
  end

  def invoke_single_generator
    rand(1..9999).to_i.to_s

    # generator = GENERATORS.sample
  end

  private

  def generate_codename
    array = []
    3.times { |_i| array << invoke_single_generator }

    array.join(' ')
  end

  def check_for_collisions
    collisions = Participant.where(codename: @codenames).pluck(:codename)

    return if collisions.empty?

    @codenames.filter! { |codename| collisions.exclude?(codename) }

    collisions.length.times { |_i| @codenames << generate_single_alias }

    check_for_collisions
  end
end
