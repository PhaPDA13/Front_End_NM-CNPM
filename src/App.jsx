import { useRoutes } from "react-router-dom"
import routers from "./router/routers"

function App() {
  const element = useRoutes(routers)
  return (
    <>
      {element}
    </>
  )
}

export default App
