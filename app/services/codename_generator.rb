# frozen_string_literal: true

GENERATORS = [
  proc { Faker::Adjective.positive },
  proc { Faker::Ancient.primordial },
  proc { Faker::Ancient.titan },
  proc { Faker::Ancient.hero },
  proc { Faker::Artist.name },
  proc { Faker::Beer.hop },
  proc { Faker::Coffee.blend_name },
  proc { Faker::Color.color_name },
  proc { Faker::Compass.ordinal },
  proc { Faker::Construction.heavy_equipment },
  proc { Faker::Dessert.variety },
  proc { Faker::Emotion.adjective },
  proc { Faker::Food.ingredient },
  proc { Faker::Food.spice },
  proc { Faker::Food.sushi },
  proc { Faker::Food.vegetables },
  proc { Faker::Science.element },
  proc { Faker::Space.galaxy },
  proc { Faker::Space.moon },
  proc { Faker::Space.constellation },
  proc { Faker::Tea.variety }
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
    random_index = rand(0..(GENERATORS.size - 1))
    GENERATORS[random_index].call
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
