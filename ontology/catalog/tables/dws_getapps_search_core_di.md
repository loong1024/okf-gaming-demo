---
database: iceberg_alsgprc_hadoop
description: 搜索核心指标汇总表。粒度：lo × market_v × channel × date。包含搜索UV/PV、搜索结果页曝光、点击、安装等核心搜索漏斗指标
grain: daily
id: table.dws_getapps_search_core_di
name: 搜索核心日表
owner: jimingjun
partitions:
- date
schema: getapps
table_name: dws_getapps_search_core_di
timestamp_column: date
type: table
---
# 搜索核心日表 (dws_getapps_search_core_di)

搜索核心指标汇总表。粒度：lo × market_v × channel × date。包含搜索UV/PV、搜索结果页曝光、点击、安装等核心搜索漏斗指标

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: getapps
- **Owner**: jimingjun
- **Grain**: daily
- **Timestamp Column**: date

## Columns
- [date](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_search_core_di/date.md) - 日期分区 (integer)
- [lo](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_search_core_di/lo.md) - 国家代码 (varchar)
- [dau](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_search_core_di/dau.md) - DAU (bigint)
- [search_uv](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_search_core_di/search_uv.md) - 搜索UV (bigint)
- [search_pv](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_search_core_di/search_pv.md) - 搜索PV (bigint)
- [channel_level1](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_search_core_di/channel_level1.md) - 一级渠道 (varchar)
