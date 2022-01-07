import React from "react"
import NewBlog from "./blogForm"
import Blogs from "./Blogs"
import VisibilityFilter from "./VisibilityFilter"

const App = () => {
  return(
    <div>
      <NewBlog />
      <VisibilityFilter />
      <Blogs />
    </div>
  )
}

export default App