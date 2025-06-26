export interface ListRes {
  list: ListItem[];
}

export interface ListItem {
  id: string | number;
  /** 产品名称 */
  productName: string;
  /** 物料编号 */
  materialCode: string;
  /** 箱码 */
  boxCode: string;
  /** 物料数量 */
  materialCount: number;
}
