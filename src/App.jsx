import { useRoutes } from "react-router-dom"
import routers from "./route/routes"

function App() {
  const element = useRoutes(routers)
  return (
    <>
      {element}
    </>
  )
}

export default App
