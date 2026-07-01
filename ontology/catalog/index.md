---
type: index
title: Xiaomi Data Catalog Ontology
description: Root index of the Xiaomi Data Catalog Ontology.
---
# Xiaomi Data Catalog Ontology

This ontology contains the data models, tables, and columns defining the Xiaomi Data Catalog. It is organized according to the Open Knowledge Format (OKF).

## Tables
- [应用活跃留存预计算表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/ads_getapps_app_act_retain_stay_d_v2.md) (`ads_getapps_app_act_retain_stay_d_v2`): ADS 层应用活跃留存预计算表，retain_stay_n 枚举值为 2/7/30（不含 N=1 次日留存），retain_denominator 为基准...
- [应用保有率预计算表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/ads_getapps_app_retain_stay_d_v2.md) (`ads_getapps_app_retain_stay_d_v2`): ADS 层应用保有率预计算表，基于 MIUIBI 安装事件体系（imeimd5 标识）。retain_stay_n 为保有天数，retain_denomi...
- [应用国家维度快照表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dim_appstore_app_country_snapshot_d.md) (`dim_appstore_app_country_snapshot_d`): GetApps(小米应用商店)应用维度快照表，按国家维度记录每个应用每天的完整属性信息。包含应用基础信息(名称/包名/开发者/版本)、上架状态(GA/GP...
- [应用维度表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dim_getapps_union_app.md) (`dim_getapps_union_app`): GetApps 应用维度表，包含应用基础信息
- [MIUI 应用统计日表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dm_app_stats_global_d.md) (`dm_app_stats_global_d`): MIUI 系统级应用使用统计表，MIUI 口径 DAU 数据源。按 package_name 聚合，无用户级明细
- [dwd_appstore_active_info_di](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_appstore_active_info_di.md) (`dwd_appstore_active_info_di`): 服务器激活上报表，记录应用激活上报日志
- [dwd_appstore_updateinfo_di](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_appstore_updateinfo_di.md) (`dwd_appstore_updateinfo_di`): 服务器检查更新和下载表，记录应用检查更新及下载接口日志
- [IAP 事件明细表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_event.md) (`dwd_iap_event`): IAP 联运事件明细表，记录支付相关事件
- [IAP 订单明细表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_iap_order.md) (`dwd_iap_order`): IAP 联运订单明细表，每笔订单一行。pay_type!=1 排除测试订单
- [用户事件日志表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dwd_user_event_log.md) (`dwd_user_event_log`): GetApps 核心埋点明细表，记录所有 action_type 事件，用户标识为 gaid。所有 GA 口径指标的数据源。支持渠道归因和场景分析。
- [C端核心数据表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_c_core_data.md) (`dws_c_core_data`): C端核心指标汇总表
- [渠道页面日表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_channel_page_d.md) (`dws_channel_page_d`): 渠道×页面维度的 DAU 快速查询表。直接 SUM UV 会因跨页面重复计数而偏高
- [GetApps 全维度汇总表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di.md) (`dws_getapps_alldimension_di`): DWS 层全维度预聚合表，按 lo x channel_level1 x cur_page_type x date 粒度聚合。字段为 PV 级预聚合，SU...
- [搜索核心日表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_search_core_di.md) (`dws_getapps_search_core_di`): 搜索核心指标汇总表。粒度：lo × market_v × channel × date。包含搜索UV/PV、搜索结果页曝光、点击、安装等核心搜索漏斗指标
- [IAP 订单汇总表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_iap_order_di.md) (`dws_iap_order_di`): 联运支付 DWS 层汇总表，仅存在于新加坡（SG）集群。paid_price 字段在 appstore 库额外含 payment_status=4 条件，...
- [Minicard 下载风险日表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_minicard_download_risk_d.md) (`dws_minicard_download_risk_d`): Minicard 下载风险监控表
- [商店统计周表](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_store_stat_weekly.md) (`dws_store_stat_weekly`): 商店核心指标周度汇总表
