# frozen_string_literal: true

class GenerateParticipantAliases
  def initialize
    @aliases = []

    5.times { |_i| @aliases << generate_single_alias }

    check_for_collisions
  end

  def check_for_collisions
    collisions = Participant.where(name_alias: @aliases).pluck(:name_alias)

    return if collisions.nil?

    @aliases.filter! { |name_alias| collisions.exclude?(name_alias) }

    collisions.length.times { |_i| @aliases << generate_single_alias }

    check_for_collisions
  end

  private

  # try/catch
  def generators
    Faker::Adjective.positive
    Faker::Ancient.primordial
    Faker::Ancient.titan
    Faker::Ancient.hero
    # Faker::App.name
    Faker::Artist.name
    Faker::Beer.hop
    Faker::Coffee.blend_name
    Faker::Color.color_name
    Faker::Compass.ordinal
    Faker::Construction.heavy_equipment
    Faker::Dessert.variety
    Faker::Emotion.adjective
    Faker::Food.ingredient
    Faker::Food.spice
    Faker::Food.sushi
    Faker::Food.vegetables
    Faker::Science.element
    Faker::Space.galaxy
    Faker::Space.moon
    Faker::Space.constellation
    Faker::Tea.variety
  end
end
