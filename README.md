# OKF → Dataplex Knowledge Catalog Demo

Ingest data-asset metadata defined in **Open Knowledge Format (OKF)** into **Google Cloud Dataplex Knowledge Catalog**, then search and explore it through a CLI tool or a web application.

## Architecture Overview

```
knowledge_cata/ontology.yaml          ← Source-of-truth: tables & columns metadata
        │
        ▼
ontology/init.sh (kcmd init + push)   ← Converts OKF → Dataplex entries via kcmd
        │
        ▼
Dataplex Knowledge Catalog             ← Cloud-hosted catalog (search + context APIs)
        │
        ├── search_catalog.py          ← CLI: semantic / keyword search + context lookup
        │
        └── backend/main.py           ← FastAPI: exposes /api/search & /api/context
              └── frontend/           ← React (Vite) web UI
```

---

## Prerequisites

| Requirement | Notes |
|---|---|
| **GCP project** | Default: `lufeng-demo` |
| **Region** | Default: `us-central1` |
| **gcloud CLI** | Authenticated with `gcloud auth application-default login` |
| **Node.js ≥ 18** | Required to build `kcmd` |
| **Python ≥ 3.10** | For `search_catalog.py` and the backend |
| **`google-cloud-dataplex`** | `pip install google-cloud-dataplex` |

---

## Part 1 — Ingest OKF Data into Knowledge Catalog

### 1.1 Understand the OKF Structure

The metadata source lives in [`knowledge_cata/ontology.yaml`](knowledge_cata/ontology.yaml). Each entry is a YAML node describing a **table** or **column**:

```yaml
# Table example
- id: table.dwd_iap_order
  type: table
  name: IAP 订单明细表
  table_name: dwd_iap_order
  description: IAP 联运订单明细表，每笔订单一行。pay_type!=1 排除测试订单
  grain: event
  timestamp_column: date
  primary_keys: [order_id]
  partitions: [date]
  database: iceberg_alsgprc_hadoop
  schema: getapps
  owner: wenchao

# Column example
- id: column.dwd_iap_order.order_id
  type: column
  name: order_id
  table: table.dwd_iap_order
  data_type: STRING
  description: 订单唯一ID
  entity: entity.order
```

The file currently defines **17 tables** and their columns covering IAP orders, user events, search metrics, retention, and more.

### 1.2 Build the `kcmd` CLI Tool

`kcmd` (Knowledge Catalog Markdown Code) is the tool that converts OKF YAML into Dataplex catalog entries.

```bash
# Clone the knowledge-catalog repo
git clone https://github.com/GoogleCloudPlatform/knowledge-catalog
cd knowledge-catalog/toolbox/mdcode

# Install and build
npm install
npm run build        # produces dist/kcmd
```

### 1.3 Create the Dataplex Entry Group

Catalog entries are organized under an **entry group**. Create one if it doesn't exist:

```bash
gcloud dataplex entry-groups create xiaomi-ontology \
    --location=us-central1 \
    --project=lufeng-demo
```

### 1.4 Initialise and Push

The [`ontology/init.sh`](ontology/init.sh) script wraps the full ingestion workflow:

```bash
# Initialise the catalog structure (generates OKF markdown files from YAML)
kcmd init --kb lufeng-demo.us-central1.xiaomi-ontology

# Push entries to Dataplex Knowledge Catalog
kcmd push
```

This reads the catalog config in [`ontology/catalog.yaml`](ontology/catalog.yaml):

```yaml
scope: kb.lufeng-demo.us-central1.xiaomi-ontology
snapshot:
  entries:  [dataplex-types.global.generic]
  aspects:  [dataplex-types.global.generic, dataplex-types.global.overview]
publishing:
  entries:  [dataplex-types.global.generic]
  aspects:  [dataplex-types.global.generic, dataplex-types.global.overview]
```

After `kcmd push` completes, each table and column is published as a Dataplex entry under the `xiaomi-ontology` entry group, with `generic` entry type and `overview` aspects containing descriptions.

### 1.5 Generated OKF Markdown

`kcmd init` generates a structured markdown catalog under [`ontology/catalog/`](ontology/catalog/):

```
ontology/catalog/
├── index.md                          ← Root index listing all tables
└── tables/
    ├── dwd_iap_order.md              ← Table entry (frontmatter + description + columns)
    ├── dwd_iap_order/
    │   ├── order_id.md               ← Column entry
    │   ├── user_id.md
    │   └── ...
    ├── dwd_user_event_log.md
    ├── dwd_user_event_log/
    │   ├── gaid.md
    │   └── ...
    └── ... (17 tables total)
```

Each `.md` file contains YAML frontmatter (parsed by `kcmd`) and a human-readable body.

### 1.6 Run the Full Ingestion (Quick Start)

```bash
cd ontology
bash init.sh
```

> **Note:** Edit the `kcmd` path in `init.sh` if your `knowledge-catalog` clone is in a different location.

---

## Part 2 — Search the Catalog with `search_catalog.py`

[`search_catalog.py`](search_catalog.py) is a standalone CLI tool that searches and retrieves context from Dataplex Knowledge Catalog using the Python SDK.

### 2.1 Install Dependencies

```bash
pip install google-cloud-dataplex
```

Make sure you're authenticated:

```bash
gcloud auth application-default login
```

### 2.2 Search Modes

The tool supports two search modes:

| Mode | Flag | Description |
|---|---|---|
| **Semantic** | `--semantic` | Natural language search (e.g. Chinese business terms) |
| **Keyword** | _(default)_ | Dataplex query syntax (e.g. `name:dwd_iap_order`, `column:user_id`) |

### 2.3 Usage Examples

#### Semantic search (natural language)

```bash
# Search using Chinese business terms
python3 search_catalog.py "联运订单" --semantic

# Search for user events
python3 search_catalog.py "用户事件日志" --semantic

# Search for retention data
python3 search_catalog.py "应用保有率" --semantic
```

#### Keyword search

```bash
# Search by table name
python3 search_catalog.py "name:dwd_iap_order"

# Search by column name
python3 search_catalog.py "column:user_id"

# Search with a general keyword
python3 search_catalog.py "getapps"
```

#### Search-only (skip context lookup)

```bash
python3 search_catalog.py "联运订单" --semantic --search-only
```

This runs **Step 2** (search) only and skips **Step 3** (context lookup), useful for quick discovery.

#### Customise results

```bash
python3 search_catalog.py "联运订单" --semantic \
    --project lufeng-demo \
    --location us-central1 \
    --limit 5 \
    --context-format yaml \
    --context-budget 4000
```

### 2.4 CLI Options Reference

| Option | Default | Description |
|---|---|---|
| `query` _(positional)_ | — | Search query (required) |
| `--project` | `lufeng-demo` | GCP project ID |
| `--location` | `us-central1` | Location for context lookup |
| `--semantic` | `False` | Enable natural language search |
| `--limit` | `10` | Max results (1–1000) |
| `--order-by` | `relevance` | `relevance` or `last_modified_timestamp` |
| `--scope` | `None` | Restrict to `projects/<id>` or `organizations/<id>` |
| `--search-only` | `False` | Skip context lookup |
| `--context-format` | `yaml` | Output format: `yaml`, `xml`, or `json` |
| `--context-budget` | `None` | Character budget for context response |

### 2.5 What the Tool Does

The script implements a two-step workflow:

1. **Step 2 — Search entries**: Calls `dataplex_v1.CatalogServiceClient.search_entries()` with the query. Returns entry names, display names, descriptions, entry types, FQN, and parent entries.

2. **Step 3 — Lookup context**: For each search result, calls `dataplex_v1.CatalogServiceClient.lookup_context()` to retrieve rich, LLM-ready metadata including schema, business descriptions, data profile, quality scores, and relationships.

### 2.6 Example Output

```
[Step 2] Searching (Semantic): "联运订单"
         project=lufeng-demo  limit=10

Found 3 result(s):

────────────────────────────────────────────────────────────────────────────────
  [1] projects/lufeng-demo/locations/us-central1/entryGroups/xiaomi-ontology/entries/...
      Type:        projects/.../entryTypes/generic
      DisplayName: IAP 订单明细表
      Description: IAP 联运订单明细表，每笔订单一行。pay_type!=1 排除测试订单
      ...

[Step 3] Looking up context for 3 entry(s)...

════════════════════════════════════════════════════════════════════════════════
  Context for [1]: IAP 订单明细表
  ...
  (YAML context with schema, columns, descriptions, etc.)
```

### 2.7 Using as a Library

You can also import the functions directly in your own Python code:

```python
from google.cloud import dataplex_v1
from search_catalog import search_entries, lookup_context

client = dataplex_v1.CatalogServiceClient()

# Search
results = search_entries(
    client=client,
    project="lufeng-demo",
    query="联运订单",
    semantic=True,
    limit=5,
)

# Get context for the first result
if results:
    context = lookup_context(
        client=client,
        project="lufeng-demo",
        location="us-central1",
        resource_names=[results[0]["name"]],
        context_format="yaml",
    )
    print(context)
```

---

## Part 3 — Web Application

A web UI is also provided for interactive searching.

### Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19 + TypeScript + Vite |
| Backend | FastAPI (Python) |
| API | `POST /api/search` — semantic search; `GET /api/context?entry_name=...` — context lookup |

### Run Locally

```bash
# 1. Install backend dependencies
pip install -r backend/requirements.txt

# 2. Install frontend dependencies & build
cd frontend && npm install && npm run build && cd ..

# 3. Start the server
uvicorn backend.main:app --reload --port 8000
```

Open [http://localhost:8000](http://localhost:8000) in your browser.

### Run with Docker

```bash
docker build -t okf-demo .
docker run -p 8080:8080 \
    -v ~/.config/gcloud:/root/.config/gcloud:ro \
    okf-demo
```

### Deploy to Cloud Run

```bash
gcloud run deploy okf-demo \
    --source . \
    --region us-central1 \
    --project lufeng-demo \
    --allow-unauthenticated
```

---

## Project Structure

```
okf-demo/
├── knowledge_cata/
│   └── ontology.yaml              # Source OKF metadata (tables + columns)
├── ontology/
│   ├── catalog.yaml               # kcmd catalog configuration
│   ├── init.sh                    # Ingestion script (kcmd init + push)
│   └── catalog/                   # Generated OKF markdown entries
│       ├── index.md
│       └── tables/
│           ├── dwd_iap_order.md
│           ├── dwd_iap_order/     # Column-level entries
│           └── ...
├── search_catalog.py              # CLI search + context lookup tool
├── backend/
│   ├── main.py                    # FastAPI backend
│   └── requirements.txt
├── frontend/                      # React + Vite web application
│   ├── src/
│   └── package.json
├── Dockerfile                     # Multi-stage build (frontend + backend)
└── README.md
```
