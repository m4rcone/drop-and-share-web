import { BrowserRouter, Routes, Route } from "react-router";
import { ThemeProvider } from "./components/theme-provider";
import CreateUpload from "./pages/create-upload";
import ShareUpload from "./pages/share-upload";
import NotFound from "./pages/not-found";
import { Header } from "./components/header";

export default function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="min-h-screen flex flex-col p-4 antialiased">
        <Header />
        <BrowserRouter>
          <Routes>
            <Route element={<CreateUpload />} index />
            <Route element={<ShareUpload />} path="/share/:id" />
            <Route element={<NotFound />} path="*" />
          </Routes>
        </BrowserRouter>
      </div>
    </ThemeProvider>
  );
}
