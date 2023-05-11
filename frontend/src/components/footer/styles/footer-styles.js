import styled from 'styled-components'

export const Container = styled.div`
    padding: 20px 20px 10px;
    background: radial-gradient(circle, rgba(248, 195, 0) 100%, rgba(247, 202, 77) 100%);
`

export const Wrapper = styled.div`
    display: flex;
    flex-direction column;
    justify-content: center;
    max-width: 1000px;
    margin: 0 auto;
`

export const Row = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(230px, 1fr));
    grid-gap: 120px;
    padding-bottom: 8px;

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    }
`

export const Column = styled.div`
    display: flex;
    flex-direction: column;
    text-align: center;
`

export const Title = styled.p`
    color: rgb(56, 56, 56);
    margin-bottom: 4px;
    font-size: 24px;
    text-align: center;
`

export const Link = styled.a`
    color: rgb(56, 56, 56);
    margin-bottom: 4px;
    font-size 16px;
    text-decoration: none;
    text-align: center;
    &:hover {
        color: rgb(22,22,22);
      }
`

export const Text = styled.p`
    color: rgb(56, 56, 56);
    margin-bottom: 4px;
    font-size 16px;
    text-decoration: none;
    text-align: center;
`
