import React from "react"
import "./styles/global.css"

export default function BaseLayout({ title = "Project", description = "Built with Astro", children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content={description} />
        <title>{title}</title>
      </head>

      <body>
        {children}
      </body>
    </html>
  )
}