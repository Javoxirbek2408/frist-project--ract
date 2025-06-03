import { AppSidebar } from '@/components/app-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  return (<>

    <SidebarProvider>
      <AppSidebar variant="inset" />
      <Outlet />
    </SidebarProvider>
  </>
  )
}

export default RootLayout