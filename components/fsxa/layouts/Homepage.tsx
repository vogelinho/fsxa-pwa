import Component from 'vue-class-component'
import { FSXABaseLayout } from 'fsxa-pattern-library'
import { RichTextElement } from 'fsxa-api/dist/types'

export interface Slide {}
export interface Data {
  pt_show_chat: boolean
  pt_title: string
  pt_slider: {
    data: {
      st_button: {
        data: {
          lt_button_text: string
          lt_internal: string | null
          lt_product_link: {
            route: string
          }
        }
      }
      st_picture: {
        previewId: string
        resolutions: Record<
          string,
          {
            url: string
            width: number
            height: number
          }
        >
      }
      st_picture_alt: string | null
      st_description: string
      st_title: RichTextElement[]
    }
  }[]
}
@Component({
  name: 'HomepageLayout',
  // We will set the page-title for every page that is using the homepage layout
  head() {
    return {
      title: (this as any).currentPage.label
    }
  }
})
class HomepageLayout extends FSXABaseLayout<Data> {
  render() {
    return <div>{this.renderContentByName('content')}</div>
  }
}
export default HomepageLayout
