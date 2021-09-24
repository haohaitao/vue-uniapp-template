import { post, get } from '@/utils/requestUtils';

//登录
export const login = params => {
    return post('/auth/login', params);
};
