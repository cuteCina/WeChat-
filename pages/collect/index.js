// pages/collect/index.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabs: [
            {
                id: 0,
                name: '商品收藏',
                isActive: true
            },
            {
                id: 1,
                name: '品牌收藏',
                isActive: false
            },
            {
                id: 2,
                name: '店铺收藏',
                isActive: false
            },
            {
                id: 3,
                name: '浏览足迹',
                isActive: false

            }
        ],
        collect: []
    },
    onShow() {
        const collect = wx.getStorageSync('collect') || [];
        this.setData({
            collect
        });
    },
    handleTabsItemChange(e) {
        // 获取被点击的标题索引
        const { index } = e.detail;
        // 2. 修改原数组
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        // 3. 赋值到data中
        this.setData({
            tabs
        })
    }
})