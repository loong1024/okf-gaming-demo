---
database: iceberg_alsgprc_hadoop
description: DWS 层全维度预聚合表，按 lo x channel_level1 x cur_page_type x date 粒度聚合。字段为 PV
  级预聚合，SUM 到更粗粒度会重复计数，不可直接用于精确 UV 计算
grain: daily_dimension
id: table.dws_getapps_alldimension_di
name: GetApps 全维度汇总表
owner: wenchao
partitions:
- date
schema: appstore
table_name: dws_getapps_alldimension_di
timestamp_column: date
type: table
---
# GetApps 全维度汇总表 (dws_getapps_alldimension_di)

DWS 层全维度预聚合表，按 lo x channel_level1 x cur_page_type x date 粒度聚合。字段为 PV 级预聚合，SUM 到更粗粒度会重复计数，不可直接用于精确 UV 计算

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: appstore
- **Owner**: wenchao
- **Grain**: daily_dimension
- **Timestamp Column**: date

## Columns
- [lo](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/lo.md) - 国家代码 (varchar)
- [channel_level1](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/channel_level1.md) - 一级渠道 (varchar)
- [cur_page_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/cur_page_type.md) - 当前页面类型 (varchar)
- [package_name](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/package_name.md) - 应用包名 (varchar)
- [date](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/date.md) - 日期分区 (integer)
- [launch](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/launch.md) - 启动PV (integer)
- [page_exposure](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/page_exposure.md) - 页面曝光PV (integer)
- [item_exposure](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/item_exposure.md) - 内容曝光PV (integer)
- [item_click](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/item_click.md) - 内容点击PV (integer)
- [download_request](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/download_request.md) - 下载请求PV (integer)
- [download_success](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/download_success.md) - 下载成功PV (integer)
- [install_success](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/install_success.md) - 安装成功PV (integer)
- [activate](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/activate.md) - 激活PV (integer)
- [catalog](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/catalog.md) - 集群标识 (varchar)
- [first_page_type](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/first_page_type.md) - 首次页面类型 (varchar)
- [model](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_getapps_alldimension_di/model.md) - 设备型号 (varchar)
