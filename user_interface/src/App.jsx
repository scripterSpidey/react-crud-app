import Header from "./components/Header"
import HomeScreen from "./screens/HomeScreen"
import Footer from "./components/Footer"
function App() {

  return (
    <div  className="flex flex-col h-screen">
        <Header/>
         <HomeScreen/>
        <Footer/>
    </div>
  )
}

export default App
