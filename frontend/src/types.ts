export interface SearchResult {
  entry_name: string;
  display_name: string;
  entry_type: string;
  description: string;
  system: string;
  resource_path: string;
  fully_qualified_name: string;
  parent: string;
}

export interface SearchResponse {
  results: SearchResult[];
  total: number;
  mode: string;
}

export interface ContextColumn {
  name: string;
  type: string;
  description: string;
}

export interface ContextParsed {
  description?: string;
  system?: string;
  fully_qualified_name?: string;
  parent?: string;
  columns?: ContextColumn[];
  [key: string]: unknown;
}

export interface ContextResponse {
  entry_name: string;
  display_name: string;
  entry_type: string;
  context_raw: string;
  context_parsed: ContextParsed | null;
}
