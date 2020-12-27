/* 
1. 页面被打开的时候 onShow
    0. onShow 不同于 onLoad 无法在形参上接收 options参数
    1. 判断缓存中有没有token
        1. 没有 直接跳转到授权页面
        2. 有 直接往下进行
    2. 获取url上的参数type
    2. 根据type来决定页面标题的数组元素 那个被激活选中
    3. 根据type 去发送请求获取订单数据
    4. 渲染页面
2. 点击不同的标题 重新发送请求来获取和渲染数据
*/
import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: [
            {
                order_name: '佐菲奥特曼',
                order_id: '0',
                order_num: 'ATM12345678910ABC',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            },
            {
                order_name: '赛文奥特曼',
                order_id: '1',
                order_num: 'ATM12345678910DEF',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            },
            {
                order_name: '艾斯奥特曼',
                order_id: '2',
                order_num: 'ATM12345678910GHI',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            },
            {
                order_name: '杰克奥特曼',
                order_id: '3',
                order_num: 'ATM12345678910JKL',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            },
            {
                order_name: '雷欧奥特曼',
                order_id: '4',
                order_num: 'ATM12345678910MNO',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            },
            {
                order_name: '泰罗奥特曼',
                order_id: '5',
                order_num: 'ATM12345678910PQR',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            },
            {
                order_name: '宇宙英雄奥特曼',
                order_id: '6',
                order_num: 'ATM12345678910STU',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            },
            {
                order_name: '迪迦奥特曼',
                order_id: '7',
                order_num: 'ATM12345678910VWX',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            },
            {
                order_name: '麦克斯奥特曼',
                order_id: '8',
                order_num: 'ATM12345678910YZA',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            },
            {
                order_name: '梦比优斯奥特曼',
                order_id: '9',
                order_num: 'ATM12345678910BCD',
                order_price: 10000,
                order_time: '2020/10/1 上午9:25:08'
            }
        ],
        tabs: [
            {
                id: 0,
                name: '全部',
                isActive: true
            },
            {
                id: 1,
                name: '代付款',
                isActive: false
            },
            {
                id: 2,
                name: '代发货',
                isActive: false
            },
            {
                id: 3,
                name: '退款/退货',
                isActive: false

            }
        ]
    },
    onShow() {
        const token = wx.getStorageSync('token');
        // wx.setStorageSync('orders', orders);
        if (!token) {
            wx.navigateTo({
                url: '/pages/auth/index'
            });
            return;
        }
        // 1. 获取当前的小程序的页面栈-数组 长度最大是10页面
        let pages = getCurrentPages();
        // 2. 数组中 索引最大的页面就是当前页面
        let currentPage = pages[pages.length - 1];
        // 3. 获取url上的type参数
        const { type } = currentPage.options;
        // 4. 激活选中页面标题 type = index + 1
        this.changeTitleByIndex(type - 1);
        this.getOrders(type);
    },
    // 获取订单列表的方法
    async getOrders(type) {
        const res = await request({ url: '/my/order/all', data: { type } });
        // this.setData({
        //     orders: res.data.message.orders.map(v => ({...v, create_time_cn:(new Date(v.create_time * 1000).toLocaleString())}))
        // })
    },
    // 根据标题索引来激活选中 标题数组
    changeTitleByIndex(index) {
        // 2. 修改原数组
        let { tabs } = this.data;
        tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
        // 3. 赋值到data中
        this.setData({
            tabs
        })
    },
    handleTabsItemChange(e) {
        // 获取被点击的标题索引
        const { index } = e.detail;
        this.changeTitleByIndex(index);
        // 2. 重新发送请求
        this.getOrders(index + 1);
    }
})