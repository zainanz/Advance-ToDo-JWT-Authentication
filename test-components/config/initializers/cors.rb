Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins 'https://jwttodo.netlify.app', 'https://jwttodo.netlify.app/', 'https://master--jwttodo.netlify.app/'
    resource(
      '*',
      headers: :any,
      expose: ['access-token', 'expiry', 'token-type', 'Authorization'],
      methods: [:get, :patch, :put, :delete, :post, :options, :show],
      credentials: true
    )
  end
end
