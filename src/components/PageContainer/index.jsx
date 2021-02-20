const PageContainer = (props) => {
  return (
    <div className="container w-8/12 shadow-lg mx-auto px-8 py-4 border rounded-md mt-8">
      {
        props.children
      }
    </div>
  )
}

export default PageContainer