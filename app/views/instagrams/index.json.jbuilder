json.array!(@instagrams) do |instagram|
  json.extract! instagram, :id
  json.url instagram_url(instagram, format: :json)
end
