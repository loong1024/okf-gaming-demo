---
database: iceberg_alsgprc_hadoop
description: GetApps 核心埋点明细表，记录所有 action_type 事件，用户标识为 gaid。所有 GA 口径指标的数据源。支持渠道归因和场景分析。
grain: event
id: table.dwd_user_event_log
name: 用户事件日志表
owner: wenchao
partitions:
- date
primary_keys:
- gaid
- date
- action_type
schema: getapps
table_name: dwd_user_event_log
timestamp_column: date
type: table
---
# 用户事件日志表 (dwd_user_event_log)

GetApps 核心埋点明细表，记录所有 action_type 事件，用户标识为 gaid。所有 GA 口径指标的数据源。支持渠道归因和场景分析。

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: getapps
- **Owner**: wenchao
- **Grain**: event
- **Timestamp Column**: date

## Columns
- [gaid](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/gaid.md) - 用户唯一标识（Google Advertising ID） (STRING)
- [date](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/date.md) - 日期分区，格式 yyyyMMdd (INT)
- [action_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/action_type.md) - 事件类型：application_launch/item_click/item_exposure/download_install/search 等 (STRING)
- [package_name](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/package_name.md) - 应用包名 (STRING)
- [first_page_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/first_page_type.md) - 首次页面类型，用于渠道归因和 DAU 口径过滤 (STRING)
- [cur_page_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/cur_page_type.md) - 当前页面类型，用于场景归因 (STRING)
- [pre_page_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/pre_page_type.md) - 上一页面类型，用于详情页回溯归因 (STRING)
- [cur_page_category](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/cur_page_category.md) - 当前页面分类，用于 minicard 卡片类型判断 (STRING)
- [install_status](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/install_status.md) - 安装状态：download_request/download_success/install_success/activate 等 (STRING)
- [install_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/install_type.md) - 安装类型：manual_install/auto_install (STRING)
- [first_launch_day](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/first_launch_day.md) - 商店首次启动日期，用于新增用户判断 (string)
- [from_page_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/from_page_type.md) - 来源页面类型（已内置详情页回溯逻辑） (STRING)
- [channel_level1](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/channel_level1.md) - 一级渠道 (STRING)
- [channel_key](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/channel_key.md) - 渠道标识，ias/isa 用于 Indus 口径 (STRING)
- [rom_sku](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/rom_sku.md) - ROM SKU，in=印度 Indus 版本 (STRING)
- [launch_ref](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/launch_ref.md) - 启动来源引用 (STRING)
- [launch_pkg](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/launch_pkg.md) - 启动来源包名 (STRING)
- [lo](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/lo.md) - 国家代码 (STRING)
- [model](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/model.md) - 设备型号 (STRING)
- [fail_reason](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log/fail_reason.md) - 失败原因码，3=用户取消 68=用户暂停 (STRING)
