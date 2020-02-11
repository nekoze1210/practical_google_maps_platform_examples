import { Loader } from 'google-maps'

const firstViewCenterCoordinates = {
  lat: 35.7329854,
  lng: 139.7128128
}

const defaultOptions = {
  zoom: 15,
  mapTypeId: 'roadmap',
  disableDefaultUI: false,
  clickableIcons: false
}

export default async (
  apiOptions,
  element,
  center = firstViewCenterCoordinates,
  options = defaultOptions
) => {
  const loader = new Loader(process.env.API_KEY, apiOptions)
  const google = await loader.load(apiOptions)
  const map = new google.maps.Map(element, {
    center,
    ...options
  })
  return {
    map,
    google
  }
}
