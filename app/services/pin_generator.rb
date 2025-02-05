class PinGenerator
  attr_reader :pin

  def initialize
    @pin = ''

    6.times { @pin += Random.rand(0..9).to_s }
  end
end
