export default function ArchitectureDiagram() {
  const boxW = 340;
  const boxH = 170;
  const gap = 40;
  const leftX = 30;
  const rightX = leftX + boxW + gap;
  const topY = 40;
  const bottomY = topY + boxH + 60;

  return (
    <div className="arch-diagram-wrapper">
      <h3 className="arch-diagram-title">整体架构</h3>
      <svg viewBox="0 0 780 520" className="arch-diagram-svg" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#94a3b8" />
          </marker>
          <marker id="arrow-indigo" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#818cf8" />
          </marker>
          <marker id="arrow-amber" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d="M0,0 L8,3 L0,6" fill="#f59e0b" />
          </marker>
          <linearGradient id="gcp-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#4f46e5" stopOpacity="0.06" />
            <stop offset="100%" stopColor="#7c3aed" stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* ===== TOP LEFT: ① 数据仓库 ===== */}
        <rect x={leftX} y={topY} width={boxW} height={boxH} rx="12" fill="#eff6ff" stroke="#93c5fd" strokeWidth="1.5" />
        <text x={leftX + boxW / 2} y={topY + 24} textAnchor="middle" fill="#1e40af" fontSize="13" fontWeight="600" fontFamily="Google Sans, sans-serif">① 游戏数据仓库</text>
        <text x={leftX + boxW / 2} y={topY + 40} textAnchor="middle" fill="#3b82f6" fontSize="10" fontFamily="Roboto, sans-serif">Flood-It! 益智游戏 · 多数据源</text>

        {/* 4 data layers */}
        <rect x={leftX + 15} y={topY + 52} width="150" height="48" rx="6" fill="#fef3c7" stroke="#f59e0b" strokeWidth="1" />
        <text x={leftX + 90} y={topY + 70} textAnchor="middle" fill="#92400e" fontSize="10" fontWeight="500" fontFamily="Google Sans, sans-serif">原始事件层</text>
        <text x={leftX + 90} y={topY + 84} textAnchor="middle" fill="#b45309" fontSize="9" fontFamily="Roboto, sans-serif">events, user_properties</text>

        <rect x={leftX + 175} y={topY + 52} width="150" height="48" rx="6" fill="#dbeafe" stroke="#3b82f6" strokeWidth="1" />
        <text x={leftX + 250} y={topY + 70} textAnchor="middle" fill="#1e40af" fontSize="10" fontWeight="500" fontFamily="Google Sans, sans-serif">聚合指标层</text>
        <text x={leftX + 250} y={topY + 84} textAnchor="middle" fill="#2563eb" fontSize="9" fontFamily="Roboto, sans-serif">DAU, 收入, 留存, 漏斗</text>

        <rect x={leftX + 15} y={topY + 108} width="150" height="48" rx="6" fill="#f3e8ff" stroke="#a855f7" strokeWidth="1" />
        <text x={leftX + 90} y={topY + 126} textAnchor="middle" fill="#6b21a8" fontSize="10" fontWeight="500" fontFamily="Google Sans, sans-serif">维度表</text>
        <text x={leftX + 90} y={topY + 140} textAnchor="middle" fill="#7c3aed" fontSize="9" fontFamily="Roboto, sans-serif">事件, 国家, 设备, 道具</text>

        <rect x={leftX + 175} y={topY + 108} width="150" height="48" rx="6" fill="#fce7f3" stroke="#ec4899" strokeWidth="1" />
        <text x={leftX + 250} y={topY + 126} textAnchor="middle" fill="#9d174d" fontSize="10" fontWeight="500" fontFamily="Google Sans, sans-serif">ML 应用层</text>
        <text x={leftX + 250} y={topY + 140} textAnchor="middle" fill="#be185d" fontSize="9" fontFamily="Roboto, sans-serif">LTV, 流失预测, A/B 测试</text>

        {/* Arrow: ① → ② */}
        <line x1={leftX + boxW} y1={topY + boxH / 2} x2={rightX} y2={topY + boxH / 2} stroke="#f59e0b" strokeWidth="2" markerEnd="url(#arrow-amber)" />

        {/* ===== TOP RIGHT: ② OKF ===== */}
        <rect x={rightX} y={topY} width={boxW} height={boxH} rx="12" fill="#fefce8" stroke="#facc15" strokeWidth="1.5" />
        <text x={rightX + boxW / 2} y={topY + 24} textAnchor="middle" fill="#854d0e" fontSize="13" fontWeight="600" fontFamily="Google Sans, sans-serif">② OKF 上下文抽取</text>
        <text x={rightX + boxW / 2} y={topY + 40} textAnchor="middle" fill="#a16207" fontSize="10" fontFamily="Roboto, sans-serif">Open Knowledge Format · ontology.yaml</text>

        <g transform={`translate(${rightX + 15}, ${topY + 50})`}>
          <rect x="0" y="0" width="310" height="22" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
          <circle cx="12" cy="11" r="4" fill="#f59e0b" />
          <text x="24" y="15" fill="#78350f" fontSize="10" fontFamily="Roboto, sans-serif">表描述 — 业务含义、用途、数据来源说明</text>

          <rect x="0" y="26" width="310" height="22" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
          <circle cx="12" cy="37" r="4" fill="#8b5cf6" />
          <text x="24" y="41" fill="#78350f" fontSize="10" fontFamily="Roboto, sans-serif">字段语义 — 168 个字段的业务定义与数据类型</text>

          <rect x="0" y="52" width="310" height="22" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
          <circle cx="12" cy="63" r="4" fill="#3b82f6" />
          <text x="24" y="67" fill="#78350f" fontSize="10" fontFamily="Roboto, sans-serif">数据分层 — 原始 → 聚合 → 维度 → ML 应用</text>

          <rect x="0" y="78" width="310" height="22" rx="4" fill="#fff" stroke="#e5e7eb" strokeWidth="1" />
          <circle cx="12" cy="89" r="4" fill="#10b981" />
          <text x="24" y="93" fill="#78350f" fontSize="10" fontFamily="Roboto, sans-serif">技术元数据 — 主键、分区、粒度、Owner</text>
        </g>

        <text x={rightX + boxW / 2} y={topY + boxH - 8} textAnchor="middle" fill="#a16207" fontSize="9" fontFamily="Roboto Mono, monospace">YAML 格式 · Git 版本管理</text>

        {/* Arrow: ② straight down to ③ */}
        <line x1={rightX + boxW / 2} y1={topY + boxH} x2={rightX + boxW / 2} y2={bottomY} stroke="#818cf8" strokeWidth="2" markerEnd="url(#arrow-indigo)" />
        <text x={rightX + boxW / 2 + 20} y={topY + boxH + 35} fill="#818cf8" fontSize="10" fontWeight="500" fontFamily="Roboto, sans-serif">推送元数据</text>

        {/* ===== Google Cloud background ===== */}
        <rect x={leftX} y={bottomY - 15} width={boxW * 2 + gap} height={boxH + 30} rx="14" fill="url(#gcp-grad)" stroke="#c7d2fe" strokeWidth="1.5" strokeDasharray="6 3" />
        <text x={leftX + (boxW * 2 + gap) / 2} y={bottomY + 4} textAnchor="middle" fill="#6366f1" fontSize="11" fontWeight="600" fontFamily="Google Sans, sans-serif">Google Cloud Platform</text>

        {/* ===== BOTTOM LEFT: ④ Web App ===== */}
        <rect x={leftX + 10} y={bottomY + 15} width={boxW - 20} height={boxH - 20} rx="10" fill="#f0fdf4" stroke="#86efac" strokeWidth="1.5" />
        <text x={leftX + boxW / 2} y={bottomY + 38} textAnchor="middle" fill="#166534" fontSize="13" fontWeight="600" fontFamily="Google Sans, sans-serif">④ Web 应用展示</text>
        <text x={leftX + boxW / 2} y={bottomY + 54} textAnchor="middle" fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">Cloud Run 部署 · 无需登录即可访问</text>
        <line x1={leftX + 28} y1={bottomY + 63} x2={leftX + boxW - 28} y2={bottomY + 63} stroke="#bbf7d0" strokeWidth="1" />
        <text x={leftX + 30} y={bottomY + 80} fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">• 自然语言搜索数据资产</text>
        <text x={leftX + 30} y={bottomY + 96} fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">• 查看表结构与字段描述</text>
        <text x={leftX + 30} y={bottomY + 112} fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">• 元数据标签（Owner / 分区 / 粒度）</text>
        <text x={leftX + 30} y={bottomY + 128} fill="#15803d" fontSize="10" fontFamily="Roboto, sans-serif">• 面向非技术用户的可视化界面</text>

        {/* Arrow: ③ → ④ */}
        <line x1={rightX + 10} y1={bottomY + 15 + (boxH - 20) / 2} x2={leftX + boxW - 10} y2={bottomY + 15 + (boxH - 20) / 2} stroke="#94a3b8" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <text x={leftX + boxW + gap / 2} y={bottomY + 15 + (boxH - 20) / 2 - 8} textAnchor="middle" fill="#94a3b8" fontSize="9" fontFamily="Roboto, sans-serif">Search API</text>

        {/* ===== BOTTOM RIGHT: ③ Knowledge Catalog ===== */}
        <rect x={rightX + 10} y={bottomY + 15} width={boxW - 20} height={boxH - 20} rx="10" fill="#eef2ff" stroke="#818cf8" strokeWidth="1.5" />
        <text x={rightX + boxW / 2} y={bottomY + 38} textAnchor="middle" fill="#312e81" fontSize="13" fontWeight="600" fontFamily="Google Sans, sans-serif">③ Knowledge Catalog</text>
        <text x={rightX + boxW / 2} y={bottomY + 54} textAnchor="middle" fill="#4338ca" fontSize="10" fontFamily="Roboto, sans-serif">语义搜索引擎</text>
        <line x1={rightX + 28} y1={bottomY + 63} x2={rightX + boxW - 28} y2={bottomY + 63} stroke="#c7d2fe" strokeWidth="1" />
        <text x={rightX + 30} y={bottomY + 80} fill="#4f46e5" fontSize="10" fontFamily="Roboto, sans-serif">• 自然语言理解与语义匹配</text>
        <text x={rightX + 30} y={bottomY + 96} fill="#4f46e5" fontSize="10" fontFamily="Roboto, sans-serif">• 基于上下文的智能排序</text>
        <text x={rightX + 30} y={bottomY + 112} fill="#4f46e5" fontSize="10" fontFamily="Roboto, sans-serif">• 元数据索引与全文检索</text>
        <text x={rightX + 30} y={bottomY + 128} fill="#4f46e5" fontSize="10" fontFamily="Roboto, sans-serif">• Catalog Search / Lookup API</text>
      </svg>

      <div className="arch-core-value">
        <span className="arch-core-value-label">核心价值</span>
        <span className="arch-core-value-text">让任何人和任何 Agent 都能快速发现和理解数据资产 — 无需记表名 · 无需问数据工程师</span>
      </div>
    </div>
  );
}
