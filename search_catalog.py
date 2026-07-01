#!/usr/bin/env python3
"""Search for resources in Dataplex Knowledge Catalog and retrieve rich context.

Implements the discovering-gcp-data-assets workflow:
  Step 2: Search entries (semantic or keyword) to discover assets.
  Step 3: Lookup high-fidelity context for each matched entry.

Usage:
    # Semantic search (natural language)
    python3 search_catalog.py "联运订单" --semantic

    # Keyword search with Dataplex query syntax
    python3 search_catalog.py "name:dwd_iap_order"

    # Search only (skip context lookup)
    python3 search_catalog.py "联运订单" --semantic --search-only

    # Customize project, location, limit, and context format
    python3 search_catalog.py "联运订单" --semantic \
        --project lufeng-demo --location us-central1 \
        --limit 5 --context-format yaml --context-budget 4000

References:
    - Search API: https://docs.cloud.google.com/dataplex/docs/search-assets
    - Context API: https://docs.cloud.google.com/dataplex/docs/retrieve-data-context
"""

import argparse
import re
import sys

from google.cloud import dataplex_v1


# ---------------------------------------------------------------------------
# Step 2: Search entries
# ---------------------------------------------------------------------------
def search_entries(
    client: dataplex_v1.CatalogServiceClient,
    project: str,
    query: str,
    semantic: bool = False,
    limit: int = 10,
    order_by: str = "relevance",
    scope: str | None = None,
) -> list[dict]:
    """Search for entries in the Dataplex Knowledge Catalog.

    Args:
        client: CatalogServiceClient instance.
        project: GCP project ID used to attribute the search request.
        query: Search query (keyword syntax or natural language).
        semantic: If True, use semantic (natural language) search.
        limit: Maximum number of results to return (1–1000).
        order_by: Result ordering ('relevance' or 'last_modified_timestamp').
        scope: Optional scope restriction (e.g. 'projects/<id>').

    Returns:
        List of dicts with entry metadata extracted from search results.
    """
    request = dataplex_v1.SearchEntriesRequest(
        name=f"projects/{project}/locations/global",
        query=query,
        page_size=limit,
        order_by=order_by,
        semantic_search=semantic,
    )
    if scope:
        request.scope = scope

    results = client.search_entries(request=request)

    entries = []
    for result in results:
        entry = result.dataplex_entry
        info = {
            "name": entry.name,
            "entry_type": entry.entry_type,
            "display_name": "",
            "description": "",
            "system": "",
            "resource": "",
            "fqn": entry.fully_qualified_name or "",
            "parent": entry.parent_entry or "",
        }
        if entry.entry_source:
            info["display_name"] = entry.entry_source.display_name or ""
            info["description"] = entry.entry_source.description or ""
            info["system"] = entry.entry_source.system or ""
            info["resource"] = entry.entry_source.resource or ""
        entries.append(info)
        if len(entries) >= limit:
            break

    return entries


def _extract_location(entry_name: str) -> str:
    """Extract the location from a full entry name.

    e.g. 'projects/123/locations/us-central1/entryGroups/...' -> 'us-central1'
    """
    m = re.search(r"locations/([^/]+)/", entry_name)
    return m.group(1) if m else "us-central1"


# ---------------------------------------------------------------------------
# Step 3: Lookup context
# ---------------------------------------------------------------------------
def lookup_context(
    client: dataplex_v1.CatalogServiceClient,
    project: str,
    location: str,
    resource_names: list[str],
    context_format: str = "yaml",
    context_budget: int | None = None,
) -> str:
    """Retrieve high-fidelity context for a list of entry resources.

    Uses the Dataplex lookupContext API to fetch LLM-ready metadata
    (schema, business descriptions, data profile, quality, relationships).

    Args:
        client: CatalogServiceClient instance.
        project: GCP project ID.
        location: Location of the entry resources (e.g. 'us-central1').
        resource_names: Full entry names (max 10).
        context_format: Output format ('yaml', 'xml', or 'json').
        context_budget: Optional character budget for the response.

    Returns:
        Pre-formatted context string.
    """
    options = {"format": context_format}
    if context_budget is not None:
        options["context_budget"] = str(context_budget)

    request = dataplex_v1.LookupContextRequest(
        name=f"projects/{project}/locations/{location}",
        resources=resource_names,
        options=options,
    )

    response = client.lookup_context(request=request)
    return response.context


# ---------------------------------------------------------------------------
# Display helpers
# ---------------------------------------------------------------------------
def print_search_results(entries: list[dict], mode: str) -> None:
    """Print search results in a readable format."""
    if not entries:
        print("No results found.")
        return

    print(f"Found {len(entries)} result(s):\n")
    for i, e in enumerate(entries, 1):
        print(f"{'─' * 80}")
        print(f"  [{i}] {e['name']}")
        print(f"      Type:        {e['entry_type']}")
        if e["display_name"]:
            print(f"      DisplayName: {e['display_name']}")
        if e["description"]:
            desc = e["description"]
            if len(desc) > 120:
                desc = desc[:120] + "..."
            print(f"      Description: {desc}")
        if e["system"]:
            print(f"      System:      {e['system']}")
        if e["resource"]:
            print(f"      Resource:    {e['resource']}")
        if e["fqn"]:
            print(f"      FQN:         {e['fqn']}")
        if e["parent"]:
            print(f"      Parent:      {e['parent']}")
        print()
    print(f"{'─' * 80}")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------
def main():
    parser = argparse.ArgumentParser(
        description=(
            "Search Dataplex Knowledge Catalog and retrieve rich context "
            "for matched data assets."
        ),
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=(
            "Examples:\n"
            '  python3 search_catalog.py "联运订单" --semantic\n'
            '  python3 search_catalog.py "name:dwd_iap_order" --limit 5\n'
            '  python3 search_catalog.py "联运订单" --semantic --search-only\n'
            '  python3 search_catalog.py "联运订单" --semantic '
            "--context-format json --context-budget 4000\n"
        ),
    )
    parser.add_argument(
        "query",
        help=(
            "Search query. Use natural language for --semantic mode, "
            "or Dataplex keyword syntax (e.g. 'name:order', 'column:user_id')."
        ),
    )
    parser.add_argument(
        "--project",
        default="lufeng-demo",
        help="GCP project ID for search attribution (default: lufeng-demo).",
    )
    parser.add_argument(
        "--location",
        default="us-central1",
        help="Location for context lookup (default: us-central1).",
    )
    parser.add_argument(
        "--semantic",
        action="store_true",
        help="Enable semantic (natural language) search instead of keyword search.",
    )
    parser.add_argument(
        "--limit",
        type=int,
        default=10,
        help="Maximum number of search results (default: 10, max: 1000).",
    )
    parser.add_argument(
        "--order-by",
        default="relevance",
        choices=[
            "relevance",
            "last_modified_timestamp",
            "last_modified_timestamp asc",
        ],
        help="Result ordering (default: relevance).",
    )
    parser.add_argument(
        "--scope",
        default=None,
        help=(
            "Optional scope restriction "
            "(e.g. 'projects/<project>' or 'organizations/<org>')."
        ),
    )
    parser.add_argument(
        "--search-only",
        action="store_true",
        help="Only run the search step; skip context lookup.",
    )
    parser.add_argument(
        "--context-format",
        default="yaml",
        choices=["yaml", "xml", "json"],
        help="Format for context output (default: yaml).",
    )
    parser.add_argument(
        "--context-budget",
        type=int,
        default=None,
        help="Character budget for context output (optional).",
    )

    args = parser.parse_args()

    if args.limit < 1 or args.limit > 1000:
        print("Error: --limit must be between 1 and 1000.", file=sys.stderr)
        sys.exit(1)

    client = dataplex_v1.CatalogServiceClient()

    # --- Step 2: Search ---
    mode = "Semantic" if args.semantic else "Keyword"
    print(f"[Step 2] Searching ({mode}): \"{args.query}\"")
    print(f"         project={args.project}  limit={args.limit}")
    print()

    entries = search_entries(
        client=client,
        project=args.project,
        query=args.query,
        semantic=args.semantic,
        limit=args.limit,
        order_by=args.order_by,
        scope=args.scope,
    )

    print_search_results(entries, mode)

    if not entries:
        sys.exit(0)

    if args.search_only:
        print("(--search-only: skipping context lookup)")
        sys.exit(0)

    # --- Step 3: Lookup context for each entry ---
    print(f"\n[Step 3] Looking up context for {len(entries)} entry(s)...\n")

    for i, entry in enumerate(entries, 1):
        entry_name = entry["name"]
        location = _extract_location(entry_name) or args.location
        label = entry["display_name"] or entry_name.split("/")[-1]

        print(f"{'═' * 80}")
        print(f"  Context for [{i}]: {label}")
        print(f"  Entry:    {entry_name}")
        print(f"  Location: {location}")
        print(f"{'═' * 80}")

        try:
            ctx = lookup_context(
                client=client,
                project=args.project,
                location=location,
                resource_names=[entry_name],
                context_format=args.context_format,
                context_budget=args.context_budget,
            )
            if ctx:
                print(ctx)
            else:
                print("  (empty context returned — no metadata available)")
        except Exception as exc:
            print(f"  Error: {exc}")

        print()

    print("Done.")


if __name__ == "__main__":
    main()
