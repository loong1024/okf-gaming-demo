---
database: iceberg_alsgprc_hadoop
description: IAP 联运订单明细表，每笔订单一行。pay_type!=1 排除测试订单
grain: event
id: table.dwd_iap_order
name: IAP 订单明细表
owner: wenchao
partitions:
- date
primary_keys:
- order_id
schema: getapps
table_name: dwd_iap_order
timestamp_column: date
type: table
---
# IAP 订单明细表 (dwd_iap_order)

IAP 联运订单明细表，每笔订单一行。pay_type!=1 排除测试订单

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: getapps
- **Owner**: wenchao
- **Grain**: event
- **Timestamp Column**: date

## Columns
- [order_id](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/order_id.md) - 订单唯一ID (STRING)
- [user_id](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/user_id.md) - 用户唯一ID (STRING)
- [pay_status](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/pay_status.md) - 支付状态，0=拉起收银台 1=点击支付 2=支付成功 3=关单 5=已发起退款 6=退款成功 (INT)
- [pay_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/pay_type.md) - 支付类型，1=测试订单需排除 (INT)
- [pay_mid](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/pay_mid.md) - 支付商户ID，H398305=Aptoide订单 (STRING)
- [pay_usd](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/pay_usd.md) - 订单美元金额 (DOUBLE)
- [income_usd](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/income_usd.md) - 美元收入（扣税后） (DOUBLE)
- [region](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/region.md) - 国家/地区 (STRING)
- [package_name](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/package_name.md) - 应用包名 (STRING)
- [currency](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/currency.md) - 币种 (STRING)
- [date](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order/date.md) - 日期分区 (int)
