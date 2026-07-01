---
database: iceberg_alsgprc_hadoop
description: IAP 联运事件明细表，记录支付相关事件
grain: event
id: table.dwd_iap_event
name: IAP 事件明细表
owner: jtan
partitions:
- date
primary_keys:
- order_id
- event_type
schema: getapps
table_name: dwd_iap_event
timestamp_column: date
type: table
---
# IAP 事件明细表 (dwd_iap_event)

IAP 联运事件明细表，记录支付相关事件

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: getapps
- **Owner**: jtan
- **Grain**: event
- **Timestamp Column**: date

## Columns
No columns defined.
