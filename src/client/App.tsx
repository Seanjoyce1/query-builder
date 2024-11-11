import { Typography } from "@mui/material"
import QueryBuilder from "./features/QueryBuilder/QueryBuilder"

function App() {
  return (
    <div className="p-4">
      <Typography variant="h3" gutterBottom>
        Query Builder
      </Typography>

      <QueryBuilder />
    </div>
  )
}

export default App
