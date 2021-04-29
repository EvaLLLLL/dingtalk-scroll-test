let currentPage = 1

Page({
  data: {
    list: [],
    loadMore: 'load',
    maxPage: 0,
    isLoading: true
  },
  onLoad() {
    dd.httpRequest({
      url: `https://6ee13a3d-8ba9-4b03-91a9-292aa6f02cff.mock.pstmn.io/paginated=${currentPage}`,
      success: ({ data }) => {
        console.log(data)


        this.setData({
          list: data.list,
          maxPage: data.maxPage,
          isLoading: false
        })

        currentPage = currentPage + 1
      }
    })
  },
  loadMore(n) {
    console.log(`第${n}次`)
    if (n === this.data.maxPage + 1) {
      this.setData({
        loadMore: 'over'
      })
      return
    }

    dd.httpRequest({
      url: `https://6ee13a3d-8ba9-4b03-91a9-292aa6f02cff.mock.pstmn.io/paginated=${n}`,
      success: ({ data }) => {
        this.setData({
          list: this.data.list.concat(data.list)
        })

        currentPage = currentPage + 1
      }
    })
  },
  onScrollToLower() {
    this.loadMore(currentPage)
  }
})