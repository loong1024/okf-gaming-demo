---
database: iceberg_alsgprc_hadoop
description: C端核心指标汇总表
grain: daily
id: table.dws_c_core_data
name: C端核心数据表
owner: wenchao
partitions:
- date
schema: appstore
table_name: dws_c_core_data
timestamp_column: date
type: table
---
# C端核心数据表 (dws_c_core_data)

C端核心指标汇总表

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: appstore
- **Owner**: wenchao
- **Grain**: daily
- **Timestamp Column**: date

## Columns
- [date](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/date.md) - 日期分区 (integer)
- [catalog](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/catalog.md) - 集群标识 (varchar)
- [lo](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/lo.md) - 国家代码 (varchar)
- [ga_dau](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/ga_dau.md) - GA口径DAU (bigint)
- [miui_dau](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/miui_dau.md) - MIUI口径DAU (bigint)
- [install_success_puv_ads](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/install_success_puv_ads.md) - 安装成功PUV(ADS口径) (bigint)
- [item_exp_pv](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/item_exp_pv.md) - 内容曝光PV (bigint)
- [item_click_pv](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/item_click_pv.md) - 内容点击PV (bigint)
- [download_request_pv](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/download_request_pv.md) - 下载请求PV (bigint)
- [install_success_pv](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/install_success_pv.md) - 安装成功PV (bigint)
- [retention_dau](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/retention_dau.md) - 次留DAU (bigint)
- [newuser_dau](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data/newuser_dau.md) - 新增DAU (bigint)
