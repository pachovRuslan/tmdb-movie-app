import { useEffect } from "react"
import { ThemeProvider, CssBaseline } from "@mui/material"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { Routing } from "@/common/routing"
import { getMuiTheme } from "@/app/muiTheme"
import { GlobalLoader } from "@/common/components/GlobalLoader/GlobalLoader"
import { useAppSelector } from "../model/hooks"

export const App = () => {
  const themeMode = useAppSelector((state) => state.theme.mode)
  const muiTheme = getMuiTheme(themeMode)

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeMode)
  }, [themeMode])

  return (
    <ThemeProvider theme={muiTheme}>
      <CssBaseline />
      <GlobalLoader />
      <Routing />
      <ToastContainer position="bottom-right" theme={themeMode} />
    </ThemeProvider>
  )
}

export default App