# Dockerfile for Ruby on Rails application

FROM ruby:3.2.2

# Set working directory
WORKDIR /app

# Install dependencies
RUN apt-get update -qq && apt-get install -y nodejs postgresql-client

# Copy Gemfile and Gemfile.lock
COPY Gemfile Gemfile.lock ./

# Install gems, including rails
RUN bundle install

# Copy the rest of the application code
COPY . .

RUN chmod +x entrypoint.sh
# Expose port 3000
EXPOSE 3000

# Start the Rails server
ENTRYPOINT  ["./entrypoint.sh"]
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]