---
database: iceberg_alsgprc_hadoop
description: ADS 层应用保有率预计算表，基于 MIUIBI 安装事件体系（imeimd5 标识）。retain_stay_n 为保有天数，retain_denominator
  为基准日新增安装数，retain_numerator 为第 N 天保有数。已过滤日活 < 100 或新增 < 1000 的包
grain: daily_app_country
id: table.ads_getapps_app_retain_stay_d_v2
name: 应用保有率预计算表
owner: zhangzhening
partitions:
- date
schema: getapps
table_name: ads_getapps_app_retain_stay_d_v2
timestamp_column: date
type: table
---
# 应用保有率预计算表 (ads_getapps_app_retain_stay_d_v2)

ADS 层应用保有率预计算表，基于 MIUIBI 安装事件体系（imeimd5 标识）。retain_stay_n 为保有天数，retain_denominator 为基准日新增安装数，retain_numerator 为第 N 天保有数。已过滤日活 < 100 或新增 < 1000 的包

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: getapps
- **Owner**: zhangzhening
- **Grain**: daily_app_country
- **Timestamp Column**: date

## Columns
No columns defined.
