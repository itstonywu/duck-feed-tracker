import React from "react"
import { Box, Grid, Flex } from "@chakra-ui/layout"

import Nav from "./Nav"

const DashboardShell: React.FunctionComponent = ({ children }) => {
  return (
    <Box bg="gray.100" minHeight="100vh">
      <Grid gridTemplateRows="auto 1fr" justifyItems="center">
        <Nav />
        <Flex maxWidth="1250px" w="full" px={8} flexDirection="column">
          {children}
        </Flex>
      </Grid>
    </Box>
  )
}

export default DashboardShell
