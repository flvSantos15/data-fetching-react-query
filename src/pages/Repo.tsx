import { Button, Flex, Text } from "@chakra-ui/react"
import { useQueryClient } from "react-query"
import { useParams } from "react-router-dom"
import { RepoProps } from "./Repos"

export function Repo(){
  const params = useParams()
  const currentRepository = params['*'] as string

  const queryClient = useQueryClient()

  async function handleChangeRepositoryDescription(){
    // chamar a api p atualizar a descrição do repo

    // faço uma invalidação passando a chave p invalidar
    // queryClient.invalidateQueries(['repoKey'])
    // busco uma lisat de repos que tenho
    const previousRepos = queryClient
    .getQueryData<RepoProps[]>('repoKey')

    if(previousRepos){
      const nextRepos = previousRepos?.map(repo => {
        // se o o repositóio for o mesmo
        if (repo.full_name === currentRepository){
          // retorno ele com uma descrição nova
          return {...repo, description: 'Testando'}
        } else {
          return repo
        }
      })
      queryClient.setQueryData('repoKey', nextRepos)
    }
  }

  return(
    <Flex 
      bg='#181b23' 
      w='100vw' 
      h='100vh' 
      m='auto' 
      p='2rem' 
      flexDirection='column'
      justifyContent='center'
      alignContent='center'
    >
      <Text
        color='yellow.400' 
        fontSize='3xl' 
        fontWeight='bold'
        textAlign='center'
        mb='2rem'
      >
        Repository name
      </Text>
      <Text 
        color='yellow.400' 
        fontSize='2xl' 
        fontWeight='bold'
        textAlign='center'
        mb='1rem'
      >
        {currentRepository}
      </Text>
      <Button
        w='10rem'
        mx='auto'
        colorScheme='none'
        bg='#353646'
        color='#fff'
        onClick={() => 
          handleChangeRepositoryDescription
        }
      >
        Alterar descrição
      </Button>
    </Flex>
  )
}