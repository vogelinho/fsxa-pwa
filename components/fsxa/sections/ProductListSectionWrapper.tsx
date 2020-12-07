import Component from 'vue-class-component'
import { Sections } from 'fsxa-ui'
import { ProductListItem } from 'fsxa-ui'
import { FSXABaseSection } from 'fsxa-pattern-library'
import { ComparisonQueryOperatorEnum, QueryBuilderQuery } from 'fsxa-api'

interface Payload {
  entityType: string
  filterParams?: Record<string, string>
  schema: string
}
const ListSection = (Sections as any).ListSection

@Component({
  name: 'ProductListSectionWrapper'
})
class ProductListSectionWrapper extends FSXABaseSection<Payload> {
  async fetchData() {
    const params: QueryBuilderQuery[] = [
      {
        field: 'schema',
        value: this.payload.schema,
        operator: ComparisonQueryOperatorEnum.EQUALS
      },
      {
        field: 'entityType',
        value: this.payload.entityType,
        operator: ComparisonQueryOperatorEnum.EQUALS
      }
    ]
    if (this.payload.filterParams && this.payload.filterParams.category) {
      params.push({
        field: 'formData.tt_categories.value.label',
        value: this.payload.filterParams.category,
        operator: ComparisonQueryOperatorEnum.EQUALS
      })
    }
    console.log('params', params)
    const response = await this.fsxaApi.fetchByFilter(params, this.locale)
    this.setStoredItem('product-list', response)
  }
  serverPrefetch() {
    return this.fetchData()
  }
  get items() {
    return this.getStoredItem('product-list') || null
  }
  mounted() {
    if (!this.items) {
      this.fetchData()
    }
  }
  render() {
    console.log(this.items)
    console.log(this.payload)
    return (
      <div>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:gap-8">
          {this.items.map((item) => (
            <div class="w-full h-64 bg-gray-200 flex items-center justify-center rounded-md">
              <ProductListItem
                title={item.data.tt_name}
                description={item.data.tt_teaser_text}
                price={item.data.tt_price}
                image={item.data_tt_teaser_image}
                url={item.data.route}
                handleClick={null}
              ></ProductListItem>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default ProductListSectionWrapper
