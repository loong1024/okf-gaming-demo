---
database: iceberg_alsgprc_hadoop
description: Minicard 下载风险监控表
grain: daily
id: table.dws_minicard_download_risk_d
name: Minicard 下载风险日表
owner: wenchao
partitions:
- date
schema: getapps
table_name: dws_minicard_download_risk_d
timestamp_column: date
type: table
---
# Minicard 下载风险日表 (dws_minicard_download_risk_d)

Minicard 下载风险监控表

## Metadata
- **Type**: table
- **Database**: iceberg_alsgprc_hadoop
- **Schema**: getapps
- **Owner**: wenchao
- **Grain**: daily
- **Timestamp Column**: date

## Columns
- [date](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_minicard_download_risk_d/date.md) - 日期分区 (integer)
- [lo](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_minicard_download_risk_d/lo.md) - 国家代码 (varchar)
- [package_name](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_minicard_download_risk_d/package_name.md) - 应用包名 (varchar)
- [level](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_minicard_download_risk_d/level.md) - 风险等级 (varchar)
- [download_request_cnt](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_minicard_download_risk_d/download_request_cnt.md) - 下载请求次数 (bigint)
- [install_success_cnt](file:///Users/lufengsh/work/xiaomi/ontology/catalog/tables/dws_minicard_download_risk_d/install_success_cnt.md) - 安装成功次数 (bigint)
