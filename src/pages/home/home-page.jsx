import { defineComponent } from 'vue'

const Home = defineComponent(() => {
  return () => (
    <div>
      <h1>Home Page</h1>
      {Array.from({ length: 100 }, (_, i) => (
        <p key={i}>
          This is line {i + 1} in the home page.
        </p>
      ))}
    </div>
  )
})

export default Home
