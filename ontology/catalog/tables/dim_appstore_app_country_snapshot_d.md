---
database: appstore
description: GetApps(小米应用商店)应用维度快照表，按国家维度记录每个应用每天的完整属性信息。包含应用基础信息(名称/包名/开发者/版本)、上架状态(GA/GP)、分类标签、质量分级(S/A/B/C/D/E)、联运类型、版本一致性、高风险标记、系统应用类型等维度，以及当日首次启动用户数指标。
full_name: iceberg_alsgprc_hadoop.appstore.dim_appstore_app_country_snapshot_d
granularity: appid × country × date
id: table.dim_appstore_app_country_snapshot_d
key_dimensions:
- country
- ga_status
- intlcategory_level1
- app_level
- payment_sdk
- system_app_type
key_metrics:
- day_first_launch
- total_day_first_launch
layer: DIM
name: 应用国家维度快照表
owner: wenchao
partition: date (YYYYMMDD)
schedule: 每天 02:30
type: table
---
# 应用国家维度快照表 (dim_appstore_app_country_snapshot_d)

GetApps(小米应用商店)应用维度快照表，按国家维度记录每个应用每天的完整属性信息。包含应用基础信息(名称/包名/开发者/版本)、上架状态(GA/GP)、分类标签、质量分级(S/A/B/C/D/E)、联运类型、版本一致性、高风险标记、系统应用类型等维度，以及当日首次启动用户数指标。

## Metadata
- **Type**: table
- **Database**: appstore
- **Owner**: wenchao

## Columns
No columns defined.
