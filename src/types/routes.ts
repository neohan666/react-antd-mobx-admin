/**
 * @Description: 路由相关类型定义
 * @Author: Neo
 * @Date: 2022-03-18
 * @LastEditTime: 2022-03-18
 * @LastEditors: Neo
 */
import { RoutesItemType } from 'react-router-waiter'

export interface RoutesItemTypeNew extends RoutesItemType {
  url?: string;
}

export type RoutesTypeNew = RoutesItemTypeNew[]
