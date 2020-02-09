import { Loader } from 'google-maps'
import GoogleMaps from '../googleMaps/models/maps'
import Google from '../googleMaps/models/google'

export default async (apiKey, apiOptions, element) => {
  const loader = new Loader(apiKey, apiOptions)
  const google = await new Google(loader, apiOptions).load()
  return new GoogleMaps(google, element).init()
}
