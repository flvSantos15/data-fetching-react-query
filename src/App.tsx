import { useContext } from "react"
import { useFetch } from "./hooks/useFetch"

type RepoProps = {
  full_name: string
  description: string
}

function App() {
  const { data: repos, isFetching, error } = 
    useFetch<RepoProps[]>('users/flvSantos15/repos')
  return (
    <ul>
      {isFetching && <p>Carregando...</p>}
      {repos?.map((repo, index) => {
        return (
          <li key={index}>
            <strong>{repo.full_name}</strong>
            <p>
              {repo.description ? repo.description : 'No description'}
            </p>
          </li>
        )
      })}
      {error && 'Erro ao buscar dados!'}
    </ul>
  )
}

export default App
