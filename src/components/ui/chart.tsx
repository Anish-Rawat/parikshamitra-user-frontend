interface ChartData {
    [key: string]: string | number
  }
  
  interface BarChartProps {
    data: ChartData[]
    index: string
    categories: string[]
    colors: string[]
    valueFormatter?: (value: number) => string
    yAxisWidth?: number
  }
  
  export function BarChart({ data, index, categories, colors, valueFormatter, yAxisWidth }: BarChartProps) {
    return (
      <div>
        {/* Placeholder for BarChart */}
        BarChart Component (Implementation Needed)
      </div>
    )
  }
  
  interface LineChartProps {
    data: ChartData[]
    index: string
    categories: string[]
    colors: string[]
    valueFormatter?: (value: number) => string
    yAxisWidth?: number
  }
  
  export function LineChart({ data, index, categories, colors, valueFormatter, yAxisWidth }: LineChartProps) {
    return (
      <div>
        {/* Placeholder for LineChart */}
        LineChart Component (Implementation Needed)
      </div>
    )
  }
  