<template>
    <view class="content">
        <image class="logo" src="/static/logo.png"></image>
        <view>
            <text class="title">{{ title }}</text>
        </view>
    </view>
</template>

<script>
    import { login } from '@/apis/userApi';
    export default {
        data() {
            return {
                title: 'Hello'
            };
        },
        async onLoad() {
            const params = { username: 'admin', password: 'admin' };
            const result = await login(params);
            console.log('---result---', result);
        },
        methods: {}
    };
</script>

<style>
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .logo {
        height: 200rpx;
        width: 200rpx;
        margin: 200rpx auto 50rpx auto;
    }

    .text-area {
        display: flex;
        justify-content: center;
    }

    .title {
        font-size: 36rpx;
        color: #8f8f94;
    }
</style>
