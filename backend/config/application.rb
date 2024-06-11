require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module BackendDemo
  class Application < Rails::Application
    config.load_defaults 7.0
    config.api_only = true

    # Place CORS configuration inside the application class
    config.middleware.insert_before 0, Rack::Cors do
      allow do
        origins 'http://localhost:8080' # Or your Next.js frontend URL
        resource '*', headers: :any, methods: [:get, :post, :put, :patch, :delete, :options, :head]
      end
    end

    # Place Notion configuration inside the application class as well
    Notion.configure do |config|
      config.token = ENV['NOTION_API_TOKEN']
    end 
  end
end