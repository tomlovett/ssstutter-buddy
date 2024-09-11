# frozen_string_literal: true

# Pin npm packages by running ./bin/importmap

pin 'application'

pin 'popper', to: 'popper.js', preload: true
pin 'bootstrap', to: 'bootstrap.min.js', preload: true
