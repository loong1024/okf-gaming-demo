---
database: iceberg_alsgprc_hadoop
description: 联运支付 DWS 层汇总表，仅存在于新加坡（SG）集群。paid_price 字段在 appstore 库额外含 payment_status=4
  条件，与 DWD 层口径存在系统性偏差
grain: daily_dimension
id: table.dws_iap_order_di
name: IAP 订单汇总表
owner: wenchao
partitions:
- date
schema: appstore
table_name: dws_iap_order_di
timestamp_column: date
type: table
---
# IAP 订单汇总表 (dws_iap_order_di)

联运支付 DWS 层汇总表，仅存在于新加坡（SG）集群。paid_price 字段在 appstore 库额外含 payment_status=4 条件，与 DWD 层口径存在系统性偏差

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: appstore
- **Owner**: wenchao
- **Grain**: daily_dimension
- **Timestamp Column**: date

## Columns
- [date](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/date.md) - 日期分区 (integer)
- [region](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/region.md) - 国家/地区 (varchar)
- [currency](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/currency.md) - 币种 (varchar)
- [package_name](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/package_name.md) - 应用包名 (varchar)
- [all_order](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/all_order.md) - 拉起收银台订单数 (bigint)
- [click_order](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/click_order.md) - 点击支付订单数 (bigint)
- [paid_order](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/paid_order.md) - 支付成功订单数 (bigint)
- [all_user](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/all_user.md) - 拉起收银台UV (bigint)
- [paid_user](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/paid_user.md) - 支付成功UV (bigint)
- [paid_price](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/paid_price.md) - 支付金额(appstore库额外含 payment_status=4) (double)
- [income](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/income.md) - 收入(扣税后) (double)
- [catalog](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/catalog.md) - 集群标识 (varchar)
- [appname](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di/appname.md) - 应用名称 (varchar)
