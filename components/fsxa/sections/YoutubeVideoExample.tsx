import { FSXABaseSection } from 'fsxa-pattern-library'
import { Container } from 'fsxa-ui'
import { Component } from 'vue-property-decorator'

export interface Payload {
  st_headline: string
  st_videoDataAccessPlugin: {
    value: Array<{
      identifier: string
    }>
  }
  st_videoId: string | undefined
  st_videoSourceType: {
    identifier: string
  }
}

@Component({
  name: 'YoutubeVideoExample'
})
class YoutubeVideoExample extends FSXABaseSection<Payload> {
  render() {
    const videoId =
      this.payload.st_videoSourceType.identifier === 'st_videoDataAccessPlugin'
        ? this.payload.st_videoDataAccessPlugin.value[0].identifier
        : this.payload.st_videoId
    return (
      <div class="tw-w-full tw-bg-white">
        <Container>
          <h3 class="tw-text-xl tw-font-bold tw-mb-4">
            {this.payload.st_headline}
          </h3>
          <div class="tw-aspect-w-16 tw-aspect-h-9">
            <iframe
              src={`http://www.youtube.com/embed/${videoId}?autoplay=1`}
              frameborder="0"
            />
          </div>
        </Container>
      </div>
    )
  }
}
export default YoutubeVideoExample
