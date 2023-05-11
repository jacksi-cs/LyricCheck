import React from 'react'
import Footer from './footer/footer-index'
import Icon from './icons/icons-index'

export function FooterContainer() {
    return (
        <Footer>
            <Footer.Wrapper>
                <Footer.Row>
                    <Footer.Column>
                        <Footer.Title>10 am Group 7</Footer.Title>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Models</Footer.Title>
                        <Footer.Link href="/song"><Icon className="fa-solid fa-music" />Songs</Footer.Link>
                        <Footer.Link href="/artist"><Icon className="fa-solid fa-user" />Artists</Footer.Link>
                        <Footer.Link href="/country"><Icon className="fa-solid fa-earth-americas" />Countries</Footer.Link>
                    </Footer.Column>
                    <Footer.Column>
                        <Footer.Title>Other Pages</Footer.Title>
                        <Footer.Link href="/aboutlyriccheck">About LyricCheck</Footer.Link>
                    </Footer.Column>
                </Footer.Row>
                <Footer.Row>
                    <Footer.Column></Footer.Column>
                    <Footer.Text>© Copyright 2022 LyricCheck</Footer.Text>
                </Footer.Row>
            </Footer.Wrapper>
        </Footer>
    )
}
