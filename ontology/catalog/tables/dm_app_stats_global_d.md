---
database: iceberg_alsgprc_hadoop.appstore
description: MIUI 系统级应用使用统计表，MIUI 口径 DAU 数据源。按 package_name 聚合，无用户级明细
grain: daily_package
id: table.dm_app_stats_global_d
name: MIUI 应用统计日表
partitions:
- date
primary_keys:
- package_name
- date
table_name: dm_app_stats_global_d
timestamp_column: date
type: table
---
# MIUI 应用统计日表 (dm_app_stats_global_d)

MIUI 系统级应用使用统计表，MIUI 口径 DAU 数据源。按 package_name 聚合，无用户级明细

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop.appstore
- **Grain**: daily_package
- **Timestamp Column**: date

## Columns
No columns defined.
