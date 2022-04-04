import { Flex, ListIcon, ListItem, Text, UnorderedList } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import axios from 'axios'
import { useQuery } from 'react-query'
import { Link } from 'react-router-dom'

export type RepoProps = {
  full_name: string
  description: string
}

export function Repos() {
  const { data: repos, isFetching, error } = useQuery<RepoProps[]>('repoKey', async () => {
    const response = await axios.get(
      'https://api.github.com/users/flvSantos15/repos'
    )

    return response.data
  }, {
    staleTime: 1000 * 30 // 30 segundos
  })

  return (
    <Flex
      bg='#181b23'
      w='100%'
      h='100%'
      flexDirection='column'
      justifyContent='center'
      alignContent='center'
    >
      <Text
        color='blue.300'
        fontSize='3xl'
        fontWeight='bold'
        textAlign='center'
        mt='1rem'
      >
        Repository List
      </Text>
      <UnorderedList mx='auto' w='600px' mt='3rem'>
        {isFetching && (
          <Text
            color='#fff'
            fontSize='xl'
            fontWeight='medium'
          >
            Carregando...
          </Text>
        )}
        {repos?.map((repo, index) => {
          return (
            <Flex w='100%' justifyContent='center'>
              <ListItem
                key={index}
                p='1rem'
                mb='1rem'
              >
                <Flex justifyContent='center' alignItems='center' px='0.5rem'>
                  <ListIcon as={CheckCircleIcon} color='green.500' />
                  <Link to={`repos/${repo.full_name}`}>
                    <Text
                      color='yellow.400'
                      fontSize='xl'
                      fontWeight='bold'
                      textAlign='center'
                      _hover={{
                        color: 'green.500'
                      }}
                    >
                      {repo.full_name}
                    </Text>
                  </Link>
                </Flex>
                <Text
                  color='#fefefe'
                  textAlign='center'
                >
                  {repo.description ? repo.description : 'No description'}
                </Text>
              </ListItem>
            </Flex>
          )
        })}
        {error && <p>Erro ao carregar os dados!</p>}
      </UnorderedList>
    </Flex>
  )
}
