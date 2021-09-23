/*
 * @Description  :
 * @Author       : pacino
 * @Date         : 2021-09-22 17:44:41
 * @LastEditTime : 2021-09-22 17:44:42
 * @LastEditors  : pacino
 */
import { post, get } from "@/utils/requestUtils";

//登录
export const login = (params) => {
  return post("/auth/login", params);
};
