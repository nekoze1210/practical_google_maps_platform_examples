import { Loader } from 'google-maps'
import GoogleMaps from '../googleMaps/models/maps'
import Google from '../googleMaps/models/google'

export default async (apiKey, apiOptions) => {
  const loader = new Loader(apiKey, apiOptions)
  const google = await new Google(loader, apiOptions).load()

  return new GoogleMaps(google, document.getElementById('map')).init()
}
