export default class Google {
  constructor(loader, apiOptions) {
    this.loader = loader
    this.apiOptions = apiOptions
  }

  async load() {
    const api = await this.loader.load(this.apiOptions)
    return api
  }
}
