"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/ui/shadcn/components/sidebar";

import { MenuCollapse } from "./menuCollapse";

export default function SideMenu() {    
  const homeOptions = [
    { label: "Tabela personagens", href: "/" },
    { label: "Combate", href: "/combate" },
  ]

  const monstrosOptions = [
    { label: "Criar Inimigo", onClick: () => console.log("Criar Inimigos") },
    { label: "Listar Inimigos", onClick: () => console.log("Listar Inimigos") },
  ]
  const personagensOptions = [
    { label: "Criar Personagem", onClick: () => console.log("Criar Inimigos") },
    { label: "Listar Personagens", onClick: () => console.log("Listar Inimigos") },
  ]

  return(
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tabletop RPG Combat Assistant</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <MenuCollapse title="Home" options={homeOptions} />
              <MenuCollapse title="Monstros" options={monstrosOptions} />
              <MenuCollapse title="Personagens" options={personagensOptions} />
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}