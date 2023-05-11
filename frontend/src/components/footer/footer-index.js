import React from 'react'
import { Container, Wrapper, Row, Column, Title, Link, Text } from './styles/footer-styles'

function Footer({ children, ...restProps}) {
    return <Container {...restProps}>{children}</Container>
}

Footer.Wrapper = function FooterWrapper({children, ...restProps}) {
    return <Wrapper {...restProps}>{children}</Wrapper>
}

Footer.Row = function FooterRow({children, ...restProps}) {
    return <Row {...restProps}>{children}</Row>
}

Footer.Column = function FooterColumn({children, ...restProps}) {
    return <Column {...restProps}>{children}</Column>
}

Footer.Title = function FooterTitle({children, ...restProps}) {
    return <Title {...restProps}>{children}</Title>
}

Footer.Link = function FooterLink({children, ...restProps}) {
    return <Link {...restProps}>{children}</Link>
}

Footer.Text = function FooterText({children, ...restProps}) {
    return <Text {...restProps}>{children}</Text>
}

export default Footer;
