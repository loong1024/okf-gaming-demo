---
database: iceberg_alsgprc_hadoop
description: 渠道×页面维度的 DAU 快速查询表。直接 SUM UV 会因跨页面重复计数而偏高
grain: daily_channel_page
id: table.dws_channel_page_d
name: 渠道页面日表
owner: wenchao
partitions:
- date
schema: appstore
table_name: dws_channel_page_d
timestamp_column: date
type: table
---
# 渠道页面日表 (dws_channel_page_d)

渠道×页面维度的 DAU 快速查询表。直接 SUM UV 会因跨页面重复计数而偏高

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: appstore
- **Owner**: wenchao
- **Grain**: daily_channel_page
- **Timestamp Column**: date

## Columns
- [date](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_channel_page_d/date.md) - 日期分区 (integer)
- [lo](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_channel_page_d/lo.md) - 国家代码 (varchar)
- [channel](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_channel_page_d/channel.md) - 渠道 (varchar)
- [cur_page_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_channel_page_d/cur_page_type.md) - 当前 (varchar)
