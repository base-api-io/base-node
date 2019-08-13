const QueryString = require('querystring');
const Check = require('check-types');
const Needle = require("needle");

const Endpoint = require("../Endpoint");

class Images extends Endpoint {
  create(image) {
    return this.requestJSON("POST", "images", {
      image: image
    });
  }

  async download(id, quality, format, resize, crop) {
    const url = this.imageUrl(id, quality, format, resize, crop)

    const response = await Needle("GET", url)

    return response.body
  }

  imageUrl(id, quality, format, resize, crop) {
    Check.assert.maybe.like(crop, {top: 0, left: 0, width: 0, height: 0})
    Check.assert.maybe.like(resize, {width: 0, height: 0})
    Check.assert.maybe.number(quality)
    Check.assert.maybe.string(format)
    Check.assert.maybe.string(id)

    const params = {}

    if (quality) {
      params.quality = quality
    }

    if (format) {
      params.format = format
    }

    if (resize) {
      params.resize = [resize.width, resize.height].join("_")
    }

    if (crop) {
      params.crop = [crop.width, crop.height, crop.left, crop.top].join("_")
    }

    return `${this.url}/v1/images/${id}/version?${QueryString.encode(params)}`
  }

  get(id) {
    Check.assert.maybe.string(id)

    return this.requestJSON("GET", `images/${id}`);
  }

  delete(id) {
    Check.assert.maybe.string(id)

    return this.requestJSON("DELETE", `images/${id}`);
  }
}

module.exports = Images;
