---
database: iceberg_alsgprc_hadoop
description: GetApps 应用维度表，包含应用基础信息
grain: snapshot
id: table.dim_getapps_union_app
name: 应用维度表
owner: wenchao
partitions:
- date
primary_keys:
- package_name
schema: getapps
table_name: dim_getapps_union_app
timestamp_column: date
type: table
---
# 应用维度表 (dim_getapps_union_app)

GetApps 应用维度表，包含应用基础信息

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: getapps
- **Owner**: wenchao
- **Grain**: snapshot
- **Timestamp Column**: date

## Columns
No columns defined.
