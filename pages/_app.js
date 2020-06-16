import Head from 'next/head'
import NextApp from 'next/app'
import React, { Fragment } from 'react'
import { withUrqlClient } from 'next-urql'
// styles
import '../css/index.min.css'

class Application extends NextApp {
    render() {
        const { Component, pageProps } = this.props

        return (
            <Fragment>
                <Head>
                    <link
                        href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@300;400;500&family=Nunito+Sans:wght@300;400;600&display=swap"
                        rel="stylesheet"
                    />
                </Head>

                <Component {...pageProps} />
            </Fragment>
        )
    }
}

export default withUrqlClient(() => ({
    url: `${process.env.appUrl}/graphql`,
}))(Application)
