export default class Google {
  constructor(loader, apiOptions) {
    this.loader = loader
    this.apiOptions = apiOptions
  }

  async load() {
    return await this.loader.load(this.apiOptions)
  }
}
