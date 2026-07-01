---
database: iceberg_alsgprc_hadoop
description: ADS 层应用活跃留存预计算表，retain_stay_n 枚举值为 2/7/30（不含 N=1 次日留存），retain_denominator
  为基准日活跃用户数，retain_numerator 为第 N 天留存用户数
grain: daily_app_country
id: table.ads_getapps_app_act_retain_stay_d_v2
name: 应用活跃留存预计算表
owner: zhangzhening
partitions:
- date
schema: getapps
table_name: ads_getapps_app_act_retain_stay_d_v2
timestamp_column: date
type: table
---
# 应用活跃留存预计算表 (ads_getapps_app_act_retain_stay_d_v2)

ADS 层应用活跃留存预计算表，retain_stay_n 枚举值为 2/7/30（不含 N=1 次日留存），retain_denominator 为基准日活跃用户数，retain_numerator 为第 N 天留存用户数

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: getapps
- **Owner**: zhangzhening
- **Grain**: daily_app_country
- **Timestamp Column**: date

## Columns
No columns defined.
